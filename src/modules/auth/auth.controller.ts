import type { Request, Response } from "express";
import AuthService from "./auth.service.js";
import jwt from "jsonwebtoken";
import prisma from "../../config/db.js";

const AuthController = {
  register: async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const { user, token } = await AuthService.register(data);
      res.status(201).json({ success: true, user, token });
    } catch (err) {
      res.status(500).json({ error: "Impossible de créer cet utilisateur, vérifiez les attributs passés dans le body." });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, motDePasse } = req.body;
      const result = await AuthService.login(email, motDePasse);
      res.status(200).json({ success: true, ...result });
    } catch (err: any) {
      let errorMessage = "Les informations saisies sont incorrectes ! Veuillez recommencer.";
      if (err.message === "Aucun utilisateur avec cet email") {
        errorMessage = "Aucun utilisateur trouvé avec cet email.";
      } else if (err.message === "Mot de passe incorrect !") {
        errorMessage = "Mot de passe incorrect.";
      }
      res.status(401).json({ error: errorMessage });
    }
  },

  logout: async (_req: Request, res: Response) => {
    // Aucun état serveur à nettoyer pour JWT; endpoint fourni pour compatibilité
    res.status(200).json({ success: true });
  },

  refresh: async (_req: Request, res: Response) => {
    // A implémenter si nécessaire: émettre un nouveau token via refresh token
    res.status(501).json({ error: "Non implémenté" });
  },

  switchCompany: async (req: Request, res: Response) => {
    try {
      // Vérifier que l'utilisateur est super-admin
      if (!req.user || req.user.role !== 'super-admin') {
        return res.status(403).json({ error: "Accès interdit : seuls les super-admins peuvent changer d'entreprise" });
      }

      const { entrepriseId } = req.body;
      // entrepriseId peut être null pour revenir au mode super-admin

      let entreprise = null;
      if (entrepriseId) {
        // Vérifier que l'entreprise existe
        entreprise = await prisma.entreprise.findUnique({
          where: { id: entrepriseId }
        });

        if (!entreprise) {
          return res.status(404).json({ error: "Entreprise non trouvée" });
        }
      }

      // Créer un nouveau token
      let tokenPayload: any = {
        id: req.user.id,
        email: req.user.email,
        entrepriseId: entrepriseId
      };

      if (entrepriseId) {
        // Se connecter à une entreprise : garder le rôle super-admin mais définir entrepriseId
        tokenPayload.role = req.user.role; // Garde le rôle super-admin
        tokenPayload.entrepriseId = entrepriseId;
      } else {
        // Revenir au mode super-admin complet
        tokenPayload.role = req.user.role;
        tokenPayload.entrepriseId = null;
      }

      const newToken = jwt.sign(tokenPayload, process.env.JWT_SECRET || "dev-secret");

      res.status(200).json({
        success: true,
        token: newToken,
        entreprise: entreprise || null
      });
    } catch (error) {
      console.error('Erreur lors du changement d\'entreprise:', error);
      res.status(500).json({ error: "Erreur lors du changement d'entreprise" });
    }
  },

  updateProfile: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Authentification requise" });
      }

      const { nomComplet, email, telephone } = req.body;

      // Mettre à jour l'utilisateur
      const updatedUser = await prisma.utilisateur.update({
        where: { id: req.user.id },
        data: {
          nomComplet: nomComplet || undefined,
          email: email || undefined,
          telephone: telephone || undefined,
        },
      });

      res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      res.status(500).json({ error: "Erreur lors de la mise à jour du profil" });
    }
  },
};

export default AuthController;
