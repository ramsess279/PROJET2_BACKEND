import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function seedEntreprises() {
    console.log('🏢 Création des entreprises sénégalaises...');
    const entreprises = await Promise.all([
        prisma.entreprise.create({
            data: {
                nom: 'Sonatel SA',
                email: 'contact@sonatel.sn',
                telephone: '+221 33 839 90 00',
                adresse: 'Avenue Léopold Sédar Senghor, Dakar',
                logoUrl: null,
                couleurPrimaire: '#FF6B35',
                couleurSecondaire: '#004B87',
                devise: 'XOF',
                typePeriode: 'mensuelle',
            },
        }),
        prisma.entreprise.create({
            data: {
                nom: 'Banque Atlantique Sénégal',
                email: 'info@banqueatlantique.sn',
                telephone: '+221 33 849 95 95',
                adresse: 'Place de l\'Indépendance, Dakar',
                logoUrl: null,
                couleurPrimaire: '#1E3A8A',
                couleurSecondaire: '#3B82F6',
                devise: 'XOF',
                typePeriode: 'mensuelle',
            },
        }),
        prisma.entreprise.create({
            data: {
                nom: 'Teyliom Group',
                email: 'contact@teyliom.sn',
                telephone: '+221 33 827 92 92',
                adresse: 'Almadies, Route de Ngor, Dakar',
                logoUrl: null,
                couleurPrimaire: '#059669',
                couleurSecondaire: '#10B981',
                devise: 'XOF',
                typePeriode: 'mensuelle',
            },
        }),
        prisma.entreprise.create({
            data: {
                nom: 'Senelec',
                email: 'contact@senelec.sn',
                telephone: '+221 33 839 55 55',
                adresse: 'Rue Vincens, Dakar',
                logoUrl: null,
                couleurPrimaire: '#DC2626',
                couleurSecondaire: '#EF4444',
                devise: 'XOF',
                typePeriode: 'mensuelle',
            },
        }),
        prisma.entreprise.create({
            data: {
                nom: 'Orange Sénégal',
                email: 'info@orange.sn',
                telephone: '+221 33 869 60 00',
                adresse: 'Rue Huart, Dakar',
                logoUrl: null,
                couleurPrimaire: '#FF6600',
                couleurSecondaire: '#FFB366',
                devise: 'XOF',
                typePeriode: 'mensuelle',
            },
        }),
    ]);
    console.log(`✅ ${entreprises.length} entreprises créées`);
    return entreprises;
}
//# sourceMappingURL=entreprises.seeder.js.map