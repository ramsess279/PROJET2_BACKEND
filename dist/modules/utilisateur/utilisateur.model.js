import prisma from "../../config/db.js";
const UserModel = {
    create: (data) => {
        return prisma.utilisateur.create({ data });
    },
    findById: (id) => {
        return prisma.utilisateur.findUnique({ where: { id } });
    },
    findAll: () => {
        return prisma.utilisateur.findMany();
    },
    update: (id, data) => {
        prisma.utilisateur.update({
            where: { id },
            data
        });
    },
    delete: (id) => {
        prisma.utilisateur.delete({ where: { id } });
    }
};
export default UserModel;
//# sourceMappingURL=utilisateur.model.js.map