import { Router } from 'express';
import multer from 'multer';
import EntrepriseController from './entreprise.controller.js';
import AuthMiddleware from '../auth/auth.middelware.js';
import { requireRole, canModifyCompany, canAccessCompany } from '../auth/role.middleware.js';
const upload = multer({ dest: 'uploads/' });
const router = Router();
// Route publique pour le pointage (sans authentification)
router.get('/public', EntrepriseController.findAllPublic);
router.post('/request', upload.single('logo'), EntrepriseController.requestCreation);
router.get('/requests', AuthMiddleware.TokenVerifed, requireRole("super-admin"), EntrepriseController.getRequests);
router.patch('/requests/:id/approve', AuthMiddleware.TokenVerifed, requireRole("super-admin"), EntrepriseController.approveRequest);
router.patch('/requests/:id/reject', AuthMiddleware.TokenVerifed, requireRole("super-admin"), EntrepriseController.rejectRequest);
router.post('/', AuthMiddleware.TokenVerifed, requireRole("super-admin"), EntrepriseController.create);
router.get('/', AuthMiddleware.TokenVerifed, EntrepriseController.findAll);
router.get('/:id', AuthMiddleware.TokenVerifed, canAccessCompany(), EntrepriseController.findById);
router.patch('/:id', AuthMiddleware.TokenVerifed, canModifyCompany(), upload.single('logo'), EntrepriseController.update);
router.delete('/:id', AuthMiddleware.TokenVerifed, EntrepriseController.delete);
export default router;
//# sourceMappingURL=entreprise.routes.js.map