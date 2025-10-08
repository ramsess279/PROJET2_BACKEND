import type { Utilisateur } from "@prisma/client";
import UserModel from "./utilisateur.model.js";
import bcrypt from "bcrypt";

const UserService = {
    create: async (data:Utilisateur)=> {
         return  UserModel.create(data)
        } ,

    findById: async (id: string)=> {
        return  UserModel.findById(id)
    },

    findAll: async (params?: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        role?: string;
        entrepriseId?: string;
        includeEmployeeUsers?: boolean;
    }) => {
        return UserModel.findAll(params);
    },

    count: async (params?: {
        search?: string;
        status?: string;
        role?: string;
        entrepriseId?: string;
        includeEmployeeUsers?: boolean;
    }) => {
        return UserModel.count(params);
    },

    findByEntrepriseId: async (entrepriseId: string) => {
        return UserModel.findByEntrepriseId(entrepriseId);
    },

    findAdminByEntrepriseId: async (entrepriseId: string) => {
        return UserModel.findAdminByEntrepriseId(entrepriseId);
    },

    update: async(id: string, data: Utilisateur) => {
        return UserModel.update(id , data) ;
    },

    changePassword: async (id: string, newPassword: string) => {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return UserModel.update(id, {
            motDePasse: hashedPassword,
            motDePasseTemporaire: null // Supprimer le mot de passe temporaire après changement
        });
    },

    delete: async (id: string) => {
          return UserModel.delete(id)
    }

}

export default UserService ;