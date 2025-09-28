import { Router } from 'express';
import EntrepriseController from './entreprise.controller.js';
import AuthMiddleware from '../auth/auth.middelware.js';
import { requireRole } from '../auth/role.middleware.js';

const router = Router();

router.post('/', AuthMiddleware.TokenVerifed, requireRole("super-admin"), EntrepriseController.create);
router.get('/', AuthMiddleware.TokenVerifed, EntrepriseController.findAll);
router.get('/:id', AuthMiddleware.TokenVerifed, EntrepriseController.findById);
router.patch('/:id', AuthMiddleware.TokenVerifed, EntrepriseController.update);
router.delete('/:id', AuthMiddleware.TokenVerifed, EntrepriseController.delete);

export default router;