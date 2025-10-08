import { Router } from 'express';
import { MarketingController } from './marketing.controller.js';

const router = Router();

// Routes publiques pour le contenu marketing (pas besoin d'authentification)
router.get('/', MarketingController.getAllContent);
router.get('/hero', MarketingController.getHeroContent);
router.get('/benefits', MarketingController.getBenefits);
router.get('/stats', MarketingController.getStats);
router.get('/cta', MarketingController.getCTAContent);
router.get('/:section', MarketingController.getContentBySection);

export default router;