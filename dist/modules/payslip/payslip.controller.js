import PayslipService from "./payslip.service.js";
const PayslipController = {
    create: async (req, res) => {
        try {
            const data = req.body;
            const result = await PayslipService.create(data);
            res.status(201).json({ success: true, data: result });
        }
        catch {
            res.status(500).json({ error: "Impossible de créer le bulletin de paie" });
        }
    },
    findById: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("L'id est manquant");
            }
            const result = await PayslipService.findById(id);
            res.status(200).json(result);
        }
        catch {
            res.status(500).json({ error: "Impossible de trouver le bulletin de paie" });
        }
    },
    findAll: async (req, res) => {
        try {
            // Toujours filtrer par entrepriseId si présent, quel que soit le rôle
            let entrepriseId = null;
            if (req.user?.entrepriseId) {
                entrepriseId = req.user.entrepriseId;
            }
            const result = await PayslipService.findAll(entrepriseId ? { entrepriseId } : undefined);
            res.status(200).json({
                data: result,
                total: result.length
            });
        }
        catch {
            res.status(500).json({ error: "Impossible de récupérer les bulletins de paie" });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            console.log('Payslip update - id:', id);
            console.log('Payslip update - req.body:', req.body);
            if (!id) {
                throw new Error("L'id est manquant");
            }
            const data = req.body;
            const result = await PayslipService.update(id, data);
            console.log('Payslip update - result:', result);
            res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            console.error('Payslip update error:', error);
            res.status(500).json({ error: "Impossible de mettre à jour le bulletin de paie" });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("L'id est manquant");
            }
            await PayslipService.delete(id);
            res.status(204).send();
        }
        catch {
            res.status(500).json({ error: "Impossible de supprimer le bulletin de paie" });
        }
    },
    findByPayrun: async (req, res) => {
        try {
            const { payrunId } = req.params;
            console.log('findByPayrun appelé avec payrunId:', payrunId);
            if (!payrunId) {
                throw new Error("L'id du cycle de paie est manquant");
            }
            const result = await PayslipService.findByPayrun(payrunId);
            console.log('Résultat findByPayrun:', result);
            res.status(200).json({
                data: result,
                total: result.length
            });
        }
        catch (error) {
            console.error('Erreur dans findByPayrun:', error);
            res.status(500).json({ error: "Impossible de récupérer les bulletins du cycle" });
        }
    },
    // Télécharger un bulletin en PDF
    download: async (req, res) => {
        console.log('Download PDF appelé pour id:', req.params.id, 'user:', req.user?.id);
        try {
            const { id } = req.params;
            if (!id) {
                console.log('ID manquant');
                return res.status(400).json({ error: "ID bulletin requis" });
            }
            console.log('Génération PDF pour id:', id);
            // Générer le PDF
            const pdfBuffer = await PayslipService.generatePDF(id);
            // Définir les headers pour le téléchargement
            const filename = `bulletin_paie_${id}.pdf`;
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.setHeader('Content-Length', pdfBuffer.length);
            // Envoyer le PDF
            res.send(pdfBuffer);
        }
        catch (error) {
            console.error('Erreur génération PDF bulletin:', error);
            const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
            res.status(500).json({ error: "Impossible de générer le PDF: " + errorMessage });
        }
    }
};
export default PayslipController;
//# sourceMappingURL=payslip.controller.js.map