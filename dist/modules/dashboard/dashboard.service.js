import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export class DashboardService {
    // Récupérer les statistiques du dashboard
    static async getStats(user) {
        console.log('DashboardService.getStats called with user:', user);
        // Calculer les vraies statistiques selon le rôle
        if (user && (user.role === 'admin' || user.role === 'super-admin' || user.role === 'vigile' || user.role === 'caissier')) {
            // Si c'est un super-admin avec entrepriseId défini, le traiter comme un admin
            const effectiveRole = (user.role === 'super-admin' && user.entrepriseId) ? 'admin' : user.role;
            if (effectiveRole === 'super-admin') {
                // Pour super-admin, calculer les stats globales
                console.log('Calculating global stats for super-admin');
                const totalCompanies = await prisma.entreprise.count();
                const totalEmployees = await prisma.employe.count({
                    where: { statut: 'actif' }
                });
                // Calculer la masse salariale globale
                const employees = await prisma.employe.findMany({
                    where: { statut: 'actif' },
                    select: { salaireBase: true }
                });
                let totalSalaryMass = 0;
                employees.forEach(emp => {
                    totalSalaryMass += emp.salaireBase;
                });
                // Compter tous les payruns du mois
                const currentMonth = new Date();
                currentMonth.setDate(1);
                const nextMonth = new Date(currentMonth);
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                const payrunsThisMonth = await prisma.payRun.count({
                    where: {
                        dateCreation: {
                            gte: currentMonth,
                            lt: nextMonth
                        }
                    }
                });
                // Compter tous les paiements en attente
                const pendingPayments = await prisma.payslip.count({
                    where: { statut: 'en_attente' }
                });
                // Calculer le chiffre d'affaires basé sur les payruns terminés
                const completedPayruns = await prisma.payRun.findMany({
                    where: { statut: 'termine' },
                    include: { payslips: true }
                });
                let totalRevenue = 0;
                completedPayruns.forEach(payrun => {
                    payrun.payslips.forEach(payslip => {
                        totalRevenue += payslip.salaireBrut;
                    });
                });
                // Si pas de payruns terminés, estimer basé sur la masse salariale
                if (totalRevenue === 0 && totalSalaryMass > 0) {
                    totalRevenue = totalSalaryMass * 1.2; // Estimation avec marge
                }
                const result = {
                    totalCompanies,
                    compliantCompanies: totalCompanies, // Toutes supposées conformes
                    totalRevenue,
                    totalSalaryMass,
                    totalEmployees,
                    payrunsThisMonth,
                    pendingPayments
                };
                console.log('Returning super-admin global stats:', result);
                return result;
            }
            else if (effectiveRole === 'vigile') {
                // Pour vigile, calculer les statistiques de présence/absence
                const companyId = user.entrepriseId;
                if (companyId) {
                    console.log('Calculating attendance stats for vigile company:', companyId);
                    // Compter les employés actifs de l'entreprise
                    const totalEmployees = await prisma.employe.count({
                        where: {
                            entrepriseId: companyId,
                            statut: 'actif'
                        }
                    });
                    console.log('Total employees found:', totalEmployees);
                    // Calculer les statistiques de présence pour aujourd'hui
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    // Compter les employés distincts qui ont pointé aujourd'hui (présents)
                    const presentEmployees = await prisma.pointage.findMany({
                        where: {
                            employe: {
                                entrepriseId: companyId,
                                statut: 'actif'
                            },
                            timestamp: {
                                gte: today,
                                lt: tomorrow
                            }
                        },
                        select: {
                            employeId: true
                        },
                        distinct: ['employeId']
                    });
                    const presentToday = presentEmployees.length;
                    // Les absents sont le total moins les présents
                    const absentToday = totalEmployees - presentToday;
                    // Compter le nombre total de pointages aujourd'hui
                    const totalPointagesToday = await prisma.pointage.count({
                        where: {
                            employe: {
                                entrepriseId: companyId
                            },
                            timestamp: {
                                gte: today,
                                lt: tomorrow
                            }
                        }
                    });
                    const result = {
                        totalEmployees,
                        presentToday,
                        absentToday,
                        totalPointagesToday,
                        // Champs pour compatibilité avec l'interface existante
                        totalCompanies: 1,
                        compliantCompanies: 1,
                        totalRevenue: 0,
                        totalSalaryMass: 0,
                        payrunsThisMonth: 0,
                        pendingPayments: 0
                    };
                    console.log('Returning vigile attendance stats:', result);
                    return result;
                }
            }
            else if (effectiveRole === 'caissier') {
                // Pour caissier, calculer les statistiques de paiements
                const companyId = user.entrepriseId;
                if (companyId) {
                    console.log('Calculating payment stats for caissier company:', companyId);
                    // Calculer les paiements d'aujourd'hui
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    const paymentsToday = await prisma.paiement.count({
                        where: {
                            payslip: {
                                employe: {
                                    entrepriseId: companyId
                                }
                            },
                            datePaiement: {
                                gte: today,
                                lt: tomorrow
                            }
                        }
                    });
                    // Calculer le montant total encaissé aujourd'hui
                    const paymentsData = await prisma.paiement.findMany({
                        where: {
                            payslip: {
                                employe: {
                                    entrepriseId: companyId
                                }
                            },
                            datePaiement: {
                                gte: today,
                                lt: tomorrow
                            }
                        },
                        select: { montant: true }
                    });
                    let totalAmountToday = 0;
                    paymentsData.forEach(payment => {
                        totalAmountToday += payment.montant;
                    });
                    // Compter les paiements en attente
                    const pendingPaymentsToday = await prisma.payslip.count({
                        where: {
                            employe: {
                                entrepriseId: companyId
                            },
                            statut: 'en_attente'
                        }
                    });
                    // Compter les employés payés ce mois-ci
                    const currentMonth = new Date();
                    currentMonth.setDate(1);
                    const nextMonth = new Date(currentMonth);
                    nextMonth.setMonth(nextMonth.getMonth() + 1);
                    const employeesPaidThisMonthCount = await prisma.paiement.findMany({
                        where: {
                            payslip: {
                                employe: {
                                    entrepriseId: companyId
                                }
                            },
                            datePaiement: {
                                gte: currentMonth,
                                lt: nextMonth
                            }
                        },
                        select: {
                            payslip: {
                                select: {
                                    employeId: true
                                }
                            }
                        }
                    });
                    // Utiliser un Set pour compter les employés distincts
                    const uniqueEmployeeIds = new Set(employeesPaidThisMonthCount.map(p => p.payslip.employeId));
                    const result = {
                        totalPaymentsToday: paymentsToday,
                        totalAmountToday,
                        pendingPaymentsToday,
                        employeesPaidThisMonth: uniqueEmployeeIds.size,
                        // Champs pour compatibilité avec l'interface existante
                        totalCompanies: 1,
                        compliantCompanies: 1,
                        totalRevenue: 0,
                        totalSalaryMass: 0,
                        totalEmployees: 0,
                        payrunsThisMonth: 0,
                        pendingPayments: pendingPaymentsToday
                    };
                    console.log('Returning caissier payment stats:', result);
                    return result;
                }
            }
            else {
                // Pour admin (ou super-admin se comportant comme admin), utiliser entrepriseId du token
                let companyId = user.entrepriseId;
                if (!companyId && user.id) {
                    // Fallback : chercher dans la DB si pas dans le token
                    const dbUser = await prisma.utilisateur.findUnique({
                        where: { id: user.id },
                        select: { entrepriseId: true }
                    });
                    companyId = dbUser?.entrepriseId;
                }
                if (companyId) {
                    console.log('Calculating stats for admin company:', companyId);
                    // Compter les employés actifs de l'entreprise
                    const totalEmployees = await prisma.employe.count({
                        where: {
                            entrepriseId: companyId,
                            statut: 'actif'
                        }
                    });
                    console.log('Total employees found:', totalEmployees);
                    // Calculer la masse salariale (somme des salaires des employés actifs)
                    const employees = await prisma.employe.findMany({
                        where: {
                            entrepriseId: companyId,
                            statut: 'actif'
                        },
                        select: { salaireBase: true, typeContrat: true }
                    });
                    console.log('Employees data:', employees);
                    let totalSalaryMass = 0;
                    employees.forEach(emp => {
                        totalSalaryMass += emp.salaireBase;
                    });
                    console.log('Total salary mass:', totalSalaryMass);
                    // Compter les payruns du mois en cours
                    const currentMonth = new Date();
                    currentMonth.setDate(1);
                    const nextMonth = new Date(currentMonth);
                    nextMonth.setMonth(nextMonth.getMonth() + 1);
                    const payrunsThisMonth = await prisma.payRun.count({
                        where: {
                            entrepriseId: companyId,
                            dateCreation: {
                                gte: currentMonth,
                                lt: nextMonth
                            }
                        }
                    });
                    console.log('Payruns this month:', payrunsThisMonth);
                    // Compter les paiements en attente via les payslips
                    const pendingPayments = await prisma.payslip.count({
                        where: {
                            employe: {
                                entrepriseId: companyId
                            },
                            statut: 'en_attente'
                        }
                    });
                    console.log('Pending payments:', pendingPayments);
                    const result = {
                        totalCompanies: 1, // L'entreprise de l'admin
                        compliantCompanies: 1, // Supposé conforme
                        totalRevenue: 0, // À calculer plus tard
                        totalSalaryMass,
                        totalEmployees,
                        payrunsThisMonth,
                        pendingPayments
                    };
                    console.log('Returning admin stats:', result);
                    return result;
                }
            }
        }
        // Pour super-admin ou si pas d'utilisateur, utiliser les stats statiques
        const stats = await prisma.dashboardStats.findFirst({
            orderBy: { createdAt: 'desc' }
        });
        if (!stats) {
            throw new Error('Aucune statistique trouvée');
        }
        return stats;
    }
    // Récupérer l'évolution des fréquences
    static async getFrequencyEvolution() {
        const data = await prisma.frequencyEvolution.findMany({
            orderBy: [
                { year: 'asc' },
                { month: 'asc' }
            ]
        });
        return data.map(item => ({
            month: item.month,
            frequency: item.frequency
        }));
    }
    // Récupérer les paiements à venir
    static async getUpcomingPayments() {
        const payments = await prisma.upcomingPayment.findMany({
            where: { status: 'pending' },
            orderBy: { dueDate: 'asc' }
        });
        return payments;
    }
    // Récupérer toutes les données du dashboard
    static async getDashboardData(user) {
        const [stats, frequencyEvolution, upcomingPayments] = await Promise.all([
            this.getStats(user),
            this.getFrequencyEvolution(),
            this.getUpcomingPayments()
        ]);
        let companyInfo = null;
        // Si c'est un admin (ou super-admin en mode entreprise), récupérer les infos de l'entreprise
        const effectiveRole = (user?.role === 'super-admin' && user?.entrepriseId) ? 'admin' : user?.role;
        if (effectiveRole === 'admin' && user?.entrepriseId) {
            companyInfo = await prisma.entreprise.findUnique({
                where: { id: user.entrepriseId },
                select: {
                    id: true,
                    nom: true,
                    logoUrl: true,
                    couleurPrimaire: true,
                    couleurSecondaire: true
                }
            });
        }
        return {
            stats,
            frequencyEvolution,
            upcomingPayments,
            companyInfo
        };
    }
}
//# sourceMappingURL=dashboard.service.js.map