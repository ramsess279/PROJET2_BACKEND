import { Router } from 'express';
import { PricingController } from './pricing.controller.js';
import AuthMiddleware from '../auth/auth.middelware.js';
import { requireRole } from '../auth/role.middleware.js';

const router = Router();

// Routes publiques (pour l'affichage des plans)
router.get('/active', PricingController.findActive);
router.get('/popular', PricingController.findPopular);

// Routes protégées (nécessitent une authentification)
router.use(AuthMiddleware.TokenVerifed);

// Routes pour les super-admin et admin
router.get('/', (req, res, next) => {
  if (req.user?.role === 'super-admin' || req.user?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: "Accès interdit : rôle insuffisant" });
}, PricingController.findAll);

router.get('/:id', (req, res, next) => {
  if (req.user?.role === 'super-admin' || req.user?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: "Accès interdit : rôle insuffisant" });
}, PricingController.findById);
router.post('/', requireRole("super-admin"), PricingController.create);
router.patch('/:id', requireRole("super-admin"), PricingController.update);
router.delete('/:id', requireRole("super-admin"), PricingController.delete);
router.patch('/:id/toggle', requireRole("super-admin"), PricingController.toggleActive);

export default router;