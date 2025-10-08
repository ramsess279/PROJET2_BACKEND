import EmployeModel from "./ employe.model.js";
import prisma from "../../config/db.js";
import bcrypt from "bcryptjs";
const EmployeService = {
    create: async (data) => {
        // Créer l'employé
        const employe = await EmployeModel.create(data);
        // Si c'est un caissier ou vigile, créer automatiquement un utilisateur
        if (data.poste === 'caissier' || data.poste === 'vigile') {
            const role = data.poste; // 'caissier' ou 'vigile'
            // Utiliser l'email de l'employé s'il est fourni, sinon générer un email
            const email = data.email || `${data.nomComplet.toLowerCase().replace(/\s+/g, '.')}@${data.entrepriseId}.local`;
            const motDePasse = Math.random().toString(36).slice(-8); // Mot de passe temporaire
            const utilisateurData = {
                entrepriseId: data.entrepriseId,
                employeId: employe.id,
                nomComplet: data.nomComplet,
                email,
                telephone: data.telephone || '',
                motDePasse: await bcrypt.hash(motDePasse, 10),
                motDePasseTemporaire: motDePasse,
                role,
                statut: 'actif'
            };
            await prisma.utilisateur.create({ data: utilisateurData });
        }
        return employe;
    },
    findById: async (id) => {
        return EmployeModel.findById(id);
    },
    findAll: async (params) => {
        return EmployeModel.findAll(params);
    },
    update: async (id, data) => {
        return EmployeModel.update(id, data);
    },
    delete: async (id) => {
        return EmployeModel.delete(id);
    },
    count: async (params) => {
        return EmployeModel.count(params);
    }
};
export default EmployeService;
//# sourceMappingURL=employe.service.js.map