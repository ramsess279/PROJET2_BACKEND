import PayslipModel from "./payslip.model.js";
// @ts-ignore
import PDFDocument from 'pdfkit';

const PayslipService = {
  // Récupérer tous les bulletins
  findAll: async (params?: {
    employeId?: string;
    payrunId?: string;
    statut?: string;
    page?: number;
    limit?: number;
    entrepriseId?: string;
  }) => {
    return PayslipModel.findAll(params);
  },

  // Récupérer un bulletin par ID
  findById: async (id: string) => {
    return PayslipModel.findById(id);
  },

  // Créer un bulletin
  create: async (data: any) => {
    return PayslipModel.create(data);
  },

  // Mettre à jour un bulletin
  update: async (id: string, data: any) => {
    return PayslipModel.update(id, data);
  },

  // Supprimer un bulletin
  delete: async (id: string) => {
    return PayslipModel.delete(id);
  },

  // Récupérer les bulletins d'un employé
  findByEmploye: async (employeId: string) => {
    return PayslipModel.findByEmploye(employeId);
  },

  // Récupérer les bulletins d'un cycle de paie
  findByPayrun: async (payrunId: string) => {
    return PayslipModel.findByPayrun(payrunId);
  },

  // Générer un PDF de bulletin de paie
  generatePDF: async (payslipId: string) => {
    console.log('Génération PDF pour payslipId:', payslipId);
    try {
      // Récupérer les données du bulletin avec les relations
      const payslip = await PayslipModel.findByIdWithRelations(payslipId);
      console.log('Payslip trouvé:', payslip ? 'oui' : 'non');

      if (!payslip) {
        throw new Error('Bulletin de paie non trouvé');
      }

      const entreprise = payslip.employe?.entreprise;
      const employe = payslip.employe;
      const payRun = payslip.payRun;

      console.log('Données payslip:', {
        id: payslip.id,
        employe: employe?.nomComplet,
        entreprise: entreprise?.nom,
        salaireBrut: payslip.salaireBrut
      });

      // Créer le document PDF
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50
      });

      const buffers: Buffer[] = [];

      // Collecter les chunks du PDF
      // @ts-ignore
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => {});

      // Couleurs de l'entreprise (par défaut si non définies)
      const primaryColor = entreprise?.couleurPrimaire || '#667eea';
      const secondaryColor = entreprise?.couleurSecondaire || '#764ba2';

      // En-tête avec logo si disponible
      if (entreprise?.logoUrl) {
        try {
          // Ajouter le logo (supposant que logoUrl est un chemin relatif)
          const logoPath = `uploads/${entreprise.logoUrl}`;
          doc.image(logoPath, 50, 50, { width: 80 });
          doc.fontSize(20).text(entreprise.nom || 'BULLETIN DE PAIE', 150, 50);
        } catch (error) {
          console.log('Erreur chargement logo:', error);
          doc.fontSize(20).text(entreprise.nom || 'BULLETIN DE PAIE', { align: 'center' });
        }
      } else {
        doc.fontSize(20).text(entreprise?.nom || 'BULLETIN DE PAIE', { align: 'center' });
      }

      doc.moveDown();
      doc.fontSize(12).text(`Période ${payRun?.periode || 'N/A'}`, { align: 'center' });
      doc.moveDown(2);

      // Informations entreprise (format compact)
      doc.fontSize(12).fillColor(primaryColor).text('INFORMATIONS ENTREPRISE', { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(10).fillColor('black');
      doc.text(`${entreprise?.nom || 'N/A'}`);
      doc.text(`${entreprise?.adresse || 'N/A'}`);
      doc.text(`Tel ${entreprise?.telephone || 'N/A'} | Email ${entreprise?.email || 'N/A'}`);
      doc.moveDown();

      // Informations employé (format compact)
      doc.fontSize(12).fillColor(primaryColor).text('INFORMATIONS EMPLOYE', { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(10).fillColor('black');
      doc.text(`${employe?.nomComplet || 'N/A'}`);
      doc.text(`${employe?.poste || 'N/A'} | Contrat ${employe?.typeContrat || 'N/A'}`);
      doc.text(`Tel ${employe?.telephone || 'N/A'} | Email ${employe?.email || 'N/A'}`);
      doc.moveDown();

      // Détails salariaux (format amélioré)
      doc.fontSize(12).fillColor(primaryColor).text('DETAILS SALARIAUX', { underline: true });
      doc.moveDown(0.5);

      // Calcul du salaire horaire si applicable
      let salaireHoraire = '';
      if (employe?.typeContrat === 'honoraire' && payslip.nombreHeure && payslip.nombreHeure > 0) {
        const tauxHoraire = payslip.salaireBrut / payslip.nombreHeure;
        salaireHoraire = `${Math.round(tauxHoraire).toLocaleString()} XOF/heure`;
      } else if (employe?.typeContrat === 'journalier' && payslip.nombreJour && payslip.nombreJour > 0) {
        const tauxJournalier = payslip.salaireBrut / payslip.nombreJour;
        salaireHoraire = `${Math.round(tauxJournalier).toLocaleString()} XOF/jour`;
      }

      doc.fontSize(10).fillColor('black');
      if (salaireHoraire) {
        doc.text(`Salaire de base ${salaireHoraire}`);
      }
      doc.text(`Salaire brut ${payslip.salaireBrut?.toLocaleString()} XOF`);
      doc.text(`Déductions ${payslip.deductions?.toLocaleString()} XOF`);
      doc.text(`Salaire net ${payslip.salaireNet?.toLocaleString()} XOF`);

      if (payslip.nombreHeure && payslip.nombreHeure > 0) {
        doc.text(`Heures travaillées ${payslip.nombreHeure}`);
      }
      if (payslip.nombreJour && payslip.nombreJour > 0) {
        doc.text(`Jours travaillés ${payslip.nombreJour}`);
      }

      doc.moveDown(2);

      // Pied de page avec couleurs entreprise
      doc.fontSize(8).fillColor(secondaryColor);
      doc.text('Document officiel généré par le système de gestion salariale', { align: 'center' });
      doc.text(`${new Date().toLocaleDateString('fr-FR')}`, { align: 'center' });

      // Finaliser le PDF
      doc.end();

      // Attendre que tous les chunks soient collectés
      await new Promise<void>((resolve) => {
        doc.on('end', () => resolve());
      });

      // Combiner les buffers
      const pdfBuffer = Buffer.concat(buffers);
      console.log('PDF généré avec pdfkit, taille:', pdfBuffer.length);

      return pdfBuffer;
    } catch (error) {
      console.error('Erreur génération PDF:', error);
      throw new Error(`Impossible de générer le PDF du bulletin de paie: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }
};

// Fonction pour générer le HTML du bulletin de paie avec un design professionnel
function generatePayslipHTML(payslip: any): string {
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

  const entreprise = payslip.employe?.entreprise;
  const employe = payslip.employe;
  const payRun = payslip.payRun;

  // Couleurs de l'entreprise
  const primaryColor = entreprise?.couleurPrimaire || '#667eea';
  const secondaryColor = entreprise?.couleurSecondaire || '#764ba2';

  // Calcul du salaire horaire/journalier
  let salaireBaseText = '';
  if (employe?.typeContrat === 'honoraire' && payslip.nombreHeure && payslip.nombreHeure > 0) {
    const tauxHoraire = payslip.salaireBrut / payslip.nombreHeure;
    salaireBaseText = `${Math.round(tauxHoraire).toLocaleString()} XOF heure`;
  } else if (employe?.typeContrat === 'journalier' && payslip.nombreJour && payslip.nombreJour > 0) {
    const tauxJournalier = payslip.salaireBrut / payslip.nombreJour;
    salaireBaseText = `${Math.round(tauxJournalier).toLocaleString()} XOF jour`;
  }

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bulletin de Paie - ${employe?.nomComplet}</title>
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
                max-width: 800px;
                margin: 0 auto;
                background-color: white;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }

            .header {
                background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
                color: white;
                padding: 30px;
                text-align: center;
                position: relative;
            }

            .logo {
                position: absolute;
                left: 30px;
                top: 15px;
                width: 80px;
                height: auto;
            }

            .header h1 {
                font-size: 24px;
                margin-bottom: 5px;
                font-weight: 300;
            }

            .header .subtitle {
                font-size: 14px;
                opacity: 0.9;
            }

            .company-info, .employee-info, .salary-info {
                padding: 20px;
                border-bottom: 1px solid #e9ecef;
            }

            .company-info h2, .employee-info h3, .salary-info h3 {
                color: ${primaryColor};
                margin-bottom: 10px;
                font-size: 16px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .info-text {
                font-size: 12px;
                margin-bottom: 3px;
                color: #555;
            }

            .salary-details {
                background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
                color: white;
                padding: 25px;
                margin: 20px 0;
            }

            .salary-details h3 {
                margin-bottom: 15px;
                font-size: 16px;
                text-align: center;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .salary-line {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
                padding: 5px 0;
                font-size: 12px;
            }

            .salary-line:last-child {
                margin-bottom: 0;
                font-weight: bold;
                border-top: 1px solid rgba(255,255,255,0.3);
                padding-top: 10px;
            }

            .footer {
                background-color: #f8f9fa;
                padding: 20px;
                text-align: center;
                color: ${secondaryColor};
                font-size: 10px;
                border-top: 1px solid #e9ecef;
            }

            @media print {
                body {
                    background-color: white;
                }

                .container {
                    box-shadow: none;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div class="header">
                ${entreprise?.logoUrl ? `<img src="/uploads/${entreprise.logoUrl}" alt="Logo" class="logo">` : ''}
                <h1>${entreprise?.nom || 'BULLETIN DE PAIE'}</h1>
                <div class="subtitle">Période ${payRun?.periode || 'N/A'}</div>
            </div>

            <!-- Company Info -->
            <div class="company-info">
                <h2>Informations Entreprise</h2>
                <div class="info-text">${entreprise?.nom || 'N/A'}</div>
                <div class="info-text">${entreprise?.adresse || 'N/A'}</div>
                <div class="info-text">Tel ${entreprise?.telephone || 'N/A'} | Email ${entreprise?.email || 'N/A'}</div>
            </div>

            <!-- Employee Info -->
            <div class="employee-info">
                <h3>Informations Employé</h3>
                <div class="info-text">${employe?.nomComplet || 'N/A'}</div>
                <div class="info-text">${employe?.poste || 'N/A'} | Contrat ${employe?.typeContrat || 'N/A'}</div>
                <div class="info-text">Tel ${employe?.telephone || 'N/A'} | Email ${employe?.email || 'N/A'}</div>
            </div>

            <!-- Salary Details -->
            <div class="salary-details">
                <h3>Détails Salariaux</h3>
                ${salaireBaseText ? `<div class="salary-line"><span>Salaire de base</span><span>${salaireBaseText}</span></div>` : ''}
                <div class="salary-line"><span>Salaire brut</span><span>${payslip.salaireBrut?.toLocaleString()} XOF</span></div>
                <div class="salary-line"><span>Déductions</span><span>${payslip.deductions?.toLocaleString()} XOF</span></div>
                <div class="salary-line"><span>Salaire net</span><span>${payslip.salaireNet?.toLocaleString()} XOF</span></div>
                ${payslip.nombreHeure && payslip.nombreHeure > 0 ? `<div class="salary-line"><span>Heures travaillées</span><span>${payslip.nombreHeure}</span></div>` : ''}
                ${payslip.nombreJour && payslip.nombreJour > 0 ? `<div class="salary-line"><span>Jours travaillés</span><span>${payslip.nombreJour}</span></div>` : ''}
            </div>

            <!-- Footer -->
            <div class="footer">
                <p>Document officiel généré par le système de gestion salariale</p>
                <p>${formatDate(new Date())}</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

export { PayslipService };
export default PayslipService;