import { Router } from 'express';
import EntrepriseController from './entreprise.controller.js';

const router = Router();

router.post('/', EntrepriseController.create);
router.get('/', EntrepriseController.findAll);
router.get('/:id', EntrepriseController.findById);
router.patch('/:id', EntrepriseController.update);
router.delete('/:id', EntrepriseController.delete);

export default router;