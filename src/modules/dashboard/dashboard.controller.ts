import express from 'express';
import { DashboardService } from './dashboard.service.js';

type Request = express.Request;
type Response = express.Response;

export class DashboardController {
  // Récupérer toutes les données du dashboard
  static async getDashboardData(req: Request, res: Response) {
    try {
      const user = req.user; // Récupérer l'utilisateur depuis le middleware d'auth
      const data = await DashboardService.getDashboardData(user);
      res.json({
        success: true,
        data: data
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des données dashboard:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des données du dashboard'
      });
    }
  }

  // Récupérer seulement les statistiques
  static async getStats(req: Request, res: Response) {
    try {
      const stats = await DashboardService.getStats();
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des statistiques'
      });
    }
  }

  // Récupérer l'évolution des fréquences
  static async getFrequencyEvolution(req: Request, res: Response) {
    try {
      const data = await DashboardService.getFrequencyEvolution();
      res.json({
        success: true,
        data: data
      });
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'évolution des fréquences:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération de l\'évolution des fréquences'
      });
    }
  }

  // Récupérer les paiements à venir
  static async getUpcomingPayments(req: Request, res: Response) {
    try {
      const payments = await DashboardService.getUpcomingPayments();
      res.json({
        success: true,
        data: payments
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des paiements à venir:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des paiements à venir'
      });
    }
  }
}