import express from 'express';
import { PricingService } from './pricing.service.js';
export class PricingController {
    // Récupérer tous les plans
    static async findAll(req, res) {
        try {
            const plans = await PricingService.findAll();
            res.json({
                success: true,
                data: plans
            });
        }
        catch (error) {
            console.error('Erreur lors de la récupération des plans:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des plans'
            });
        }
    }
    // Récupérer un plan par ID
    static async findById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID du plan requis'
                });
            }
            const plan = await PricingService.findById(id);
            if (!plan) {
                return res.status(404).json({
                    success: false,
                    message: 'Plan non trouvé'
                });
            }
            res.json({
                success: true,
                data: plan
            });
        }
        catch (error) {
            console.error('Erreur lors de la récupération du plan:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération du plan'
            });
        }
    }
    // Créer un nouveau plan
    static async create(req, res) {
        try {
            const planData = req.body;
            const plan = await PricingService.create(planData);
            res.status(201).json({
                success: true,
                data: plan,
                message: 'Plan créé avec succès'
            });
        }
        catch (error) {
            console.error('Erreur lors de la création du plan:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la création du plan'
            });
        }
    }
    // Mettre à jour un plan
    static async update(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID du plan requis'
                });
            }
            const updateData = req.body;
            const plan = await PricingService.update(id, updateData);
            res.json({
                success: true,
                data: plan,
                message: 'Plan mis à jour avec succès'
            });
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour du plan:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la mise à jour du plan'
            });
        }
    }
    // Supprimer un plan
    static async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID du plan requis'
                });
            }
            await PricingService.delete(id);
            res.json({
                success: true,
                message: 'Plan supprimé avec succès'
            });
        }
        catch (error) {
            console.error('Erreur lors de la suppression du plan:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la suppression du plan'
            });
        }
    }
    // Activer/Désactiver un plan
    static async toggleActive(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID du plan requis'
                });
            }
            const plan = await PricingService.toggleActive(id);
            res.json({
                success: true,
                data: plan,
                message: `Plan ${plan.active ? 'activé' : 'désactivé'} avec succès`
            });
        }
        catch (error) {
            console.error('Erreur lors du changement de statut du plan:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors du changement de statut du plan'
            });
        }
    }
    // Récupérer les plans actifs
    static async findActive(req, res) {
        try {
            const plans = await PricingService.findActive();
            res.json({
                success: true,
                data: plans
            });
        }
        catch (error) {
            console.error('Erreur lors de la récupération des plans actifs:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des plans actifs'
            });
        }
    }
    // Récupérer le plan populaire
    static async findPopular(req, res) {
        try {
            const plan = await PricingService.findPopular();
            res.json({
                success: true,
                data: plan
            });
        }
        catch (error) {
            console.error('Erreur lors de la récupération du plan populaire:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération du plan populaire'
            });
        }
    }
}
//# sourceMappingURL=pricing.controller.js.map