import PayRunService from "./payrun.service.js";
const PayRunController = {
    create: async (req, res) => {
        try {
            const data = req.body;
            console.log('PayRun create - req.user:', req.user);
            console.log('PayRun create - data before:', data);
            // Utiliser l'entreprise de l'utilisateur si disponible (admin ou super-admin en mode entreprise)
            if (req.user?.entrepriseId) {
                data.entrepriseId = req.user.entrepriseId;
                console.log('PayRun create - set entrepriseId from user:', data.entrepriseId);
            }
            // Pour super-admin pur (sans entrepriseId), entrepriseId doit être fourni dans le formulaire
            else if (req.user?.role === 'super-admin' && !data.entrepriseId) {
                console.log('PayRun create - super-admin without entrepriseId');
                return res.status(400).json({ error: "Entreprise requise pour super-admin" });
            }
            // Pour admin, entrepriseId devrait déjà être défini ci-dessus
            if (!data.entrepriseId) {
                console.log('PayRun create - no entrepriseId found');
                return res.status(400).json({ error: "Entreprise requise" });
            }
            console.log('PayRun create - data after:', data);
            const result = await PayRunService.create(data);
            res.status(201).json({ success: true, data: result });
        }
        catch (error) {
            console.error('PayRun create error:', error);
            res.status(500).json({ error: "Impossible de créer le cycle de paie" });
        }
    },
    findById: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("L'id est manquant");
            }
            const result = await PayRunService.findById(id);
            res.status(200).json(result);
        }
        catch {
            res.status(500).json({ error: "Impossible de trouver le cycle de paie" });
        }
    },
    findAll: async (req, res) => {
        try {
            // Filtrer par entreprise si entrepriseId est défini (pour admin ou super-admin en mode entreprise)
            let entrepriseId;
            if (req.user?.entrepriseId) {
                entrepriseId = req.user.entrepriseId;
            }
            const result = await PayRunService.findAll(entrepriseId ? { entrepriseId } : {});
            res.status(200).json({
                data: result,
                total: result.length
            });
        }
        catch {
            res.status(500).json({ error: "Impossible de récupérer les cycles de paie" });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("L'id est manquant");
            }
            const data = req.body;
            const result = await PayRunService.update(id, data);
            res.status(200).json({ success: true, data: result });
        }
        catch {
            res.status(500).json({ error: "Impossible de mettre à jour le cycle de paie" });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            console.log('PayRun controller delete - id:', id, 'user:', req.user);
            if (!id) {
                throw new Error("L'id est manquant");
            }
            await PayRunService.delete(id);
            res.status(204).send();
        }
        catch (error) {
            console.error('PayRun controller delete error:', error);
            const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
            res.status(500).json({ error: "Impossible de supprimer le cycle de paie: " + errorMessage });
        }
    },
    approve: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("L'id est manquant");
            }
            const result = await PayRunService.approve(id);
            res.status(200).json({ success: true, data: result });
        }
        catch {
            res.status(500).json({ error: "Impossible d'approuver le cycle de paie" });
        }
    },
    generatePayslips: async (req, res) => {
        try {
            const { id } = req.params;
            const { force } = req.query; // Paramètre pour forcer la régénération
            if (!id) {
                throw new Error("L'id du cycle est manquant");
            }
            const count = await PayRunService.generatePayslips(id, force === 'true');
            res.status(200).json({ success: true, message: `${count} bulletins générés`, count });
        }
        catch (error) {
            console.error('Erreur génération bulletins:', error);
            const errorMessage = error instanceof Error ? error.message : "Impossible de générer les bulletins";
            res.status(500).json({ error: errorMessage });
        }
    }
};
export default PayRunController;
//# sourceMappingURL=payrun.controller.js.map