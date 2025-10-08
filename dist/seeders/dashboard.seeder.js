import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function seedDashboardData() {
    console.log('📊 Création des données du dashboard...');
    // Statistiques globales
    const dashboardStats = await prisma.dashboardStats.create({
        data: {
            totalCompanies: 127,
            compliantCompanies: 98,
            totalRevenue: 45000000,
            totalSalaryMass: 285000000,
        }
    });
    // Évolution des fréquences
    const frequencyData = await Promise.all([
        prisma.frequencyEvolution.create({ data: { month: 'Août', frequency: 85, year: 2024 } }),
        prisma.frequencyEvolution.create({ data: { month: 'Sep', frequency: 92, year: 2024 } }),
        prisma.frequencyEvolution.create({ data: { month: 'Oct', frequency: 88, year: 2024 } }),
        prisma.frequencyEvolution.create({ data: { month: 'Nov', frequency: 95, year: 2024 } }),
        prisma.frequencyEvolution.create({ data: { month: 'Déc', frequency: 89, year: 2024 } }),
        prisma.frequencyEvolution.create({ data: { month: 'Jan', frequency: 94, year: 2025 } }),
    ]);
    // Paiements à venir
    const upcomingPayments = await Promise.all([
        prisma.upcomingPayment.create({
            data: {
                companyName: 'Entreprise ABC',
                amount: 2500000,
                dueDate: new Date('2024-01-15'),
                status: 'pending'
            }
        }),
        prisma.upcomingPayment.create({
            data: {
                companyName: 'Société XYZ',
                amount: 1800000,
                dueDate: new Date('2024-01-15'),
                status: 'pending'
            }
        }),
        prisma.upcomingPayment.create({
            data: {
                companyName: 'Groupe DEF',
                amount: 3200000,
                dueDate: new Date('2024-01-16'),
                status: 'pending'
            }
        }),
    ]);
    console.log(`✅ Statistiques du dashboard créées`);
    console.log(`✅ ${frequencyData.length} points d'évolution des fréquences créés`);
    console.log(`✅ ${upcomingPayments.length} paiements à venir créés`);
    return { dashboardStats, frequencyData, upcomingPayments };
}
//# sourceMappingURL=dashboard.seeder.js.map