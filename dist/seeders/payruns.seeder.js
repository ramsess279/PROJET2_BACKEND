import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function seedPayRuns(entreprises) {
    console.log('📅 Création des cycles de paie...');
    const payruns = await Promise.all([
        // Cycle approuvé (bulletins verrouillés)
        prisma.payRun.create({
            data: {
                periode: 'Septembre 2024',
                type: 'mensuelle',
                statut: 'approuvé',
                entrepriseId: entreprises[0].id,
                dateCreation: new Date('2024-09-01'),
            },
        }),
        // Cycle approuvé pour une autre entreprise
        prisma.payRun.create({
            data: {
                periode: 'Septembre 2024',
                type: 'mensuelle',
                statut: 'approuvé',
                entrepriseId: entreprises[1].id,
                dateCreation: new Date('2024-09-01'),
            },
        }),
        // Cycle en brouillon (bulletins modifiables)
        prisma.payRun.create({
            data: {
                periode: 'Octobre 2024',
                type: 'mensuelle',
                statut: 'brouillon',
                entrepriseId: entreprises[0].id,
                dateCreation: new Date('2024-10-01'),
            },
        }),
        // Cycle hebdomadaire
        prisma.payRun.create({
            data: {
                periode: 'Semaine 40 - 2024',
                type: 'hebdomadaire',
                statut: 'brouillon',
                entrepriseId: entreprises[2].id,
                dateCreation: new Date('2024-10-01'),
            },
        }),
        // Cycle journalier
        prisma.payRun.create({
            data: {
                periode: '15 Octobre 2024',
                type: 'journaliere',
                statut: 'brouillon',
                entrepriseId: entreprises[0].id,
                dateCreation: new Date('2024-10-15'),
            },
        }),
    ]);
    console.log(`✅ ${payruns.length} cycles de paie créés`);
    return payruns;
}
//# sourceMappingURL=payruns.seeder.js.map