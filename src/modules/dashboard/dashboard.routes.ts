import { Router } from 'express';
import { DashboardController } from './dashboard.controller.js';
import AuthMiddleware from '../auth/auth.middelware.js';

const router = Router();

// Toutes les routes dashboard nécessitent une authentification
router.use(AuthMiddleware.TokenVerifed);

// Routes pour les données du dashboard
router.get('/', DashboardController.getDashboardData);
router.get('/stats', DashboardController.getStats);
router.get('/frequency-evolution', DashboardController.getFrequencyEvolution);
router.get('/upcoming-payments', DashboardController.getUpcomingPayments);

export default router;