import PayRunService from "./payrun.service.js";
const PayRunController = {
    create: async (req, res) => {
        try {
            const data = req.body;
            const result = await PayRunService.create(data);
            res.status(201).json({ success: true, data: result });
        }
        catch {
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
    findAll: async (_req, res) => {
        try {
            const result = await PayRunService.findAll();
            res.status(200).json(result);
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
            if (!id) {
                throw new Error("L'id est manquant");
            }
            await PayRunService.delete(id);
            res.status(204).send();
        }
        catch {
            res.status(500).json({ error: "Impossible de supprimer le cycle de paie" });
        }
    }
};
export default PayRunController;
//# sourceMappingURL=payrun.controller.js.map