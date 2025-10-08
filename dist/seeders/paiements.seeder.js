import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function seedPaiements(payslips) {
    console.log('💳 Création des paiements...');
    const paiements = await Promise.all([
        // Paiements complets pour bulletins payés
        prisma.paiement.create({
            data: {
                payslipId: payslips[0].id, // Khadija Sarr - Septembre
                montant: 637500,
                mode: 'virement',
                statut: 'complet', // Dans le schéma c'est 'partiel' par défaut, mais on peut le changer
                datePaiement: new Date('2024-09-30'),
                recuUrl: '/reçus/PAY-SON-240930-001.pdf',
            },
        }),
        prisma.paiement.create({
            data: {
                payslipId: payslips[1].id, // Mamadou Diouf - Septembre
                montant: 840000,
                mode: 'virement',
                statut: 'complet',
                datePaiement: new Date('2024-09-30'),
                recuUrl: '/reçus/PAY-SON-240930-002.pdf',
            },
        }),
        prisma.paiement.create({
            data: {
                payslipId: payslips[2].id, // Aminata Thiam - Septembre
                montant: 562500,
                mode: 'Orange Money',
                statut: 'complet',
                datePaiement: new Date('2024-09-30'),
                recuUrl: '/reçus/PAY-SON-240930-003.pdf',
            },
        }),
        prisma.paiement.create({
            data: {
                payslipId: payslips[3].id, // Fatou Diallo - Septembre
                montant: 405000,
                mode: 'espèces',
                statut: 'complet',
                datePaiement: new Date('2024-09-30'),
                recuUrl: '/reçus/PAY-SON-240930-004.pdf',
            },
        }),
        // Paiement complet pour Mariama Mbaye
        prisma.paiement.create({
            data: {
                payslipId: payslips[5].id,
                montant: 712500,
                mode: 'virement',
                statut: 'complet',
                datePaiement: new Date('2024-09-30'),
                recuUrl: '/reçus/PAY-ATL-240930-001.pdf',
            },
        }),
        // Paiements partiels
        prisma.paiement.create({
            data: {
                payslipId: payslips[4].id, // Ibrahima Gueye - partiel
                montant: 180000, // 50% du salaire net
                mode: 'Wave',
                statut: 'partiel',
                datePaiement: new Date('2024-09-30'),
                recuUrl: '/reçus/PAY-ATL-240930-002-part1.pdf',
            },
        }),
        prisma.paiement.create({
            data: {
                payslipId: payslips[4].id, // Second paiement partiel
                montant: 180000, // Reste
                mode: 'espèces',
                statut: 'partiel',
                datePaiement: new Date('2024-10-15'),
                recuUrl: '/reçus/PAY-ATL-241015-002-part2.pdf',
            },
        }),
        // Paiement récent pour bulletin en attente
        prisma.paiement.create({
            data: {
                payslipId: payslips[6].id, // Khadija Sarr - Octobre (brouillon)
                montant: 425000, // 50% d'avance
                mode: 'Orange Money',
                statut: 'partiel',
                datePaiement: new Date('2024-10-01'),
                recuUrl: '/reçus/ADV-SON-241001-001.pdf',
            },
        }),
    ]);
    console.log(`✅ ${paiements.length} paiements créés`);
    return paiements;
}
//# sourceMappingURL=paiements.seeder.js.map