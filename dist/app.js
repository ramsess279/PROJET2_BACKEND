import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import entrepriseRoutes from './modules/entreprise/entreprise.routes.js';
import utilisateurRoutes from './modules/utilisateur/utilisateur.routes.js';
import employeRoutes from './modules/employe/employe.routes.js';
import paieRoutes from './modules/paiements/paie.routes.js';
import payrunRoutes from './modules/payrun/payrun.routes.js';
import payslipRoutes from './modules/payslip/payslip.routes.js';
import pricingRoutes from './modules/pricing/pricing.routes.js';
import dashboardRoutes from './modules/dashboard/dashboard.routes.js';
import marketingRoutes from './modules/marketing/marketing.routes.js';
import dotenv from 'dotenv';
import AuthRouter from './modules/auth/auth.routes.js';
import { fileTypeFromFile } from 'file-type';
import path from 'path';
import fs from 'fs';
const app = express();
app.use(cors());
app.use(bodyParser.json());
// Middleware de logging pour toutes les requêtes
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
// Middleware pour servir les fichiers uploads avec le bon content-type
app.use('/uploads', async (req, res, next) => {
    const filePath = path.join('uploads', req.path);
    if (fs.existsSync(filePath)) {
        try {
            const fileType = await fileTypeFromFile(filePath);
            if (fileType) {
                res.setHeader('Content-Type', fileType.mime);
            }
        }
        catch (error) {
            console.error('Erreur lors de la détection du type de fichier:', error);
        }
    }
    next();
});
app.use('/uploads', express.static('uploads'));
app.use('/api/entreprises', entrepriseRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/employes', employeRoutes);
app.use('/api/paies', paieRoutes);
app.use('/api/payruns', payrunRoutes);
app.use('/api/payslips', payslipRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/marketing', marketingRoutes);
app.use('/api/auth', AuthRouter);
export default app;
//# sourceMappingURL=app.js.map