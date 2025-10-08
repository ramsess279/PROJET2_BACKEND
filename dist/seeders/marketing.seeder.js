import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function seedMarketingContent() {
    console.log('📢 Création du contenu marketing...');
    // Contenu de la section hero
    const heroContent = await Promise.all([
        prisma.marketingContent.create({
            data: {
                section: 'hero',
                title: 'Révolutionnez la Gestion de vos Salaires',
                subtitle: 'Solution digitale premium pour entreprises modernes',
                description: 'Solution digitale premium pour entreprises modernes. Automatisez vos processus RH et concentrez-vous sur votre croissance.',
                order: 1
            }
        }),
        prisma.marketingContent.create({
            data: {
                section: 'hero',
                description: 'Rejoignez plus de 500 entreprises qui nous font confiance',
                order: 2
            }
        })
    ]);
    // Avantages (benefits)
    const benefitsContent = await Promise.all([
        prisma.marketingContent.create({
            data: {
                section: 'benefits',
                title: 'Pourquoi nous choisir ?',
                subtitle: 'L\'excellence technologique au service de votre entreprise',
                order: 1
            }
        }),
        prisma.marketingContent.create({
            data: {
                section: 'benefits',
                benefitTitle: 'Sécurité maximale',
                benefitDesc: 'Chiffrement de bout en bout, sauvegardes automatiques et conformité RGPD',
                order: 2
            }
        }),
        prisma.marketingContent.create({
            data: {
                section: 'benefits',
                benefitTitle: 'Performance garantie',
                benefitDesc: 'Temps de réponse inférieur à 2 secondes, disponibilité 99.9%',
                order: 3
            }
        }),
        prisma.marketingContent.create({
            data: {
                section: 'benefits',
                benefitTitle: 'Support premium',
                benefitDesc: 'Équipe dédiée, formation personnalisée et assistance 24/7',
                order: 4
            }
        })
    ]);
    // Statistiques
    const statsContent = await Promise.all([
        prisma.marketingContent.create({
            data: {
                section: 'stats',
                title: 'Chiffres qui parlent',
                subtitle: 'La confiance de centaines d\'entreprises',
                order: 1
            }
        }),
        prisma.marketingContent.create({
            data: {
                section: 'stats',
                statValue: '500+',
                statLabel: 'Entreprises clientes',
                order: 2
            }
        }),
        prisma.marketingContent.create({
            data: {
                section: 'stats',
                statValue: '50K+',
                statLabel: 'Employés gérés',
                order: 3
            }
        }),
        prisma.marketingContent.create({
            data: {
                section: 'stats',
                statValue: '99.9%',
                statLabel: 'Taux de disponibilité',
                order: 4
            }
        }),
        prisma.marketingContent.create({
            data: {
                section: 'stats',
                statValue: '24/7',
                statLabel: 'Support technique',
                order: 5
            }
        })
    ]);
    // Section CTA (Call to Action)
    const ctaContent = await Promise.all([
        prisma.marketingContent.create({
            data: {
                section: 'cta',
                title: 'Prêt à digitaliser vos RH ?',
                subtitle: 'Rejoignez l\'élite des entreprises modernes qui ont choisi l\'excellence opérationnelle',
                order: 1
            }
        }),
        prisma.marketingContent.create({
            data: {
                section: 'cta',
                title: 'Création de votre compte entreprise',
                subtitle: 'Démarrez votre transformation digitale en quelques minutes seulement',
                order: 2
            }
        })
    ]);
    console.log(`✅ ${heroContent.length} éléments hero créés`);
    console.log(`✅ ${benefitsContent.length} avantages créés`);
    console.log(`✅ ${statsContent.length} statistiques créées`);
    console.log(`✅ ${ctaContent.length} éléments CTA créés`);
    return { heroContent, benefitsContent, statsContent, ctaContent };
}
//# sourceMappingURL=marketing.seeder.js.map