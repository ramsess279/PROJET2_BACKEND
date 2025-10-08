import UserService from "./utilisateur.service.js";
const UserController = {
    create: async (req, res) => {
        try {
            const data = req.body;
            const result = await UserService.create(data);
            console.log(result);
            console.log(result);
            res.status(201).json({ success: true, data: result });
        }
        catch {
            res.status(500).json({ error: "Impossible de creer cette utilisateur " });
        }
    },
    findById: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("Veuillez rajouter l'id de l'utilisateur concerné ");
            }
            const result = await UserService.findById(id);
            res.status(200).json(result);
        }
        catch {
            res.status(500).json({ error: "Impossible de trouver cette utilisateur " });
        }
    },
    findAll: async (req, res) => {
        try {
            const { page = 1, limit = 10, search, status, role, entrepriseId, includeEmployeeUsers } = req.query;
            const params = {};
            if (search)
                params.search = search;
            if (status)
                params.status = status;
            if (role)
                params.role = role;
            if (entrepriseId)
                params.entrepriseId = entrepriseId;
            if (includeEmployeeUsers === 'true')
                params.includeEmployeeUsers = true;
            // Logique de sécurité : filtrer toujours par entreprise pour les non-super-admins
            if (req.user?.role !== 'super-admin') {
                // Pour les admins et super-admins en mode entreprise, forcer le filtrage par leur entreprise
                params.entrepriseId = req.user?.entrepriseId;
                // Pour les admins, filtrer aussi par les utilisateurs créés via les employés
                // (caissiers et vigiles)
                if (req.user?.role === 'admin') {
                    params.includeEmployeeUsers = true;
                }
            }
            // Pour les super-admins, pas de filtrage automatique (ils voient tout)
            const result = await UserService.findAll(params);
            const total = await UserService.count(params);
            res.status(200).json({ data: result, total });
        }
        catch {
            res.status(500).json({ error: "Impossible de récupérer les utilisateurs" });
        }
    },
    findByEntrepriseId: async (req, res) => {
        try {
            const { entrepriseId } = req.params;
            if (!entrepriseId) {
                return res.status(400).json({ error: "Paramètre 'entrepriseId' manquant" });
            }
            const result = await UserService.findByEntrepriseId(entrepriseId);
            res.status(200).json(result);
        }
        catch {
            res.status(500).json({ error: "Impossible de récupérer les utilisateurs de l'entreprise" });
        }
    },
    findAdminByEntrepriseId: async (req, res) => {
        try {
            const { entrepriseId } = req.params;
            if (!entrepriseId) {
                return res.status(400).json({ error: "Paramètre 'entrepriseId' manquant" });
            }
            const result = await UserService.findAdminByEntrepriseId(entrepriseId);
            res.status(200).json(result);
        }
        catch {
            res.status(500).json({ error: "Impossible de récupérer l'admin de l'entreprise" });
        }
    },
    changePassword: async (req, res) => {
        try {
            const { id } = req.params;
            const { motDePasse } = req.body;
            if (!id) {
                return res.status(400).json({ error: "Paramètre 'id' manquant" });
            }
            if (!motDePasse) {
                return res.status(400).json({ error: "Nouveau mot de passe requis" });
            }
            const result = await UserService.changePassword(id, motDePasse);
            res.status(200).json({ success: true, data: result });
        }
        catch {
            res.status(500).json({ error: "Impossible de changer le mot de passe" });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const data = req.body;
            if (!id) {
                throw new Error("Veuillez fournir l'id de l'utilisateur à mettre à jour");
            }
            const result = await UserService.update(id, data);
            res.status(200).json({ success: true, data: result });
        }
        catch {
            res.status(500).json({ error: "Impossible de mettre à jour cet utilisateur" });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("Veuillez fournir l'id de l'utilisateur à supprimer");
            }
            await UserService.delete(id);
            res.status(204).send();
        }
        catch {
            res.status(500).json({ error: "Impossible de supprimer cet utilisateur" });
        }
    }
};
export default UserController;
//# sourceMappingURL=utilisateur.controller.js.map