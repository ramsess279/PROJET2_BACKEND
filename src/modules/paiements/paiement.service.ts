import type { Paiement } from "./paiement.entity.js";
import PaiementModel from "./paiement.model.js";
import PayslipModel from "../payslip/payslip.model.js";
import prisma from "../../config/db.js";
// @ts-ignore
import PDFDocument from 'pdfkit';

const PaiementService = {
  create: async (data: Paiement) => {
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
  findById: async (id: string) => PaiementModel.findById(id),
  findAll: async (params?: { entrepriseId?: string }) => PaiementModel.findAll(params),
  update: async (id: string, data: Partial<Paiement>) => PaiementModel.update(id, data),
  delete: async (id: string) => PaiementModel.delete(id),

  // Générer un PDF de reçu de paiement professionnel
  generateReceipt: async (paiementId: string) => {
    console.log('Début génération PDF reçu professionnel pour id:', paiementId);
    try {
      // Récupérer les données du paiement avec les relations
      const paiement = await PaiementModel.findByIdWithRelations(paiementId);
      console.log('Paiement récupéré:', !!paiement);

      if (!paiement) {
        throw new Error('Paiement non trouvé');
      }

      const entreprise = paiement.payslip?.employe?.entreprise;
      const employe = paiement.payslip?.employe;
      const payRun = paiement.payslip?.payRun;

      // Récupérer les heures travaillées depuis les présences si nécessaire
      let heuresTravaillees = null;
      if (employe && payRun?.dateDebut && payRun?.dateFin) {
        try {
          console.log('Recherche présences pour employé:', employe.id, 'du', payRun.dateDebut, 'au', payRun.dateFin);

          const presences = await prisma.presence.findMany({
            where: {
              employeId: employe.id,
              date: {
                gte: payRun.dateDebut,
                lte: payRun.dateFin,
              },
            },
          });

          console.log('Présences trouvées:', presences.length);
          if (presences.length > 0) {
            heuresTravaillees = presences.reduce((total, p) => {
              console.log('Présence:', p.date, 'heures:', p.heuresTravaillees);
              return total + (p.heuresTravaillees || 0);
            }, 0);
            console.log('Total heures travaillées:', heuresTravaillees);
          }
        } catch (error) {
          console.log('Erreur récupération présences:', error);
        }
      }

      // Créer le document PDF moderne et épuré
      const doc = new PDFDocument({
        size: 'A4',
        margin: 40,
        bufferPages: true
      });

      const buffers: Buffer[] = [];

      // Collecter les chunks du PDF
      // @ts-ignore
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => {});

      // Couleurs de l'application (inspirées de Tailwind)
      const primaryColor = entreprise?.couleurPrimaire || '#3b82f6';    // Bleu primary
      const secondaryColor = entreprise?.couleurSecondaire || '#64748b'; // Gris secondary
      const accentColor = primaryColor;    // Utiliser la couleur primaire au lieu du vert
      const backgroundColor = '#f8fafc'; // Gris très clair
      const textColor = '#1f2937';      // Gris foncé

      // === EN-TÊTE MODERNE ===
      // Fond subtil
      doc.rect(0, 0, doc.page.width, 100).fill(primaryColor);

      // Logo à gauche si disponible
      if (entreprise?.logoUrl) {
        try {
          // Nettoyer le chemin du logo - enlever le slash au début et gérer les préfixes
          let logoPath = entreprise.logoUrl;
          if (logoPath.startsWith('/')) {
            logoPath = logoPath.substring(1); // Enlever le slash au début
          }
          if (!logoPath.startsWith('uploads/')) {
            logoPath = `uploads/${logoPath}`;
          }

          doc.image(logoPath, 40, 30, { width: 50, height: 50 });
          doc.fillColor('white').fontSize(16).font('Helvetica-Bold').text(entreprise.nom || 'REÇU DE PAIEMENT', 110, 45);
        } catch (error) {
          console.log('Erreur chargement logo:', error, 'LogoUrl:', entreprise.logoUrl);
          doc.fillColor('white').fontSize(16).font('Helvetica-Bold').text(entreprise?.nom || 'REÇU DE PAIEMENT', { align: 'center' });
        }
      } else {
        doc.fillColor('white').fontSize(16).font('Helvetica-Bold').text(entreprise?.nom || 'REÇU DE PAIEMENT', { align: 'center' });
      }

      // Numéro de reçu en haut à droite
      doc.fontSize(10).font('Helvetica');
      doc.text(`N° ${paiement.id.slice(-8).toUpperCase()}`, 0, 30, { align: 'right', width: doc.page.width - 40 });

      doc.moveDown(4);

      // === SECTION PRINCIPALE ÉPURÉE ===
      doc.moveDown(2);

      // Titre centré
      doc.fillColor(textColor).fontSize(14).font('Helvetica-Bold');
      doc.text('REÇU DE PAIEMENT', { align: 'center' });
      doc.moveDown(1);

      // Ligne de séparation
      doc.moveTo(40, doc.y).lineTo(doc.page.width - 40, doc.y).stroke(primaryColor);
      doc.moveDown(1.5);

      // Grille d'informations en format tableau
      doc.fontSize(10).font('Helvetica');

      // Fonction helper pour créer une ligne d'information
      const createInfoLine = (label1: string, value1: string, label2: string, value2: string) => {
        const y = doc.y;
        doc.text(label1 + ':', 60, y);
        doc.font('Helvetica-Bold').text(value1, 160, y);

        doc.font('Helvetica').text(label2 + ':', 320, y);
        doc.font('Helvetica-Bold').text(value2, 400, y);

        doc.moveDown(0.7);
      };

      // Ligne 1
      createInfoLine(
        'Employé', employe?.nomComplet || 'N/A',
        'Période', paiement.payslip?.payRun?.periode || 'N/A'
      );

      // Ligne 2
      createInfoLine(
        'Poste', employe?.poste || 'N/A',
        'Mode paiement', paiement.mode || 'N/A'
      );

      // Ligne 3
      createInfoLine(
        'Type contrat', employe?.typeContrat || 'N/A',
        'Date paiement', new Date(paiement.datePaiement).toLocaleDateString('fr-FR')
      );

      // Ligne 4
      const heuresText = heuresTravaillees !== null ?
        `${heuresTravaillees.toFixed(1)} heures` :
        paiement.payslip?.nombreHeure ?
        `${Number(paiement.payslip.nombreHeure).toFixed(1)} heures` :
        paiement.payslip?.nombreJour ?
        `${paiement.payslip.nombreJour} jours` : 'N/A';

      createInfoLine(
        'Salaire base', employe?.salaireBase ? employe.salaireBase.toLocaleString() + ' XOF' : 'N/A',
        'Heures travaillées', heuresText
      );

      doc.moveDown(2);

      // === MONTANT EN ÉVIDENCE ===
      const amountY = doc.y;

      // Montant sans background coloré
      doc.fillColor(textColor).fontSize(14).font('Helvetica-Bold');
      doc.text('MONTANT PAYÉ', 0, amountY + 25, { align: 'center' });

      // Montant principal - formatage amélioré
      doc.fontSize(24).font('Helvetica-Bold');
      const montantFormatted = paiement.montant?.toLocaleString('fr-FR') || '0';
      doc.text(`${montantFormatted} XOF`, 0, amountY + 50, { align: 'center' });

      doc.moveDown(4);

      // === PIED DE PAGE MINIMALISTE ===
      const footerY = doc.page.height - 60;

      // Ligne de séparation
      doc.moveTo(40, footerY - 10).lineTo(doc.page.width - 40, footerY - 10).stroke(primaryColor);

      // Informations légales
      doc.fillColor(secondaryColor).fontSize(8).font('Helvetica');
      doc.text('Document officiel généré par le système de gestion salariale', 0, footerY, { align: 'center' });
      doc.text(`${new Date().toLocaleDateString('fr-FR')}`, 0, footerY + 12, { align: 'center' });

      // Finaliser le PDF
      doc.end();

      // Attendre que tous les chunks soient collectés
      await new Promise<void>((resolve) => {
        doc.on('end', () => resolve());
      });

      // Combiner les buffers
      const pdfBuffer = Buffer.concat(buffers);
      console.log('Reçu PDF moderne généré avec pdfkit, taille:', pdfBuffer.length);

      return pdfBuffer;
    } catch (error) {
      console.error('Erreur génération PDF reçu:', error);
      throw new Error(`Impossible de générer le PDF du reçu: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }
};

// Fonction pour générer le HTML du reçu de paiement
async function generateReceiptHTML(paiement: any): Promise<string> {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const entreprise = paiement.payslip?.employe?.entreprise;
  const employe = paiement.payslip?.employe;
  const payRun = paiement.payslip?.payRun;

  // Récupérer les heures travaillées depuis les présences si nécessaire
  let heuresTravaillees = null;
  if (employe && payRun?.dateDebut && payRun?.dateFin) {
    try {
      console.log('HTML - Recherche présences pour employé:', employe.id, 'du', payRun.dateDebut, 'au', payRun.dateFin);

      const presences = await prisma.presence.findMany({
        where: {
          employeId: employe.id,
          date: {
            gte: payRun.dateDebut,
            lte: payRun.dateFin,
          },
        },
      });

      console.log('HTML - Présences trouvées:', presences.length);
      if (presences.length > 0) {
        heuresTravaillees = presences.reduce((total, p) => {
          console.log('HTML - Présence:', p.date, 'heures:', p.heuresTravaillees);
          return total + (p.heuresTravaillees || 0);
        }, 0);
        console.log('HTML - Total heures travaillées:', heuresTravaillees);
      }
    } catch (error) {
      console.log('Erreur récupération présences HTML:', error);
    }
  }

  // Couleurs de l'entreprise (par défaut celles de l'app)
  const primaryColor = entreprise?.couleurPrimaire || '#3b82f6';
  const secondaryColor = entreprise?.couleurSecondaire || '#64748b';
  const accentColor = primaryColor; // Utiliser la couleur primaire au lieu du vert

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reçu de Paiement - ${employe?.nomComplet}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Inter', 'Segoe UI', sans-serif;
                line-height: 1.6;
                color: #1f2937;
                background-color: #f8fafc;
                -webkit-font-smoothing: antialiased;
            }

            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: white;
                border-radius: 12px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }

            .header {
                background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
                color: white;
                padding: 24px;
                position: relative;
            }

            .logo {
                position: absolute;
                left: 24px;
                top: 24px;
                width: 48px;
                height: 48px;
                border-radius: 8px;
                object-fit: contain;
            }

            .header h1 {
                font-size: 18px;
                font-weight: 600;
                text-align: center;
                margin-bottom: 4px;
            }

            .header .number {
                font-size: 12px;
                opacity: 0.9;
                text-align: center;
                font-weight: 500;
            }

            .content {
                padding: 32px 24px;
            }

            .title {
                font-size: 16px;
                font-weight: 600;
                color: ${primaryColor};
                text-align: center;
                margin-bottom: 24px;
                border-bottom: 2px solid ${primaryColor};
                padding-bottom: 8px;
            }

            .info-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 32px;
                font-size: 12px;
            }

            .info-table td {
                padding: 8px 12px;
                border-bottom: 1px solid #e5e7eb;
            }

            .info-label {
                font-weight: 500;
                color: #6b7280;
                width: 120px;
            }

            .info-value {
                font-weight: 600;
                color: #1f2937;
            }

            .info-table tr:nth-child(even) {
                background-color: #f9fafb;
            }

            .amount-section {
                border-radius: 12px;
                padding: 32px 24px;
                text-align: center;
                margin: 24px 0;
                color: ${primaryColor};
                border: 2px solid ${primaryColor};
                background-color: #f8fafc;
            }

            .amount-label {
                font-size: 14px;
                font-weight: 500;
                margin-bottom: 8px;
                opacity: 0.9;
            }

            .amount-value {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 4px;
            }

            .amount-currency {
                font-size: 12px;
                opacity: 0.8;
                font-weight: 500;
            }

            .footer {
                background-color: #f9fafb;
                padding: 20px 24px;
                text-align: center;
                border-top: 1px solid #e5e7eb;
            }

            .footer-text {
                font-size: 11px;
                color: #6b7280;
                margin-bottom: 4px;
            }

            .footer-date {
                font-size: 10px;
                color: #9ca3af;
                font-weight: 500;
            }

            @media print {
                body {
                    background-color: white;
                }

                .container {
                    box-shadow: none;
                    margin: 0;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div class="header">
                ${entreprise?.logoUrl ? `<img src="/uploads/${entreprise.logoUrl}" alt="Logo" class="logo">` : ''}
                <h1>${entreprise?.nom || 'REÇU DE PAIEMENT'}</h1>
                <div class="number">N° ${paiement.id.slice(-8).toUpperCase()}</div>
            </div>

            <!-- Content -->
            <div class="content">
                <h2 class="title">REÇU DE PAIEMENT</h2>

                <table class="info-table">
                    <tr>
                        <td class="info-label">Employé:</td>
                        <td class="info-value">${employe?.nomComplet || 'N/A'}</td>
                        <td class="info-label">Période:</td>
                        <td class="info-value">${paiement.payslip?.payRun?.periode || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td class="info-label">Poste:</td>
                        <td class="info-value">${employe?.poste || 'N/A'}</td>
                        <td class="info-label">Mode paiement:</td>
                        <td class="info-value">${paiement.mode || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td class="info-label">Type contrat:</td>
                        <td class="info-value">${employe?.typeContrat || 'N/A'}</td>
                        <td class="info-label">Date paiement:</td>
                        <td class="info-value">${formatDate(paiement.datePaiement)}</td>
                    </tr>
                    <tr>
                        <td class="info-label">Salaire base:</td>
                        <td class="info-value">${employe?.salaireBase ? employe.salaireBase.toLocaleString() + ' XOF' : 'N/A'}</td>
                        <td class="info-label">Heures travaillées:</td>
                        <td class="info-value">${
                          heuresTravaillees !== null ?
                            `${heuresTravaillees.toFixed(1)} heures` :
                            paiement.payslip?.nombreHeure ?
                            `${Number(paiement.payslip.nombreHeure).toFixed(1)} heures` :
                            paiement.payslip?.nombreJour ?
                            `${paiement.payslip.nombreJour} jours` : 'N/A'
                        }</td>
                    </tr>
                </table>

                <!-- Amount Section -->
                <div class="amount-section">
                    <div class="amount-label">MONTANT PAYÉ</div>
                    <div class="amount-value">${paiement.montant?.toLocaleString()} XOF</div>
                    <div class="amount-currency">Francs CFA</div>
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                <div class="footer-text">Document officiel généré par le système de gestion salariale</div>
                <div class="footer-date">${formatDate(new Date())}</div>
            </div>
        </div>
    </body>
    </html>
  `;
}

export default PaiementService;