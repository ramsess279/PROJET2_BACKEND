import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedPayslips(employes: any[], payruns: any[]) {
  console.log('💰 Création des bulletins de paie...');

  const payslips = await Promise.all([
    // Bulletins pour le cycle approuvé de Sonatel (Septembre 2024)
    prisma.payslip.create({
      data: {
        employeId: employes[0].id, // Khadija Sarr - CDI
        payRunId: payruns[0].id,
        salaireBrut: 850000,
        deductions: 212500, // 25% de charges
        salaireNet: 637500,
        statut: 'payé', // Payé car cycle approuvé
        nombreJour: null,
        nombreHeure: null,
        dateGen: new Date('2024-09-01'),
      },
    }),
    prisma.payslip.create({
      data: {
        employeId: employes[1].id, // Mamadou Diouf - CDI
        payRunId: payruns[0].id,
        salaireBrut: 1200000,
        deductions: 360000, // 30% de charges
        salaireNet: 840000,
        statut: 'payé',
        nombreJour: null,
        nombreHeure: null,
        dateGen: new Date('2024-09-01'),
      },
    }),
    prisma.payslip.create({
      data: {
        employeId: employes[2].id, // Aminata Thiam - CDI
        payRunId: payruns[0].id,
        salaireBrut: 750000,
        deductions: 187500, // 25% de charges
        salaireNet: 562500,
        statut: 'payé',
        nombreJour: null,
        nombreHeure: null,
        dateGen: new Date('2024-09-01'),
      },
    }),
    // Bulletin pour employé journalier
    prisma.payslip.create({
      data: {
        employeId: employes[10].id, // Fatou Diallo - journalier
        payRunId: payruns[0].id,
        salaireBrut: 450000, // 15000 * 30 jours
        deductions: 45000, // 10% de charges
        salaireNet: 405000,
        statut: 'payé',
        nombreJour: 30,
        nombreHeure: null,
        dateGen: new Date('2024-09-01'),
      },
    }),

    // Bulletins pour le cycle approuvé de Banque Atlantique
    prisma.payslip.create({
      data: {
        employeId: employes[3].id, // Ibrahima Gueye
        payRunId: payruns[1].id,
        salaireBrut: 450000,
        deductions: 90000,
        salaireNet: 360000,
        statut: 'partiel', // Paiement partiel
        nombreJour: null,
        nombreHeure: null,
        dateGen: new Date('2024-09-01'),
      },
    }),
    prisma.payslip.create({
      data: {
        employeId: employes[4].id, // Mariama Mbaye
        payRunId: payruns[1].id,
        salaireBrut: 950000,
        deductions: 237500,
        salaireNet: 712500,
        statut: 'payé',
        nombreJour: null,
        nombreHeure: null,
        dateGen: new Date('2024-09-01'),
      },
    }),

    // Bulletins pour le cycle en brouillon de Sonatel (Octobre 2024) - modifiables
    prisma.payslip.create({
      data: {
        employeId: employes[0].id, // Khadija Sarr
        payRunId: payruns[2].id,
        salaireBrut: 850000,
        deductions: 0, // Pas encore calculé
        salaireNet: 850000,
        statut: 'en_attente',
        nombreJour: null,
        nombreHeure: null,
        dateGen: new Date('2024-10-01'),
      },
    }),
    prisma.payslip.create({
      data: {
        employeId: employes[1].id, // Mamadou Diouf
        payRunId: payruns[2].id,
        salaireBrut: 1200000,
        deductions: 0,
        salaireNet: 1200000,
        statut: 'en_attente',
        nombreJour: null,
        nombreHeure: null,
        dateGen: new Date('2024-10-01'),
      },
    }),
    prisma.payslip.create({
      data: {
        employeId: employes[10].id, // Fatou Diallo - journalier
        payRunId: payruns[2].id,
        salaireBrut: 450000, // 15000 * 30
        deductions: 0,
        salaireNet: 450000,
        statut: 'en_attente',
        nombreJour: 30,
        nombreHeure: null,
        dateGen: new Date('2024-10-01'),
      },
    }),

    // Bulletin pour cycle hebdomadaire Teyliom
    prisma.payslip.create({
      data: {
        employeId: employes[5].id, // Abdoulaye Cissé
        payRunId: payruns[3].id,
        salaireBrut: 250000, // Salaire hebdomadaire (1100000 / 4.3 semaines)
        deductions: 0,
        salaireNet: 250000,
        statut: 'en_attente',
        nombreJour: null,
        nombreHeure: 40, // 40h/semaine
        dateGen: new Date('2024-10-01'),
      },
    }),
    prisma.payslip.create({
      data: {
        employeId: employes[11].id, // Ousmane Ba - honoraire
        payRunId: payruns[3].id,
        salaireBrut: 2000000,
        deductions: 0,
        salaireNet: 2000000,
        statut: 'en_attente',
        nombreJour: null,
        nombreHeure: null,
        dateGen: new Date('2024-10-01'),
      },
    }),

    // Bulletin pour cycle journalier
    prisma.payslip.create({
      data: {
        employeId: employes[10].id, // Fatou Diallo
        payRunId: payruns[4].id,
        salaireBrut: 15000, // 1 journée
        deductions: 0,
        salaireNet: 15000,
        statut: 'en_attente',
        nombreJour: 1,
        nombreHeure: null,
        dateGen: new Date('2024-10-15'),
      },
    }),
  ]);

  console.log(`✅ ${payslips.length} bulletins de paie créés`);
  return payslips;
}