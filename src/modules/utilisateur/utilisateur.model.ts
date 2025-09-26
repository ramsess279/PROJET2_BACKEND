import prisma from "../../config/db.js";
import type{ Utilisateur } from "./utilisateur.entity.js";


 const UserModel = {
    create: (data: Utilisateur) => { 
       return  prisma.utilisateur.create({data})
     },

    findById: (id: string) => {
        return prisma.utilisateur.findUnique({where: {id}})
    },

    findAll: () => {
        return prisma.utilisateur.findMany() ;
    },

   update: (id: string ,data: Utilisateur ) => {
    prisma.utilisateur.update(
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