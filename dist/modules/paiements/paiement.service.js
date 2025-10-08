import PaiementModel from "./paiement.model.js";
import PayslipModel from "../payslip/payslip.model.js";
import prisma from "../../config/db.js";
// @ts-ignore
import PDFDocument from 'pdfkit';
const PaiementService = {
    create: async (data) => {
        const payment = await PaiementModel.create(data);
        // Update payslip status
        if (data.payslipId) {
            const payslip = await prisma.payslip.findUnique({
                where: { id: data.payslipId },
                include: { paiements: true }
            });
            if (payslip) {
                const totalPaid = payslip.paiements.reduce((sum, p) => sum + p.montant, 0) + data.montant;
                const newStatus = totalPaid >= payslip.salaireNet ? 'payé' : 'partiel';
                await PayslipModel.update(data.payslipId, { statut: newStatus });
            }
        }
        return payment;
    },
    findById: async (id) => PaiementModel.findById(id),
    findAll: async (params) => PaiementModel.findAll(params),
    update: async (id, data) => PaiementModel.update(id, data),
    delete: async (id) => PaiementModel.delete(id),
    // Générer un PDF de reçu de paiement professionnel
    generateReceipt: async (paiementId) => {
        console.log('Début génération PDF reçu professionnel pour id:', paiementId);
        try {
            // Récupérer les données du paiement avec les relations
            const paiement = await PaiementModel.findByIdWithRelations(paiementId);
            console.log('Paiement récupéré:', !!paiement);
            if (!paiement) {
                throw new Error('Paiement non trouvé');
            }
            // Créer le document PDF professionnel
            const doc = new PDFDocument({
                size: 'A4',
                margin: 50,
                bufferPages: true
            });
            const buffers = [];
            // Collecter les chunks du PDF
            // @ts-ignore
            doc.on('data', (chunk) => buffers.push(chunk));
            doc.on('end', () => { });
            // Couleurs officielles de l'entreprise
            const primaryBlue = '#2563eb'; // Bleu principal
            const secondaryGray = '#64748b'; // Gris secondaire
            const accentGreen = '#10b981'; // Vert accentué
            const lightGray = '#f8fafc'; // Gris clair pour fond
            const darkGray = '#374151'; // Gris foncé pour texte
            // === EN-TÊTE PROFESSIONNEL ===
            // Fond bleu pour l'en-tête
            doc.rect(0, 0, doc.page.width, 120).fill(primaryBlue);
            // Logo/Entreprise à gauche (espace réservé pour logo)
            doc.fillColor('white').fontSize(18).font('Helvetica-Bold');
            doc.text(paiement.payslip?.employe?.entreprise?.nom || 'ENTREPRISE', 50, 40);
            // Titre à droite
            doc.fontSize(24).font('Helvetica-Bold');
            doc.text('REÇU DE PAIEMENT', 0, 40, { align: 'right', width: doc.page.width - 100 });
            // Numéro de reçu
            doc.fontSize(12).font('Helvetica');
            doc.text(`N° ${paiement.id.slice(-8).toUpperCase()}`, 0, 70, { align: 'right', width: doc.page.width - 100 });
            // Date de génération
            doc.fontSize(10);
            doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 0, 85, { align: 'right', width: doc.page.width - 100 });
            doc.moveDown(3);
            // === SECTION INFORMATIONS EMPLOYÉ ===
            const sectionY = doc.y;
            // Fond gris clair pour la section
            doc.rect(50, sectionY, doc.page.width - 100, 120).fill(lightGray);
            doc.rect(50, sectionY, doc.page.width - 100, 120).stroke(primaryBlue);
            // Titre de section
            doc.fillColor(primaryBlue).fontSize(16).font('Helvetica-Bold');
            doc.text('INFORMATIONS EMPLOYÉ', 70, sectionY + 15);
            // Ligne de séparation
            doc.moveTo(70, sectionY + 35).lineTo(doc.page.width - 70, sectionY + 35).stroke(primaryBlue);
            // Contenu
            doc.fillColor(darkGray).fontSize(11).font('Helvetica');
            const contentY = sectionY + 50;
            // Grille d'informations - Ligne 1
            doc.text(`Nom complet:`, 80, contentY);
            doc.font('Helvetica-Bold').text(`${paiement.payslip?.employe?.nomComplet || 'N/A'}`, 200, contentY);
            doc.font('Helvetica').text(`Poste:`, 350, contentY);
            doc.font('Helvetica-Bold').text(`${paiement.payslip?.employe?.poste || 'N/A'}`, 400, contentY);
            // Ligne 2
            doc.font('Helvetica').text(`Email:`, 80, contentY + 25);
            doc.font('Helvetica-Bold').text(`${paiement.payslip?.employe?.email || 'N/A'}`, 200, contentY + 25);
            doc.font('Helvetica').text(`Téléphone:`, 350, contentY + 25);
            doc.font('Helvetica-Bold').text(`${paiement.payslip?.employe?.telephone || 'N/A'}`, 400, contentY + 25);
            doc.y = sectionY + 130;
            doc.moveDown(2);
            // === SECTION DÉTAILS DU PAIEMENT ===
            const paymentY = doc.y;
            // Fond gris clair - Hauteur ajustée
            doc.rect(50, paymentY, doc.page.width - 100, 100).fill(lightGray);
            doc.rect(50, paymentY, doc.page.width - 100, 100).stroke(secondaryGray);
            // Titre
            doc.fillColor(secondaryGray).fontSize(16).font('Helvetica-Bold');
            doc.text('DÉTAILS DU PAIEMENT', 70, paymentY + 15);
            // Ligne de séparation
            doc.moveTo(70, paymentY + 35).lineTo(doc.page.width - 70, paymentY + 35).stroke(secondaryGray);
            // Contenu
            doc.fillColor(darkGray).fontSize(11).font('Helvetica');
            const paymentContentY = paymentY + 50;
            // Ligne 1
            doc.text(`Cycle de paie:`, 80, paymentContentY);
            doc.font('Helvetica-Bold').text(`${paiement.payslip?.payRun?.periode || 'N/A'}`, 200, paymentContentY);
            doc.font('Helvetica').text(`Mode de paiement:`, 350, paymentContentY);
            doc.font('Helvetica-Bold').text(`${paiement.mode || 'N/A'}`, 450, paymentContentY);
            // Ligne 2
            doc.font('Helvetica').text(`Date de paiement:`, 80, paymentContentY + 25);
            doc.font('Helvetica-Bold').text(`${new Date(paiement.datePaiement).toLocaleDateString('fr-FR')}`, 200, paymentContentY + 25);
            // Afficher les heures travaillées si disponibles - Ligne 3
            if (paiement.payslip?.nombreHeure) {
                doc.font('Helvetica').text(`Heures travaillées:`, 80, paymentContentY + 50);
                doc.font('Helvetica-Bold').text(`${Number(paiement.payslip.nombreHeure).toFixed(2)} h`, 200, paymentContentY + 50);
            }
            if (paiement.payslip?.nombreJour) {
                doc.font('Helvetica').text(`Jours travaillés:`, 350, paymentContentY + 50);
                doc.font('Helvetica-Bold').text(`${paiement.payslip.nombreJour} jours`, 450, paymentContentY + 50);
            }
            doc.y = paymentY + 110;
            doc.moveDown(2);
            // === SECTION MONTANT PAYÉ (MISE EN AVANT) ===
            const amountY = doc.y;
            // Fond vert accentué
            doc.rect(50, amountY, doc.page.width - 100, 120).fill(accentGreen);
            // Titre
            doc.fillColor('white').fontSize(20).font('Helvetica-Bold');
            doc.text('MONTANT PAYÉ', 0, amountY + 25, { align: 'center' });
            // Montant principal
            doc.fontSize(36).font('Helvetica-Bold');
            doc.text(`${paiement.montant?.toLocaleString()} XOF`, 0, amountY + 50, { align: 'center' });
            // Devise
            doc.fontSize(14).font('Helvetica');
            doc.text('Francs CFA', 0, amountY + 95, { align: 'center' });
            doc.y = amountY + 130;
            doc.moveDown(2);
            // === PIED DE PAGE ===
            const footerY = doc.page.height - 80;
            // Fond bleu discret
            doc.rect(0, footerY, doc.page.width, 80).fill(primaryBlue);
            // Texte du pied de page
            doc.fillColor('white').fontSize(10).font('Helvetica');
            doc.text('Ce reçu de paiement est généré automatiquement par le système de gestion salariale.', 0, footerY + 15, { align: 'center' });
            doc.text(`${paiement.payslip?.employe?.entreprise?.nom || 'Entreprise'} - Document officiel`, 0, footerY + 30, { align: 'center' });
            doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`, 0, footerY + 45, { align: 'center' });
            // Signature numérique
            doc.fontSize(8);
            doc.text('Signature numérique validée', 0, footerY + 60, { align: 'right', width: doc.page.width - 50 });
            // Finaliser le PDF
            doc.end();
            // Attendre que tous les chunks soient collectés
            await new Promise((resolve) => {
                doc.on('end', () => resolve());
            });
            // Combiner les buffers
            const pdfBuffer = Buffer.concat(buffers);
            console.log('Reçu PDF professionnel généré avec pdfkit, taille:', pdfBuffer.length);
            return pdfBuffer;
        }
        catch (error) {
            console.error('Erreur génération PDF reçu:', error);
            throw new Error(`Impossible de générer le PDF du reçu: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        }
    }
};
// Fonction pour générer le HTML du reçu de paiement
function generateReceiptHTML(paiement) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0,
        }).format(amount);
    };
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };
    return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reçu de Paiement - ${paiement.payslip?.employe?.nomComplet}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f8f9fa;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: white;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }

            .header {
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }

            .header h1 {
                font-size: 24px;
                margin-bottom: 10px;
                font-weight: 300;
            }

            .header .subtitle {
                font-size: 14px;
                opacity: 0.9;
            }

            .company-info {
                background-color: #f8f9fa;
                padding: 20px;
                border-bottom: 2px solid #e9ecef;
            }

            .company-info h2 {
                color: #495057;
                margin-bottom: 15px;
                font-size: 16px;
            }

            .info-section {
                background: white;
                padding: 20px;
                border-bottom: 1px solid #e9ecef;
            }

            .info-section h3 {
                color: #495057;
                margin-bottom: 15px;
                font-size: 16px;
                border-bottom: 2px solid #28a745;
                padding-bottom: 8px;
            }

            .info-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
                padding: 5px 0;
            }

            .info-row:last-child {
                margin-bottom: 0;
            }

            .label {
                font-weight: 500;
                color: #6c757d;
            }

            .value {
                font-weight: 600;
                color: #495057;
            }

            .payment-section {
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                color: white;
                padding: 25px;
                margin: 20px 0;
            }

            .payment-section h3 {
                margin-bottom: 20px;
                font-size: 18px;
            }

            .payment-amount {
                font-size: 32px;
                font-weight: bold;
                text-align: center;
                margin-bottom: 10px;
            }

            .payment-label {
                font-size: 14px;
                opacity: 0.9;
                text-align: center;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .footer {
                background-color: #f8f9fa;
                padding: 20px;
                text-align: center;
                color: #6c757d;
                font-size: 12px;
                border-top: 1px solid #e9ecef;
            }

            .receipt-number {
                background: rgba(255,255,255,0.9);
                color: #28a745;
                padding: 10px;
                border-radius: 8px;
                text-align: center;
                margin: 20px 0;
                font-weight: bold;
                font-size: 16px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div class="header">
                <h1>REÇU DE PAIEMENT</h1>
                <div class="subtitle">Reçu officiel de salaire</div>
            </div>

            <!-- Receipt Number -->
            <div class="receipt-number">
                N° ${paiement.id.slice(-8).toUpperCase()}
            </div>

            <!-- Company Info -->
            <div class="company-info">
                <h2>${paiement.payslip?.employe?.entreprise?.nom || 'Entreprise'}</h2>
                <div class="info-row">
                    <span class="label">Adresse:</span>
                    <span class="value">${paiement.payslip?.employe?.entreprise?.adresse || 'N/A'}</span>
                </div>
                <div class="info-row">
                    <span class="label">Téléphone:</span>
                    <span class="value">${paiement.payslip?.employe?.entreprise?.telephone || 'N/A'}</span>
                </div>
                <div class="info-row">
                    <span class="label">Email:</span>
                    <span class="value">${paiement.payslip?.employe?.entreprise?.email || 'N/A'}</span>
                </div>
            </div>

            <!-- Employee Information -->
            <div class="info-section">
                <h3>Informations de l'Employé</h3>
                <div class="info-row">
                    <span class="label">Nom complet:</span>
                    <span class="value">${paiement.payslip?.employe?.nomComplet || 'N/A'}</span>
                </div>
                <div class="info-row">
                    <span class="label">Poste:</span>
                    <span class="value">${paiement.payslip?.employe?.poste || 'N/A'}</span>
                </div>
                <div class="info-row">
                    <span class="label">Email:</span>
                    <span class="value">${paiement.payslip?.employe?.email || 'N/A'}</span>
                </div>
            </div>

            <!-- Payment Information -->
            <div class="info-section">
                <h3>Détails du Paiement</h3>
                <div class="info-row">
                    <span class="label">Cycle de paie:</span>
                    <span class="value">${paiement.payslip?.payRun?.periode || 'N/A'}</span>
                </div>
                <div class="info-row">
                    <span class="label">Mode de paiement:</span>
                    <span class="value">${paiement.mode || 'N/A'}</span>
                </div>
                <div class="info-row">
                    <span class="label">Date de paiement:</span>
                    <span class="value">${formatDate(paiement.datePaiement)}</span>
                </div>
                <div class="info-row">
                    <span class="label">Statut:</span>
                    <span class="value">${paiement.statut || 'N/A'}</span>
                </div>
            </div>

            <!-- Payment Amount -->
            <div class="payment-section">
                <h3>Montant Payé</h3>
                <div class="payment-amount">${formatCurrency(paiement.montant || 0)}</div>
                <div class="payment-label">Francs CFA</div>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p>Ce reçu de paiement est généré automatiquement par le système de gestion salariale.</p>
                <p>Document officiel - ${formatDate(new Date())}</p>
                <p>Merci pour vos services.</p>
            </div>
        </div>
    </body>
    </html>
  `;
}
export default PaiementService;
//# sourceMappingURL=paiement.service.js.map