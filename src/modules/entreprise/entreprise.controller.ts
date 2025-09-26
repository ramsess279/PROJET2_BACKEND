import EntrepriseService from './entreprise.service.js';
import type { Request, Response } from 'express';

const EntrepriseController = {
  create: async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const result = await EntrepriseService.create(data);
      res.status(201).json({ success: true, data: result });
    } catch {
      res.status(500).json({ error: "Impossible de créer l'entreprise" });
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

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Paramètre 'id' manquant" });
      }
      const data = req.body;
      const result = await EntrepriseService.update(id, data);
      res.status(200).json({ success: true, data: result });
    } catch {
      res.status(500).json({ error: "Impossible de mettre à jour l'entreprise" });
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