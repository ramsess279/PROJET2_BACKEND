import prisma from "../../config/db.js";
import type{ Utilisateur } from "./utilisateur.entity.js";


 const UserModel = {
    create: (data: Utilisateur) => { 
       return  prisma.utilisateur.create({data})
     },

    findById: (id: string) => {
        return prisma.utilisateur.findUnique({where: {id}})
    },

    findAll: (params?: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        role?: string;
        entrepriseId?: string;
        includeEmployeeUsers?: boolean;
    }) => {
        const { page = 1, limit = 10, search, status, role, entrepriseId, includeEmployeeUsers } = params || {};

        const where: any = {};

        if (search) {
            where.OR = [
                { nomComplet: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (status && status !== 'all') {
            where.statut = status;
        }

        if (role && role !== 'all') {
            where.role = role;
        }

        if (entrepriseId) {
            where.entrepriseId = entrepriseId;
        }

        // Inclure les utilisateurs créés via les employés (caissiers, vigiles)
        if (includeEmployeeUsers) {
            where.OR = where.OR || [];
            where.OR.push({ employeId: { not: null } });
        }

        return prisma.utilisateur.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { id: 'desc' },
            include: { employe: true }
        });
    },

    count: (params?: {
        search?: string;
        status?: string;
        role?: string;
        entrepriseId?: string;
        includeEmployeeUsers?: boolean;
    }) => {
        const { search, status, role, entrepriseId, includeEmployeeUsers } = params || {};

        const where: any = {};

        if (search) {
            where.OR = [
                { nomComplet: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (status && status !== 'all') {
            where.statut = status;
        }

        if (role && role !== 'all') {
            where.role = role;
        }

        if (entrepriseId) {
            where.entrepriseId = entrepriseId;
        }

        // Inclure les utilisateurs créés via les employés (caissiers, vigiles)
        if (includeEmployeeUsers) {
            where.OR = where.OR || [];
            where.OR.push({ employeId: { not: null } });
        }

        return prisma.utilisateur.count({ where });
    },

    findByEntrepriseId: (entrepriseId: string) => {
        return prisma.utilisateur.findMany({
            where: { entrepriseId }
        });
    },

    findAdminByEntrepriseId: (entrepriseId: string) => {
        return prisma.utilisateur.findFirst({
            where: {
                entrepriseId,
                role: 'admin'
            }
        });
    },

   update: (id: string ,data: Partial<Utilisateur> ) => {
     return prisma.utilisateur.update(
         {
             where : {id},
             data
         }
     )
    },

   delete: (id: string) => {
    prisma.utilisateur.delete({where: {id}})
   }
}
export default UserModel ;