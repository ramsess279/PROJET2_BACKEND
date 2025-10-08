import type { PayRun, CreatePayRun } from "./payrun.entity.js";
import PayRunModel from "./payrun.model.js";
import EmployeModel from "../employe/ employe.model.js";
import PayslipModel from "../payslip/payslip.model.js";
import prisma from "../../config/db.js";

const PayRunService = {
  create: async (data: CreatePayRun) => {
    console.log('Création du cycle de paie avec données:', data);

    // Fonction pour parser les dates au format DD/MM/YYYY
    const parseDate = (dateStr: string | undefined): Date | null => {
      if (!dateStr || dateStr === '') return null;
      // Si c'est déjà une date valide, la retourner
      const existingDate = new Date(dateStr);
      if (!isNaN(existingDate.getTime())) return existingDate;

      // Parser le format DD/MM/YYYY
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        const [day, month, year] = parts;
        return new Date(`${year}-${month!.padStart(2, '0')}-${day!.padStart(2, '0')}`);
      }
      return null;
    };

    // Convertir les dates string en objets Date et gérer les champs vides
    const processedData: PayRun = {
      entrepriseId: data.entrepriseId,
      periode: data.periode,
      type: data.type,
      statut: data.statut || 'brouillon',
      dateDebut: parseDate(data.dateDebut),
      dateFin: parseDate(data.dateFin),
      heureDebut: data.heureDebut && data.heureDebut !== '' ? data.heureDebut : null,
      heureFin: data.heureFin && data.heureFin !== '' ? data.heureFin : null,
    };

    console.log('Données traitées:', processedData);
    const payRun = await PayRunModel.create(processedData);
    console.log('Cycle créé:', payRun);
    // Les bulletins seront générés automatiquement quand le cycle arrive à échéance
    return payRun;
  },
  findById: async (id: string) => PayRunModel.findById(id),
  findAll: async (params?: { entrepriseId?: string }) => PayRunModel.findAll(params),
  update: async (id: string, data: Partial<PayRun>) => PayRunModel.update(id, data),
  delete: async (id: string) => {
    console.log('PayRun delete - id:', id);
    // Vérifier si le cycle peut être supprimé
    const payRun = await PayRunModel.findById(id);
    if (!payRun) throw new Error('Cycle de paie non trouvé');

    console.log('PayRun to delete:', payRun);

    // Ne permettre la suppression que si le cycle n'est pas approuvé
    if (payRun.statut === 'approuvé') {
      console.log('Cannot delete approved payrun');
      throw new Error('Impossible de supprimer un cycle de paie approuvé');
    }

    // Supprimer tous les bulletins associés au cycle (même s'ils existent)
    const payslipsCount = await prisma.payslip.count({
      where: { payRunId: id }
    });

    console.log('Payslips count:', payslipsCount);

    if (payslipsCount > 0) {
      console.log('Deleting associated payslips');
      await prisma.payslip.deleteMany({
        where: { payRunId: id }
      });
    }

    console.log('Deleting payrun');
    return PayRunModel.delete(id);
  },
  approve: async (id: string) => {
    console.log('PayRun approve - id:', id);
    // Vérifier que le cycle existe
    const payRun = await PayRunModel.findById(id);
    if (!payRun) throw new Error('Cycle de paie non trouvé');

    console.log('PayRun to approve:', payRun);

    // Vérifier que des bulletins existent
    const payslipsCount = await prisma.payslip.count({
      where: { payRunId: id }
    });

    if (payslipsCount === 0) {
      throw new Error('Impossible d\'approuver un cycle sans bulletins générés');
    }

    // Approuver le cycle de paie
    const updatedPayRun = await PayRunModel.update(id, { statut: 'approuvé' });

    // Verrouiller les bulletins associés
    await prisma.payslip.updateMany({
      where: { payRunId: id },
      data: { statut: 'verrouillé' }
    });

    console.log('PayRun approved and payslips locked');
    return updatedPayRun;
  },
  generatePayslips: async (id: string, force: boolean = false) => {
    console.log('PayRun generatePayslips - id:', id, 'force:', force);
    // Générer les bulletins quand le cycle arrive à échéance
    const payRun = await PayRunModel.findById(id);
    if (!payRun) throw new Error('Cycle de paie non trouvé');

    console.log('PayRun found:', payRun);

    // Vérifier si les bulletins existent déjà
    const existingPayslips = await prisma.payslip.findMany({
      where: { payRunId: id }
    });

    if (existingPayslips.length > 0 && !force) {
      throw new Error('Les bulletins ont déjà été générés pour ce cycle. Utilisez force=true pour les régénérer.');
    }

    // Si force=true, supprimer les bulletins existants
    if (existingPayslips.length > 0 && force) {
      await prisma.payslip.deleteMany({
        where: { payRunId: id }
      });
      console.log('Anciens bulletins supprimés pour régénération');
    }

    console.log('PayRun entrepriseId:', payRun.entrepriseId);

    // Générer les bulletins pour tous les employés actifs
    const employees = await EmployeModel.findAll({
      entrepriseId: payRun.entrepriseId,
      status: 'actif',
      page: 1,
      limit: 10000 // Grande limite pour récupérer tous les employés
    });

    console.log('Employees found:', employees.length);
    console.log('Employees:', employees);

    // Calculer les données de présence pour chaque employé
    const payslips = await Promise.all(employees.map(async (employee) => {
      let salaireBrut = employee.salaireBase;
      let nombreJour: number | null = null;
      let nombreHeure: number | null = null;

      // Récupérer les présences de l'employé pour la période du cycle
      if (!payRun.dateDebut || !payRun.dateFin) {
        throw new Error('Le cycle de paie doit avoir des dates de début et fin définies pour calculer les présences');
      }

      const presences = await prisma.presence.findMany({
        where: {
          employeId: employee.id,
          date: {
            gte: payRun.dateDebut,
            lte: payRun.dateFin,
          },
        },
      });

      console.log(`Presences for employee ${employee.nomComplet}:`, presences.length);

      if (employee.typeContrat === 'journalier') {
        // Pour les journaliers : compter les jours présents
        const joursPresents = presences.filter(p => p.statut === 'present').length;
        nombreJour = joursPresents > 0 ? joursPresents : 2; // Défaut 2 jours si pas de présences
        salaireBrut = employee.salaireBase * nombreJour;
        console.log(`Journalier ${employee.nomComplet}: ${nombreJour} jours, salaire ${salaireBrut}`);
      } else if (employee.typeContrat === 'honoraire') {
        // Pour les honoraires : sommer les heures travaillées
        const heuresTravaillees = presences.reduce((total, p) => total + p.heuresTravaillees, 0);
        nombreHeure = heuresTravaillees > 0 ? heuresTravaillees : 5; // Défaut 5 heures si pas de présences
        salaireBrut = employee.salaireBase * nombreHeure;
        console.log(`Honoraire ${employee.nomComplet}: ${nombreHeure} heures, salaire ${salaireBrut}`);
      }
      // Pour CDI et CDD : salaire fixe (salaireBase), pas de nombreJour/nombreHeure

      return {
        payRunId: payRun.id,
        employeId: employee.id,
        salaireBrut,
        deductions: 0,
        salaireNet: salaireBrut,
        statut: 'en_attente',
        nombreJour,
        nombreHeure,
      };
    }));

    await Promise.all(payslips.map(payslip => PayslipModel.create(payslip)));
    return payslips.length;
  },
};

export default PayRunService;