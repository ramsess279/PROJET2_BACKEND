import type { Employe } from "./employe.entity.js";
declare const EmployeModel: {
    create: (data: Employe) => import(".prisma/client").Prisma.Prisma__EmployeClient<{
        id: string;
        email: string | null;
        telephone: string | null;
        nomComplet: string;
        statut: string;
        entrepriseId: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        dateEmbauche: Date | null;
        dateFin: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findById: (id: string) => import(".prisma/client").Prisma.Prisma__EmployeClient<{
        id: string;
        email: string | null;
        telephone: string | null;
        nomComplet: string;
        statut: string;
        entrepriseId: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        dateEmbauche: Date | null;
        dateFin: Date | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll: () => import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        email: string | null;
        telephone: string | null;
        nomComplet: string;
        statut: string;
        entrepriseId: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        dateEmbauche: Date | null;
        dateFin: Date | null;
    }[]>;
    update: (id: string, data: Partial<Employe>) => import(".prisma/client").Prisma.Prisma__EmployeClient<{
        id: string;
        email: string | null;
        telephone: string | null;
        nomComplet: string;
        statut: string;
        entrepriseId: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        dateEmbauche: Date | null;
        dateFin: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete: (id: string) => import(".prisma/client").Prisma.Prisma__EmployeClient<{
        id: string;
        email: string | null;
        telephone: string | null;
        nomComplet: string;
        statut: string;
        entrepriseId: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        dateEmbauche: Date | null;
        dateFin: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
};
export default EmployeModel;
//# sourceMappingURL=%20employe.model.d.ts.map