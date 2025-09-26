import type { Utilisateur } from "@prisma/client";
import UserModel from "./utilisateur.model.js";

const UserService = {
    create: async (data:Utilisateur)=> {
         return  UserModel.create(data)
        } ,

    findById: async (id: string)=> {
        return  UserModel.findById(id)
    },

    findAll: async () => {
        return UserModel.findAll();
    },

    update: async(id: string, data: Utilisateur) => {
        return UserModel.update(id , data) ;
    },

    delete: async (id: string) => {
         return UserModel.delete(id)
    }

}

export default UserService ;