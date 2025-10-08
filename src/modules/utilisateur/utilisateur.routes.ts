import { Router } from 'express';
import UserController from './utilisateur.controller.js';
const router = Router();

router.get('/', UserController.findAll );
router.get('/:id' , UserController.findById);
router.get('/entreprise/:entrepriseId' , UserController.findByEntrepriseId);
router.get('/admin/:entrepriseId' , UserController.findAdminByEntrepriseId);
router.post('/' , UserController.create);
router.patch('/:id' , UserController.update);
router.patch('/:id/password' , UserController.changePassword);
router.delete('/:id' , UserController.delete);


export default router;
