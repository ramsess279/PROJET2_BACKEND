import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import entrepriseRoutes from './modules/entreprise/entreprise.routes.js';
import utilisateurRoutes from './modules/utilisateur/utilisateur.routes.js';
import employeRoutes from './modules/employe/employe.routes.js';
import paieRoutes from './modules/paie/paie.routes.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/entreprises', entrepriseRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/employes', employeRoutes);
app.use('/api/paies', paieRoutes);
export default app;
//# sourceMappingURL=app.js.map