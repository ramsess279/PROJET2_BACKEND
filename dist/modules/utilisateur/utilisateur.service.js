import UserModel from "./utilisateur.model.js";
import bcrypt from "bcrypt";
const UserService = {
    create: async (data) => {
        return UserModel.create(data);
    },
    findById: async (id) => {
        return UserModel.findById(id);
    },
    findAll: async (params) => {
        return UserModel.findAll(params);
    },
    count: async (params) => {
        return UserModel.count(params);
    },
    findByEntrepriseId: async (entrepriseId) => {
        return UserModel.findByEntrepriseId(entrepriseId);
    },
    findAdminByEntrepriseId: async (entrepriseId) => {
        return UserModel.findAdminByEntrepriseId(entrepriseId);
    },
    update: async (id, data) => {
        return UserModel.update(id, data);
    },
    changePassword: async (id, newPassword) => {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return UserModel.update(id, {
            motDePasse: hashedPassword,
            motDePasseTemporaire: null // Supprimer le mot de passe temporaire après changement
        });
    },
    delete: async (id) => {
        return UserModel.delete(id);
    }
};
export default UserService;
//# sourceMappingURL=utilisateur.service.js.map