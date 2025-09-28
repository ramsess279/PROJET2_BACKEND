import PayslipService from "./payslip.service.js";
import type { Request, Response } from "express";

const PayslipController = {

  create: async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const result = await PayslipService.create(data);
      res.status(201).json({ success: true, data: result });
    } catch {
      res.status(500).json({ error: "Impossible de créer le bulletin de paie" });
    }
  },

  findById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("L'id est manquant");
      }
      const result = await PayslipService.findById(id);
      res.status(200).json(result);
    } catch {
      res.status(500).json({ error: "Impossible de trouver le bulletin de paie" });
    }
  },

  findAll: async (_req: Request, res: Response) => {
    try {
      const result = await PayslipService.findAll();
      res.status(200).json(result);
    } catch {
      res.status(500).json({ error: "Impossible de récupérer les bulletins de paie" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("L'id est manquant");
      }
      const data = req.body;
      const result = await PayslipService.update(id, data);
      res.status(200).json({ success: true, data: result });
    } catch {
      res.status(500).json({ error: "Impossible de mettre à jour le bulletin de paie" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("L'id est manquant");
      }
      await PayslipService.delete(id);
      res.status(204).send();
    } catch {
      res.status(500).json({ error: "Impossible de supprimer le bulletin de paie" });
    }
  }
};

export default PayslipController;