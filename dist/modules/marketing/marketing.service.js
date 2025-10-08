import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export class MarketingService {
    // Récupérer le contenu d'une section spécifique
    static async getContentBySection(section) {
        const content = await prisma.marketingContent.findMany({
            where: {
                section: section,
                active: true
            },
            orderBy: { order: 'asc' }
        });
        return content;
    }
    // Récupérer tout le contenu marketing
    static async getAllContent() {
        const content = await prisma.marketingContent.findMany({
            where: { active: true },
            orderBy: [
                { section: 'asc' },
                { order: 'asc' }
            ]
        });
        return content;
    }
    // Récupérer le contenu structuré par section
    static async getStructuredContent() {
        const allContent = await this.getAllContent();
        const structured = {
            hero: allContent.filter(item => item.section === 'hero'),
            benefits: allContent.filter(item => item.section === 'benefits'),
            stats: allContent.filter(item => item.section === 'stats'),
            cta: allContent.filter(item => item.section === 'cta')
        };
        return structured;
    }
    // Récupérer seulement les statistiques
    static async getStats() {
        return this.getContentBySection('stats');
    }
    // Récupérer seulement les avantages
    static async getBenefits() {
        return this.getContentBySection('benefits');
    }
    // Récupérer seulement le contenu hero
    static async getHeroContent() {
        return this.getContentBySection('hero');
    }
    // Récupérer seulement le contenu CTA
    static async getCTAContent() {
        return this.getContentBySection('cta');
    }
}
//# sourceMappingURL=marketing.service.js.map