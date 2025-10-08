export declare class DashboardService {
    static getStats(user?: any): Promise<{
        totalCompanies: number;
        compliantCompanies: number;
        totalRevenue: number;
        totalSalaryMass: number;
        totalEmployees: number;
        payrunsThisMonth: number;
        pendingPayments: number;
    } | {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        totalCompanies: number;
        compliantCompanies: number;
        totalRevenue: number;
        totalSalaryMass: number;
    }>;
    static getFrequencyEvolution(): Promise<{
        month: string;
        frequency: number;
    }[]>;
    static getUpcomingPayments(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        companyName: string;
        amount: number;
        dueDate: Date;
    }[]>;
    static getDashboardData(user?: any): Promise<{
        stats: {
            totalCompanies: number;
            compliantCompanies: number;
            totalRevenue: number;
            totalSalaryMass: number;
            totalEmployees: number;
            payrunsThisMonth: number;
            pendingPayments: number;
        } | {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            totalCompanies: number;
            compliantCompanies: number;
            totalRevenue: number;
            totalSalaryMass: number;
        };
        frequencyEvolution: {
            month: string;
            frequency: number;
        }[];
        upcomingPayments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            companyName: string;
            amount: number;
            dueDate: Date;
        }[];
        companyInfo: {
            id: string;
            nom: string;
            logoUrl: string | null;
            couleurPrimaire: string | null;
            couleurSecondaire: string | null;
        } | null;
    }>;
}
//# sourceMappingURL=dashboard.service.d.ts.map