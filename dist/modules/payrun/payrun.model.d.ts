import type { PayRun } from "./payrun.entity.js";
declare const PayRunModel: {
    create: (data: PayRun) => import(".prisma/client").Prisma.Prisma__PayRunClient<{
        id: string;
        statut: string;
        entrepriseId: string;
        dateFin: Date | null;
        type: string;
        periode: string;
        dateCreation: Date;
        dateDebut: Date | null;
        heureDebut: string | null;
        heureFin: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findById: (id: string) => import(".prisma/client").Prisma.Prisma__PayRunClient<{
        id: string;
        statut: string;
        entrepriseId: string;
        dateFin: Date | null;
        type: string;
        periode: string;
        dateCreation: Date;
        dateDebut: Date | null;
        heureDebut: string | null;
        heureFin: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll: (params?: {
        entrepriseId?: string;
    }) => import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        statut: string;
        entrepriseId: string;
        dateFin: Date | null;
        type: string;
        periode: string;
        dateCreation: Date;
        dateDebut: Date | null;
        heureDebut: string | null;
        heureFin: string | null;
    }[]>;
    update: (id: string, data: Partial<PayRun>) => import(".prisma/client").Prisma.Prisma__PayRunClient<{
        id: string;
        statut: string;
        entrepriseId: string;
        dateFin: Date | null;
        type: string;
        periode: string;
        dateCreation: Date;
        dateDebut: Date | null;
        heureDebut: string | null;
        heureFin: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete: (id: string) => import(".prisma/client").Prisma.Prisma__PayRunClient<{
        id: string;
        statut: string;
        entrepriseId: string;
        dateFin: Date | null;
        type: string;
        periode: string;
        dateCreation: Date;
        dateDebut: Date | null;
        heureDebut: string | null;
        heureFin: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
};
export default PayRunModel;
//# sourceMappingURL=payrun.model.d.ts.map