import EmployeService from "./employe.service.js";
const EmployeController = {
    create: async (req, res) => {
        try {
            const data = req.body;
            const result = await EmployeService.create(data);
            res.status(201).json({ success: true, data: result });
        }
        catch {
            res.status(500).json({ error: "Impossible de créer cet employé" });
        }
    },
    findById: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id)
                throw new Error("Veuillez fournir l'id de l'employé");
            const result = await EmployeService.findById(id);
            res.status(200).json(result);
        }
        catch {
            res.status(500).json({ error: "Impossible de trouver cet employé" });
        }
    },
    findAll: async (_req, res) => {
        try {
            const result = await EmployeService.findAll();
            res.status(200).json(result);
        }
        catch {
            res.status(500).json({ error: "Impossible de récupérer les employés" });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const data = req.body;
            if (!id)
                throw new Error("Veuillez fournir l'id de l'employé à mettre à jour");
            const result = await EmployeService.update(id, data);
            res.status(200).json({ success: true, data: result });
        }
        catch {
            res.status(500).json({ error: "Impossible de mettre à jour cet employé" });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id)
                throw new Error("Veuillez fournir l'id de l'employé à supprimer");
            await EmployeService.delete(id);
            res.status(204).send();
        }
        catch {
            res.status(500).json({ error: "Impossible de supprimer cet employé" });
        }
    }
};
export default EmployeController;
//# sourceMappingURL=employe.controller.js.map