import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function seedPricingPlans() {
    console.log('💰 Création des plans de tarification...');
    const pricingPlans = await Promise.all([
        prisma.pricingPlan.create({
            data: {
                name: 'Starter',
                price: 25000,
                currency: 'XOF',
                period: 'mois',
                maxEmployees: 10,
                description: 'Parfait pour les petites entreprises',
                popular: false,
                active: true,
                features: {
                    create: [
                        { feature: 'Gestion jusqu\'à 10 employés' },
                        { feature: 'Bulletins de paie automatisés' },
                        { feature: 'Calculs de charges sociales' },
                        { feature: 'Support par email' },
                        { feature: 'Sauvegarde mensuelle' }
                    ]
                }
            },
            include: {
                features: true
            }
        }),
        prisma.pricingPlan.create({
            data: {
                name: 'Business',
                price: 45000,
                currency: 'XOF',
                period: 'mois',
                maxEmployees: 50,
                description: 'Idéal pour les entreprises en croissance',
                popular: true,
                active: true,
                features: {
                    create: [
                        { feature: 'Gestion jusqu\'à 50 employés' },
                        { feature: 'Bulletins de paie automatisés' },
                        { feature: 'Calculs de charges sociales' },
                        { feature: 'Gestion des congés' },
                        { feature: 'Rapports avancés' },
                        { feature: 'Support prioritaire' },
                        { feature: 'Sauvegarde hebdomadaire' },
                        { feature: 'API d\'intégration' }
                    ]
                }
            },
            include: {
                features: true
            }
        }),
        prisma.pricingPlan.create({
            data: {
                name: 'Enterprise',
                price: 85000,
                currency: 'XOF',
                period: 'mois',
                maxEmployees: 999,
                description: 'Solution complète pour grandes entreprises',
                popular: false,
                active: true,
                features: {
                    create: [
                        { feature: 'Employés illimités' },
                        { feature: 'Bulletins de paie automatisés' },
                        { feature: 'Calculs de charges sociales' },
                        { feature: 'Gestion des congés' },
                        { feature: 'Rapports avancés' },
                        { feature: 'Multi-entreprises' },
                        { feature: 'Support 24/7' },
                        { feature: 'Sauvegarde quotidienne' },
                        { feature: 'API complète' },
                        { feature: 'Formation personnalisée' },
                        { feature: 'Gestionnaire de compte dédié' }
                    ]
                }
            },
            include: {
                features: true
            }
        })
    ]);
    console.log(`✅ ${pricingPlans.length} plans de tarification créés`);
    return pricingPlans;
}
//# sourceMappingURL=pricing.seeder.js.map