import express from 'express';
import { MarketingService } from './marketing.service.js';
export class MarketingController {
    // Récupérer tout le contenu marketing structuré
    static async getAllContent(req, res) {
        try {
            const content = await MarketingService.getStructuredContent();
            res.json({
                success: true,
                data: content
            });
        }
        catch (error) {
            console.error('Erreur lors de la récupération du contenu marketing:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération du contenu marketing'
            });
        }
    }
    // Récupérer le contenu d'une section spécifique
    static async getContentBySection(req, res) {
        try {
            const { section } = req.params;
            if (!section) {
                return res.status(400).json({
                    success: false,
                    message: 'Section requise'
                });
            }
            const content = await MarketingService.getContentBySection(section);
            res.json({
                success: true,
                data: content
            });
        }
        catch (error) {
            console.error(`Erreur lors de la récupération du contenu ${req.params.section}:`, error);
            res.status(500).json({
                success: false,
                message: `Erreur lors de la récupération du contenu ${req.params.section}`
            });
        }
    }
    // Récupérer seulement les statistiques
    static async getStats(req, res) {
        try {
            const stats = await MarketingService.getStats();
            res.json({
                success: true,
                data: stats
            });
        }
        catch (error) {
            console.error('Erreur lors de la récupération des statistiques:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des statistiques'
            });
        }
    }
    // Récupérer seulement les avantages
    static async getBenefits(req, res) {
        try {
            const benefits = await MarketingService.getBenefits();
            res.json({
                success: true,
                data: benefits
            });
        }
        catch (error) {
            console.error('Erreur lors de la récupération des avantages:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des avantages'
            });
        }
    }
    // Récupérer seulement le contenu hero
    static async getHeroContent(req, res) {
        try {
            const heroContent = await MarketingService.getHeroContent();
            res.json({
                success: true,
                data: heroContent
            });
        }
        catch (error) {
            console.error('Erreur lors de la récupération du contenu hero:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération du contenu hero'
            });
        }
    }
    // Récupérer seulement le contenu CTA
    static async getCTAContent(req, res) {
        try {
            const ctaContent = await MarketingService.getCTAContent();
            res.json({
                success: true,
                data: ctaContent
            });
        }
        catch (error) {
            console.error('Erreur lors de la récupération du contenu CTA:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération du contenu CTA'
            });
        }
    }
}
//# sourceMappingURL=marketing.controller.js.map