import PaiementService from "./paiement.service.js";
const PaiementController = {
    create: async (req, res) => {
        try {
            const data = req.body;
            const result = await PaiementService.create(data);
            res.status(201).json({ success: true, data: result });
        }
        catch {
            res.status(500).json({ error: "Impossible d'enregistrer le paiement" });
        }
    },
    findById: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("L'id est manquant");
            }
            const result = await PaiementService.findById(id);
            res.status(200).json(result);
        }
        catch {
            res.status(500).json({ error: "Impossible de trouver le paiement" });
        }
    },
    findAll: async (_req, res) => {
        try {
            const result = await PaiementService.findAll();
            res.status(200).json(result);
        }
        catch {
            res.status(500).json({ error: "Impossible de récupérer les paiements" });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("L'id est manquant");
            }
            const data = req.body;
            const result = await PaiementService.update(id, data);
            res.status(200).json({ success: true, data: result });
        }
        catch {
            res.status(500).json({ error: "Impossible de mettre à jour le paiement" });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("L'id est manquant");
            }
            await PaiementService.delete(id);
            res.status(204).send();
        }
        catch {
            res.status(500).json({ error: "Impossible de supprimer le paiement" });
        }
    }
};
export default PaiementController;
//# sourceMappingURL=paiement.controller.js.map