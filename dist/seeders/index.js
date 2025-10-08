import { PrismaClient } from '@prisma/client';
import { seedEntreprises } from './entreprises.seeder.js';
import { seedUtilisateurs } from './utilisateurs.seeder.js';
import { seedEmployes } from './employes.seeder.js';
import { seedPayRuns } from './payruns.seeder.js';
import { seedPayslips } from './payslips.seeder.js';
import { seedPaiements } from './paiements.seeder.js';
import { seedPricingPlans } from './pricing.seeder.js';
import { seedDashboardData } from './dashboard.seeder.js';
import { seedMarketingContent } from './marketing.seeder.js';
const prisma = new PrismaClient();
async function main() {
    console.log('🌱 Début du seeding avec des données sénégalaises...');
    try {
        // Nettoyer les données existantes dans l'ordre inverse des dépendances
        await prisma.paiement.deleteMany();
        await prisma.payslip.deleteMany();
        await prisma.payRun.deleteMany();
        await prisma.employe.deleteMany();
        await prisma.utilisateur.deleteMany();
        await prisma.entreprise.deleteMany();
        await prisma.dashboardStats.deleteMany();
        await prisma.frequencyEvolution.deleteMany();
        await prisma.upcomingPayment.deleteMany();
        await prisma.pricingPlan.deleteMany();
        await prisma.pricingFeature.deleteMany();
        await prisma.marketingContent.deleteMany();
        // Exécuter les seeders dans l'ordre des dépendances
        const entreprises = await seedEntreprises();
        const utilisateurs = await seedUtilisateurs(entreprises);
        const employes = await seedEmployes(entreprises);
        const payruns = await seedPayRuns(entreprises);
        const payslips = await seedPayslips(employes, payruns);
        const paiements = await seedPaiements(payslips);
        const pricingPlans = await seedPricingPlans();
        const dashboardData = await seedDashboardData();
        const marketingContent = await seedMarketingContent();
        console.log('🎉 Seeding terminé avec succès !');
        console.log('\n📊 Résumé des données créées :');
        console.log(`   • ${entreprises.length} entreprises sénégalaises`);
        console.log(`   • ${utilisateurs.length} utilisateurs`);
        console.log(`   • ${employes.length} employés`);
        console.log(`   • ${payruns.length} cycles de paie`);
        console.log(`   • ${payslips.length} bulletins de paie`);
        console.log(`   • ${paiements.length} paiements`);
        console.log(`   • ${pricingPlans.length} plans de tarification`);
        console.log(`   • 1 jeu de statistiques dashboard`);
        console.log(`   • ${dashboardData.frequencyData.length} points d'évolution des fréquences`);
        console.log(`   • ${dashboardData.upcomingPayments.length} paiements à venir`);
        console.log(`   • Contenu marketing complet (hero, avantages, stats, CTA)`);
        console.log('\n🔐 Comptes de test :');
        console.log('   Super Admin: rama.gueye@odc.sn / passer123');
        console.log('   Admin Sonatel: fatou.ndiaye@sonatel.sn / admin123');
        console.log('   Admin Banque Atlantique: moussa.fall@banqueatlantique.sn / admin123');
        console.log('   Admin Orange: admin@orange.sn / admin123');
        console.log('   Caissier Teyliom: aissatou.ba@teyliom.sn / caissier123');
        console.log('   Caissier Senelec: ousmane.sow@senelec.sn / caissier123');
        console.log('   Caissier Orange: caissier@orange.sn / caissier123');
        console.log('   Vigile Sonatel: vigile@sonatel.sn / vigile123');
        console.log('   Vigile Banque Atlantique: vigile@banqueatlantique.sn / vigile123');
        console.log('   Vigile Teyliom: vigile@teyliom.sn / vigile123');
        console.log('\n🏢 Entreprises créées :');
        console.log('   • Sonatel SA (Télécommunications)');
        console.log('   • Banque Atlantique Sénégal (Finance)');
        console.log('   • Teyliom Group (Technologie)');
        console.log('   • Senelec (Énergie)');
        console.log('   • Orange Sénégal (Télécommunications)');
    }
    catch (error) {
        console.error('❌ Erreur lors du seeding:', error);
        throw error;
    }
}
main()
    .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=index.js.map