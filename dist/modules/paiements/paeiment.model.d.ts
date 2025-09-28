import type { Paiement } from "./paiement.entity.js";
declare const PaiementModel: {
    create: (data: Paiement) => import(".prisma/client").Prisma.Prisma__PaiementClient<{
        id: string;
        montant: number;
        nombreJour: number | null;
        nombreHeure: number | null;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        statut: string;
        payslipId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findById: (id: string) => import(".prisma/client").Prisma.Prisma__PaiementClient<{
        id: string;
        montant: number;
        nombreJour: number | null;
        nombreHeure: number | null;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        statut: string;
        payslipId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll: () => import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        montant: number;
        nombreJour: number | null;
        nombreHeure: number | null;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        statut: string;
        payslipId: string;
    }[]>;
    update: (id: string, data: Partial<Paiement>) => import(".prisma/client").Prisma.Prisma__PaiementClient<{
        id: string;
        montant: number;
        nombreJour: number | null;
        nombreHeure: number | null;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        statut: string;
        payslipId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete: (id: string) => import(".prisma/client").Prisma.Prisma__PaiementClient<{
        id: string;
        montant: number;
        nombreJour: number | null;
        nombreHeure: number | null;
        mode: string;
        datePaiement: Date;
        recuUrl: string | null;
        statut: string;
        payslipId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
};
export default PaiementModel;
//# sourceMappingURL=paeiment.model.d.ts.map