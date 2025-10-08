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
    findAll: async (req, res) => {
        try {
            // Filtrer par entreprise si entrepriseId est défini (pour admin ou super-admin en mode entreprise)
            let entrepriseId;
            if (req.user?.entrepriseId) {
                entrepriseId = req.user.entrepriseId;
            }
            const result = await PaiementService.findAll(entrepriseId ? { entrepriseId } : {});
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
    },
    // Télécharger un reçu en PDF
    downloadReceipt: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: "ID paiement requis" });
            }
            console.log('Génération PDF reçu pour id:', id);
            // Générer le PDF
            const pdfBuffer = await PaiementService.generateReceipt(id);
            // Définir les headers pour le téléchargement
            const filename = `recu_paiement_${id}.pdf`;
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.setHeader('Content-Length', pdfBuffer.length);
            // Envoyer le PDF
            res.send(pdfBuffer);
        }
        catch (error) {
            console.error('Erreur génération PDF reçu:', error);
            const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
            res.status(500).json({ error: "Impossible de générer le PDF du reçu: " + errorMessage });
        }
    }
};
export default PaiementController;
//# sourceMappingURL=paiement.controller.js.map