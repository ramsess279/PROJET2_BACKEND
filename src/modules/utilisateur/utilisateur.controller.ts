import UserService from "./utilisateur.service.js";
import type { Request, Response } from "express";

const UserController = {
    create: async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const result = await UserService.create(data);
            console.log(result);
            
            console.log(result)
            res.status(201).json({ success: true, data: result });
        } catch {
            res.status(500).json({ error: "Impossible de creer cette utilisateur " });
        }
    },

    findById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("Veuillez rajouter l'id de l'utilisateur concerné ");
            }
            const result = await UserService.findById(id);
            res.status(200).json(result);
        } catch {
            res.status(500).json({ error: "Impossible de trouver cette utilisateur " });
        }
    },

    findAll: async (_req: Request, res: Response) => {
        try {
            const result = await UserService.findAll();
            console.log(result)
            res.status(200).json(result);
        } catch {
            res.status(500).json({ error: "Impossible de récupérer les utilisateurs" });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = req.body;
            if (!id) {
                throw new Error("Veuillez fournir l'id de l'utilisateur à mettre à jour");
            }
            const result = await UserService.update(id, data);
            res.status(200).json({ success: true, data: result });
        } catch {
            res.status(500).json({ error: "Impossible de mettre à jour cet utilisateur" });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("Veuillez fournir l'id de l'utilisateur à supprimer");
            }
            await UserService.delete(id);
            res.status(204).send();
        } catch {
            res.status(500).json({ error: "Impossible de supprimer cet utilisateur" });
        }
    }
};

export default UserController;