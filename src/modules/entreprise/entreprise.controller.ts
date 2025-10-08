import EntrepriseService from './entreprise.service.js';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';

const prisma = new PrismaClient();

// Temporary storage for company requests (in production, use database)
const companyRequests: any[] = [];

const EntrepriseController = {
  requestCreation: async (req: Request, res: Response) => {
    try {
      console.log('Received request data:', req.body);
      console.log('File:', req.file);
      const data = req.body;
      const file = req.file;
      const request = {
        id: Date.now().toString(),
        ...data,
        logo: file ? file.filename : null,
        createdAt: new Date(),
        status: 'pending'
      };
      companyRequests.push(request);
      console.log('Nouvelle demande de création d\'entreprise:', request);
      // TODO: Send notification to superadmin (email, in-app, etc.)
      res.status(200).json({ success: true, message: 'Demande de création d\'entreprise envoyée avec succès' });
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).json({ error: "Erreur lors de l'envoi de la demande" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { adminUserData, ...companyData } = req.body;
      console.log('Creating entreprise with data:', companyData);
      console.log('Admin user data:', adminUserData);

      const result = await EntrepriseService.create(companyData);

      // Si des données d'admin sont fournies, créer l'utilisateur admin
      if (adminUserData && adminUserData.nomComplet && adminUserData.emailUtilisateur) {
        // Generate password
        const generatedPassword = Math.random().toString(36).slice(-8) + '123';
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);

        // Create the user
        const utilisateur = await prisma.utilisateur.create({
          data: {
            email: adminUserData.emailUtilisateur,
            motDePasse: hashedPassword,
            motDePasseTemporaire: generatedPassword,
            nomComplet: adminUserData.nomComplet,
            telephone: adminUserData.telephone || companyData.telephone,
            role: 'admin',
            statut: 'actif',
            entrepriseId: result.id,
          },
        });
        console.log('Utilisateur admin créé:', utilisateur.email);
        console.log(`Mot de passe temporaire: ${generatedPassword}`);
      }

      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      console.error('Erreur lors de la création de l\'entreprise:', error);
      if (error.code === 'P2002') {
        if (error.meta?.target?.includes('email')) {
          res.status(400).json({ error: "Une entreprise avec cet email existe déjà" });
        } else if (error.meta?.target?.includes('nom')) {
          res.status(400).json({ error: "Une entreprise avec ce nom existe déjà" });
        } else {
          res.status(400).json({ error: "Une entreprise avec ces informations existe déjà" });
        }
      } else {
        res.status(500).json({ error: "Impossible de créer l'entreprise" });
      }
    }
  },

  findById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Paramètre 'id' manquant" });
      }
      const result = await EntrepriseService.findById(id);
      res.status(200).json(result);
    } catch {
      res.status(500).json({ error: "Impossible de trouver l'entreprise" });
    }
  },

  findAll: async (_req: Request, res: Response) => {
    try {
      const result = await EntrepriseService.findAll();
      res.status(200).json(result);
    } catch {
      res.status(500).json({ error: "Impossible de récupérer les entreprises" });
    }
  },

  findAllPublic: async (_req: Request, res: Response) => {
    try {
      console.log('findAllPublic appelé');
      const result = await EntrepriseService.findAll();
      console.log('Entreprises trouvées:', result?.length || 0);
      // Retourner toutes les entreprises avec des données limitées
      const publicData = result.map((entreprise: any) => ({
        id: entreprise.id,
        nom: entreprise.nom
      }));
      console.log('Données publiques retournées:', publicData);
      res.status(200).json({ data: publicData });
    } catch (error) {
      console.error('Erreur findAllPublic:', error);
      res.status(500).json({ error: "Impossible de récupérer les entreprises" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Paramètre 'id' manquant" });
      }
      const data = req.body;
      const file = req.file;

      // Si un fichier logo est uploadé, ajouter le logoUrl
      if (file) {
        data.logoUrl = `/uploads/${file.filename}`;
      }

      const result = await EntrepriseService.update(id, data);
      res.status(200).json({ success: true, data: result });
    } catch {
      res.status(500).json({ error: "Impossible de mettre à jour l'entreprise" });
    }
  },

  getRequests: async (_req: Request, res: Response) => {
    try {
      res.status(200).json({ success: true, data: companyRequests });
    } catch {
      res.status(500).json({ error: "Impossible de récupérer les demandes" });
    }
  },

  approveRequest: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log('Approving request:', id);
      console.log('Available requests:', companyRequests.map(r => r.id));
      const index = companyRequests.findIndex(request => request.id === id);
      if (index === -1) {
        console.log('Request not found');
        return res.status(404).json({ error: "Demande non trouvée" });
      }
      const requestData = companyRequests[index];
      companyRequests.splice(index, 1); // Remove from pending
      console.log('Request approved and removed');

      // Check if company with this email already exists
      const existingEntreprise = await prisma.entreprise.findUnique({
        where: { email: requestData.email },
      });

      if (existingEntreprise) {
        return res.status(400).json({ error: "Une entreprise avec cet email existe déjà" });
      }

      // Create the company
      const entreprise = await prisma.entreprise.create({
        data: {
          nom: requestData.nomEntreprise,
          email: requestData.email,
          telephone: requestData.telephone,
          adresse: null, // Can be updated later
          logoUrl: requestData.logo ? `/uploads/${requestData.logo}` : null,
          couleurPrimaire: '#64748b', // Default
          couleurSecondaire: '#94a3b8', // Default
          devise: 'XOF',
          typePeriode: 'mensuelle',
        },
      });
      console.log('Entreprise créée:', entreprise.nom);

      // Check if user already exists
      const existingUser = await prisma.utilisateur.findUnique({
        where: { email: requestData.emailUtilisateur },
      });

      let utilisateur;
      let generatedPassword: string | undefined;
      if (existingUser) {
        console.log('Utilisateur existant utilisé:', existingUser.email);
        utilisateur = existingUser;
      } else {
        // Generate password
        generatedPassword = Math.random().toString(36).slice(-8) + '123';
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);

        // Create the user
        utilisateur = await prisma.utilisateur.create({
          data: {
            email: requestData.emailUtilisateur,
            motDePasse: hashedPassword,
            motDePasseTemporaire: generatedPassword,
            nomComplet: requestData.nomContact,
            telephone: requestData.telephone,
            role: 'admin',
            statut: 'actif',
            entrepriseId: entreprise.id,
          },
        });
        console.log('Utilisateur créé:', utilisateur.email);
      }

      // TODO: Send email with login info
      console.log(`📧 Email à envoyer à ${utilisateur.email}:`);
      console.log(`   Email: ${utilisateur.email}`);
      if (generatedPassword) {
        console.log(`   Mot de passe: ${generatedPassword}`);
        console.log(`   (L'utilisateur pourra changer le mot de passe après connexion)`);
      } else {
        console.log(`   (Utilisateur existant, mot de passe inchangé)`);
      }

      res.status(200).json({ success: true, message: 'Demande approuvée, entreprise et utilisateur créés' });
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).json({ error: "Erreur lors de l'approbation" });
    }
  },

  rejectRequest: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const index = companyRequests.findIndex(req => req.id === id);
      if (index === -1) {
        return res.status(404).json({ error: "Demande non trouvée" });
      }
      companyRequests.splice(index, 1); // Remove from pending
      res.status(200).json({ success: true, message: 'Demande rejetée' });
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).json({ error: "Erreur lors du rejet" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Paramètre 'id' manquant" });
      }
      await EntrepriseService.delete(id);
      res.status(204).send();
    } catch {
      res.status(500).json({ error: "Impossible de supprimer l'entreprise" });
    }
  }
};

export default EntrepriseController;