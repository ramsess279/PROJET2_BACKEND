import prisma from "../../config/db.js";
const EmployeModel = {
    create: (data) => {
        return prisma.employe.create({ data });
    },
    findById: (id) => {
        return prisma.employe.findUnique({ where: { id } });
    },
    findAll: () => {
        return prisma.employe.findMany();
    },
    update: (id, data) => {
        return prisma.employe.update({
            where: { id },
            data,
        });
    },
    delete: (id) => {
        return prisma.employe.delete({ where: { id } });
    }
};
export default EmployeModel;
//# sourceMappingURL=%20employe.model.js.map