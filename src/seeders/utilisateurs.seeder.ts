import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function seedUtilisateurs(entreprises: any[]) {
  console.log('👥 Création des utilisateurs...');

  const utilisateurs = await Promise.all([
    // Super Admin
    prisma.utilisateur.create({
      data: {
        email: 'rama.gueye@odc.sn',
        motDePasse: await bcrypt.hash('passer123', 10),
        nomComplet: 'Ramatoulaye Gueye',
        telephone: '+221 77 123 45 67',
        role: 'super-admin',
        statut: 'actif',
      },
    }),
    // Admins d'entreprises
    prisma.utilisateur.create({
      data: {
        email: 'fatou.ndiaye@sonatel.sn',
        motDePasse: await bcrypt.hash('admin123', 10),
        motDePasseTemporaire: 'admin123',
        nomComplet: 'Fatou Ndiaye',
        telephone: '+221 77 234 56 78',
        role: 'admin',
        statut: 'actif',
        entrepriseId: entreprises[0].id,
      },
    }),
    prisma.utilisateur.create({
      data: {
        email: 'moussa.fall@banqueatlantique.sn',
        motDePasse: await bcrypt.hash('admin123', 10),
        motDePasseTemporaire: 'admin123',
        nomComplet: 'Moussa Fall',
        telephone: '+221 78 345 67 89',
        role: 'admin',
        statut: 'actif',
        entrepriseId: entreprises[1].id,
      },
    }),
    // Caissiers
    prisma.utilisateur.create({
      data: {
        email: 'aissatou.ba@teyliom.sn',
        motDePasse: await bcrypt.hash('caissier123', 10),
        nomComplet: 'Aissatou Ba',
        telephone: '+221 76 456 78 90',
        role: 'caissier',
        statut: 'actif',
        entrepriseId: entreprises[2].id,
      },
    }),
    prisma.utilisateur.create({
      data: {
        email: 'ousmane.sow@senelec.sn',
        motDePasse: await bcrypt.hash('caissier123', 10),
        nomComplet: 'Ousmane Sow',
        telephone: '+221 77 567 89 01',
        role: 'caissier',
        statut: 'actif',
        entrepriseId: entreprises[3].id,
      },
    }),
    // Admin pour Orange
    prisma.utilisateur.create({
      data: {
        email: 'admin@orange.sn',
        motDePasse: await bcrypt.hash('admin123', 10),
        motDePasseTemporaire: 'admin123',
        nomComplet: 'Admin Orange',
        telephone: '+221 77 678 90 12',
        role: 'admin',
        statut: 'actif',
        entrepriseId: entreprises[4].id,
      },
    }),
    // Caissier pour Orange
    prisma.utilisateur.create({
      data: {
        email: 'caissier@orange.sn',
        motDePasse: await bcrypt.hash('caissier123', 10),
        nomComplet: 'Caissier Orange',
        telephone: '+221 76 789 01 23',
        role: 'caissier',
        statut: 'actif',
        entrepriseId: entreprises[4].id,
      },
    }),
    // Vigiles
    prisma.utilisateur.create({
      data: {
        email: 'vigile@sonatel.sn',
        motDePasse: await bcrypt.hash('vigile123', 10),
        nomComplet: 'Vigile Sonatel',
        telephone: '+221 77 890 12 34',
        role: 'vigile',
        statut: 'actif',
        entrepriseId: entreprises[0].id,
      },
    }),
    prisma.utilisateur.create({
      data: {
        email: 'vigile@banqueatlantique.sn',
        motDePasse: await bcrypt.hash('vigile123', 10),
        nomComplet: 'Vigile Banque Atlantique',
        telephone: '+221 78 901 23 45',
        role: 'vigile',
        statut: 'actif',
        entrepriseId: entreprises[1].id,
      },
    }),
    prisma.utilisateur.create({
      data: {
        email: 'vigile@teyliom.sn',
        motDePasse: await bcrypt.hash('vigile123', 10),
        nomComplet: 'Vigile Teyliom',
        telephone: '+221 76 012 34 56',
        role: 'vigile',
        statut: 'actif',
        entrepriseId: entreprises[2].id,
      },
    }),
  ]);

  console.log(`✅ ${utilisateurs.length} utilisateurs créés`);
  return utilisateurs;
}