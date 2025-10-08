import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedEmployes(entreprises: any[]) {
  console.log('👷 Création des employés...');

  const employes = await Promise.all([
    // Employés Sonatel
    prisma.employe.create({
      data: {
        nomComplet: 'Khadija Sarr',
        email: 'khadija.sarr@sonatel.sn',
        telephone: '+221 77 111 22 33',
        poste: 'Développeuse Senior',
        typeContrat: 'CDI',
        salaireBase: 850000,
        coordonneeBancaire: 'SN08 SN01 0011 0000 0000 0000 0001',
        statut: 'actif',
        dateEmbauche: new Date('2022-03-15'),
        situationMatrimoniale: 'célibataire',
        nationalite: 'sénégalaise',
        entrepriseId: entreprises[0].id,
      },
    }),
    prisma.employe.create({
      data: {
        nomComplet: 'Mamadou Diouf',
        email: 'mamadou.diouf@sonatel.sn',
        telephone: '+221 78 222 33 44',
        poste: 'Chef de Projet',
        typeContrat: 'CDI',
        salaireBase: 1200000,
        coordonneeBancaire: 'SN08 SN01 0011 0000 0000 0000 0002',
        statut: 'actif',
        dateEmbauche: new Date('2021-09-01'),
        situationMatrimoniale: 'marié',
        nationalite: 'sénégalaise',
        entrepriseId: entreprises[0].id,
      },
    }),
    prisma.employe.create({
      data: {
        nomComplet: 'Aminata Thiam',
        email: 'aminata.thiam@sonatel.sn',
        telephone: '+221 76 333 44 55',
        poste: 'Analyste Financière',
        typeContrat: 'CDI',
        salaireBase: 750000,
        coordonneeBancaire: 'SN08 SN01 0011 0000 0000 0000 0003',
        statut: 'actif',
        dateEmbauche: new Date('2022-06-10'),
        situationMatrimoniale: 'mariée',
        nationalite: 'sénégalaise',
        entrepriseId: entreprises[0].id,
      },
    }),
    // Employés Banque Atlantique
    prisma.employe.create({
      data: {
        nomComplet: 'Ibrahima Gueye',
        email: 'ibrahima.gueye@banqueatlantique.sn',
        telephone: '+221 77 444 55 66',
        poste: 'Conseiller Clientèle',
        typeContrat: 'CDI',
        salaireBase: 450000,
        coordonneeBancaire: 'SN08 BA01 0011 0000 0000 0000 0001',
        statut: 'actif',
        dateEmbauche: new Date('2023-01-20'),
        situationMatrimoniale: 'célibataire',
        nationalite: 'sénégalaise',
        entrepriseId: entreprises[1].id,
      },
    }),
    prisma.employe.create({
      data: {
        nomComplet: 'Mariama Mbaye',
        email: 'mariama.mbaye@banqueatlantique.sn',
        telephone: '+221 78 555 66 77',
        poste: 'Responsable Crédit',
        typeContrat: 'CDI',
        salaireBase: 950000,
        coordonneeBancaire: 'SN08 BA01 0011 0000 0000 0000 0002',
        statut: 'actif',
        dateEmbauche: new Date('2022-11-05'),
        situationMatrimoniale: 'mariée',
        nationalite: 'sénégalaise',
        entrepriseId: entreprises[1].id,
      },
    }),
    // Employés Teyliom
    prisma.employe.create({
      data: {
        nomComplet: 'Abdoulaye Cissé',
        email: 'abdoulaye.cisse@teyliom.sn',
        telephone: '+221 76 666 77 88',
        poste: 'Ingénieur DevOps',
        typeContrat: 'CDI',
        salaireBase: 1100000,
        coordonneeBancaire: 'SN08 TG01 0011 0000 0000 0000 0001',
        statut: 'actif',
        dateEmbauche: new Date('2022-08-15'),
        situationMatrimoniale: 'marié',
        nationalite: 'sénégalaise',
        entrepriseId: entreprises[2].id,
      },
    }),
    prisma.employe.create({
      data: {
        nomComplet: 'Awa Diop',
        email: 'awa.diop@teyliom.sn',
        telephone: '+221 77 777 88 99',
        poste: 'UX/UI Designer',
        typeContrat: 'CDI',
        salaireBase: 650000,
        coordonneeBancaire: 'SN08 TG01 0011 0000 0000 0000 0002',
        statut: 'actif',
        dateEmbauche: new Date('2023-02-28'),
        situationMatrimoniale: 'célibataire',
        nationalite: 'sénégalaise',
        entrepriseId: entreprises[2].id,
      },
    }),
    // Employés Senelec
    prisma.employe.create({
      data: {
        nomComplet: 'Cheikh Kane',
        email: 'cheikh.kane@senelec.sn',
        telephone: '+221 78 888 99 00',
        poste: 'Technicien Électricien',
        typeContrat: 'CDI',
        salaireBase: 380000,
        coordonneeBancaire: 'SN08 SE01 0011 0000 0000 0000 0001',
        statut: 'actif',
        dateEmbauche: new Date('2022-04-12'),
        situationMatrimoniale: 'marié',
        nationalite: 'sénégalaise',
        entrepriseId: entreprises[3].id,
      },
    }),
    prisma.employe.create({
      data: {
        nomComplet: 'Bineta Seck',
        email: 'bineta.seck@senelec.sn',
        telephone: '+221 76 999 00 11',
        poste: 'Responsable Maintenance',
        typeContrat: 'CDI',
        salaireBase: 720000,
        coordonneeBancaire: 'SN08 SE01 0011 0000 0000 0000 0002',
        statut: 'actif',
        dateEmbauche: new Date('2021-12-01'),
        situationMatrimoniale: 'mariée',
        nationalite: 'sénégalaise',
        entrepriseId: entreprises[3].id,
      },
    }),
    // Employés Orange
    prisma.employe.create({
      data: {
        nomComplet: 'Alassane Ndour',
        email: 'alassane.ndour@orange.sn',
        telephone: '+221 77 000 11 22',
        poste: 'Ingénieur Réseau',
        typeContrat: 'CDI',
        salaireBase: 980000,
        coordonneeBancaire: 'SN08 OR01 0011 0000 0000 0000 0001',
        statut: 'actif',
        dateEmbauche: new Date('2022-07-18'),
        situationMatrimoniale: 'marié',
        nationalite: 'sénégalaise',
        entrepriseId: entreprises[4].id,
      },
    }),
    prisma.employe.create({
      data: {
        nomComplet: 'Coumba Faye',
        email: 'coumba.faye@orange.sn',
        telephone: '+221 78 111 22 33',
        poste: 'Chargée Marketing',
        typeContrat: 'CDI',
        salaireBase: 580000,
        coordonneeBancaire: 'SN08 OR01 0011 0000 0000 0000 0002',
        statut: 'actif',
        dateEmbauche: new Date('2023-01-09'),
        situationMatrimoniale: 'célibataire',
        nationalite: 'sénégalaise',
        entrepriseId: entreprises[4].id,
      },
    }),
    prisma.employe.create({
      data: {
        nomComplet: 'Modou Sy',
        email: 'modou.sy@orange.sn',
        telephone: '+221 76 222 33 44',
        poste: 'Technicien Support',
        typeContrat: 'CDD',
        salaireBase: 420000,
        coordonneeBancaire: 'SN08 OR01 0011 0000 0000 0000 0003',
        statut: 'actif',
        dateEmbauche: new Date('2022-10-25'),
        situationMatrimoniale: 'célibataire',
        nationalite: 'sénégalaise',
        entrepriseId: entreprises[4].id,
      },
    }),
    // Employés journaliers pour exemples
    prisma.employe.create({
      data: {
        nomComplet: 'Fatou Diallo',
        email: 'fatou.diallo@sonatel.sn',
        telephone: '+221 77 333 44 55',
        poste: 'Agent de nettoyage',
        typeContrat: 'journalier',
        salaireBase: 15000, // salaire journalier
        nombreJours: 26, // 26 jours travaillés par mois
        coordonneeBancaire: 'SN08 SN01 0011 0000 0000 0000 0004',
        statut: 'actif',
        dateEmbauche: new Date('2024-01-15'),
        situationMatrimoniale: 'célibataire',
        nationalite: 'sénégalaise',
        entrepriseId: entreprises[0].id,
      },
    }),
    prisma.employe.create({
      data: {
        nomComplet: 'Ousmane Ba',
        email: 'ousmane.ba@teyliom.sn',
        telephone: '+221 78 444 55 66',
        poste: 'Consultant Freelance',
        typeContrat: 'honoraire',
        salaireBase: 125000, // honoraire horaire (2000000 / 160 heures)
        nombreHeures: 160, // 160 heures par mois
        coordonneeBancaire: 'SN08 TG01 0011 0000 0000 0000 0003',
        statut: 'actif',
        dateEmbauche: new Date('2024-03-01'),
        situationMatrimoniale: 'marié',
        nationalite: 'sénégalaise',
        entrepriseId: entreprises[2].id,
      },
    }),
  ]);

  console.log(`✅ ${employes.length} employés créés`);
  return employes;
}