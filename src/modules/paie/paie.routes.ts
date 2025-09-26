import { Router } from 'express';
const router = Router();

router.get('/', (_req, res) => res.json({ success: true, message: 'Endpoints paie à implémenter' }));

export default router;
