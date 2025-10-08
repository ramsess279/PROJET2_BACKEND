import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export class PricingService {
    // Récupérer tous les plans de tarification
    static async findAll() {
        return await prisma.pricingPlan.findMany({
            include: {
                features: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
    }
    // Récupérer un plan par ID
    static async findById(id) {
        return await prisma.pricingPlan.findUnique({
            where: { id },
            include: {
                features: true
            }
        });
    }
    // Créer un nouveau plan
    static async create(data) {
        const { features, ...planData } = data;
        return await prisma.pricingPlan.create({
            data: {
                ...planData,
                features: {
                    create: features.map(feature => ({ feature }))
                }
            },
            include: {
                features: true
            }
        });
    }
    // Mettre à jour un plan
    static async update(id, data) {
        const { features, ...planData } = data;
        // Si des fonctionnalités sont fournies, les mettre à jour
        if (features !== undefined) {
            // Supprimer les anciennes fonctionnalités
            await prisma.pricingFeature.deleteMany({
                where: { pricingPlanId: id }
            });
            // Créer les nouvelles fonctionnalités
            await prisma.pricingFeature.createMany({
                data: features.map(feature => ({
                    pricingPlanId: id,
                    feature
                }))
            });
        }
        return await prisma.pricingPlan.update({
            where: { id },
            data: planData,
            include: {
                features: true
            }
        });
    }
    // Supprimer un plan
    static async delete(id) {
        // Les fonctionnalités seront supprimées automatiquement grâce à onDelete: Cascade
        return await prisma.pricingPlan.delete({
            where: { id }
        });
    }
    // Activer/Désactiver un plan
    static async toggleActive(id) {
        const plan = await prisma.pricingPlan.findUnique({
            where: { id }
        });
        if (!plan) {
            throw new Error('Plan non trouvé');
        }
        return await prisma.pricingPlan.update({
            where: { id },
            data: { active: !plan.active },
            include: {
                features: true
            }
        });
    }
    // Récupérer les plans actifs
    static async findActive() {
        return await prisma.pricingPlan.findMany({
            where: { active: true },
            include: {
                features: true
            },
            orderBy: {
                price: 'asc'
            }
        });
    }
    // Récupérer le plan populaire
    static async findPopular() {
        return await prisma.pricingPlan.findFirst({
            where: { popular: true, active: true },
            include: {
                features: true
            }
        });
    }
}
//# sourceMappingURL=pricing.service.js.map