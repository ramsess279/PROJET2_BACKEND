import UserModel from "./utilisateur.model.js";
const UserService = {
    create: async (data) => {
        return UserModel.create(data);
    },
    findById: async (id) => {
        return UserModel.findById(id);
    },
    findAll: async () => {
        return UserModel.findAll();
    },
    update: async (id, data) => {
        return UserModel.update(id, data);
    },
    delete: async (id) => {
        return UserModel.delete(id);
    }
};
export default UserService;
//# sourceMappingURL=utilisateur.service.js.map