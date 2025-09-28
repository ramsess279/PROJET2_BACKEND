import type { Employe } from "./employe.entity.js";
declare const EmployeModel: {
    create: (data: Employe) => import(".prisma/client").Prisma.Prisma__EmployeClient<{
        id: string;
        nomComplet: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        email: string | null;
        telephone: string | null;
        statut: string;
        dateEmbauche: Date | null;
        dateFin: Date | null;
        entrepriseId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findById: (id: string) => import(".prisma/client").Prisma.Prisma__EmployeClient<{
        id: string;
        nomComplet: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        email: string | null;
        telephone: string | null;
        statut: string;
        dateEmbauche: Date | null;
        dateFin: Date | null;
        entrepriseId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll: () => import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        nomComplet: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        email: string | null;
        telephone: string | null;
        statut: string;
        dateEmbauche: Date | null;
        dateFin: Date | null;
        entrepriseId: string;
    }[]>;
    update: (id: string, data: Partial<Employe>) => import(".prisma/client").Prisma.Prisma__EmployeClient<{
        id: string;
        nomComplet: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        email: string | null;
        telephone: string | null;
        statut: string;
        dateEmbauche: Date | null;
        dateFin: Date | null;
        entrepriseId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete: (id: string) => import(".prisma/client").Prisma.Prisma__EmployeClient<{
        id: string;
        nomComplet: string;
        poste: string | null;
        typeContrat: string;
        salaireBase: number;
        coordonneeBancaire: string | null;
        email: string | null;
        telephone: string | null;
        statut: string;
        dateEmbauche: Date | null;
        dateFin: Date | null;
        entrepriseId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
};
export default EmployeModel;
//# sourceMappingURL=%20employe.model.d.ts.map