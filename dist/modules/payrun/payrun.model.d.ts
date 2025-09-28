import type { PayRun } from "./payrun.entity.js";
declare const PayRunModel: {
    create: (data: PayRun) => import(".prisma/client").Prisma.Prisma__PayRunClient<{
        id: string;
        periode: string;
        type: string;
        statut: string;
        dateCreation: Date;
        entrepriseId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findById: (id: string) => import(".prisma/client").Prisma.Prisma__PayRunClient<{
        id: string;
        periode: string;
        type: string;
        statut: string;
        dateCreation: Date;
        entrepriseId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll: () => import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        periode: string;
        type: string;
        statut: string;
        dateCreation: Date;
        entrepriseId: string;
    }[]>;
    update: (id: string, data: Partial<PayRun>) => import(".prisma/client").Prisma.Prisma__PayRunClient<{
        id: string;
        periode: string;
        type: string;
        statut: string;
        dateCreation: Date;
        entrepriseId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete: (id: string) => import(".prisma/client").Prisma.Prisma__PayRunClient<{
        id: string;
        periode: string;
        type: string;
        statut: string;
        dateCreation: Date;
        entrepriseId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
};
export default PayRunModel;
//# sourceMappingURL=payrun.model.d.ts.map