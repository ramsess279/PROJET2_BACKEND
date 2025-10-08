import EmployeService from "./employe.service.js";
import type { Request, Response } from "express";

const EmployeController = {
  // Route publique pour le pointage (sans authentification)
  findAllPublic: async (req: Request, res: Response) => {
    try {
      const { status = 'actif', entrepriseId } = req.query;
      console.log('🔍 findAllPublic appelé avec entrepriseId:', entrepriseId);

      const params: any = {
        page: 1,
        limit: 1000, // Retourner tous les employés pour la sélection
        status: status as string,
      };

      // Filtrer par entreprise si spécifié
      if (entrepriseId) {
        console.log('🏢 Filtrage par entrepriseId:', entrepriseId);
        // Note: On ne peut pas filtrer directement par entrepriseId dans EmployeService.findAll
        // car c'est une route publique. On filtre côté contrôleur.
        const allEmployees = await EmployeService.findAll(params);
        console.log('👥 Tous les employés trouvés:', allEmployees.length);

        const filteredEmployees = allEmployees.filter(emp => emp.entrepriseId === entrepriseId);
        console.log('🎯 Employés filtrés pour entreprise:', filteredEmployees.length);

        // Retourner seulement les champs nécessaires pour la sélection
        const publicEmployees = filteredEmployees.map(emp => ({
          id: emp.id,
          nomComplet: emp.nomComplet,
          poste: emp.poste,
          telephone: emp.telephone,
          entrepriseId: emp.entrepriseId
        }));

        console.log('📤 Employés publics retournés:', publicEmployees.length, publicEmployees.map(e => e.nomComplet));
        res.status(200).json({ data: publicEmployees });
      } else {
        console.log('⚠️ Pas d\'entrepriseId spécifié, retour de tous les employés');
        // Retourner tous les employés actifs si pas d'entreprise spécifiée
        const result = await EmployeService.findAll(params);

        // Retourner seulement les champs nécessaires pour la sélection
        const publicEmployees = result.map(emp => ({
          id: emp.id,
          nomComplet: emp.nomComplet,
          poste: emp.poste,
          telephone: emp.telephone,
          entrepriseId: emp.entrepriseId
        }));

        res.status(200).json({ data: publicEmployees });
      }
    } catch (error) {
      console.error('❌ Erreur récupération employés publics:', error);
      res.status(500).json({ error: "Impossible de récupérer les employés" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const data = req.body;
      // Convertir salaireBase en nombre
      if (data.salaireBase) {
        data.salaireBase = parseFloat(data.salaireBase);
      }
      console.log('Création employé avec données:', data);
      const result = await EmployeService.create(data);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      console.error('Erreur création employé:', error);
      res.status(500).json({ error: "Impossible de créer cet employé: " + (error instanceof Error ? error.message : 'Erreur inconnue') });
    }
  },

  findById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) throw new Error("Veuillez fournir l'id de l'employé");
      const result = await EmployeService.findById(id);
      res.status(200).json(result);
    } catch {
      res.status(500).json({ error: "Impossible de trouver cet employé" });
    }
  },

  findAll: async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10, search, status, typeContrat } = req.query;

      // Filtrer par entreprise si entrepriseId est défini (pour admin ou super-admin en mode entreprise)
      let entrepriseId: string | undefined;
      if (req.user?.entrepriseId) {
        entrepriseId = req.user.entrepriseId;
      }

      const result = await EmployeService.findAll({
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        search: search as string,
        status: status as string,
        typeContrat: typeContrat as string,
        ...(entrepriseId && { entrepriseId }),
      });
      const total = await EmployeService.count({
        search: search as string,
        status: status as string,
        typeContrat: typeContrat as string,
        ...(entrepriseId && { entrepriseId }),
      });
      res.status(200).json({ data: result, total });
    } catch {
      res.status(500).json({ error: "Impossible de récupérer les employés" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = req.body;
      console.log('Mise à jour employé id:', id, 'données:', data);
      if (!id) throw new Error("Veuillez fournir l'id de l'employé à mettre à jour");
      const result = await EmployeService.update(id, data);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error('Erreur mise à jour employé:', error);
      res.status(500).json({ error: "Impossible de mettre à jour cet employé" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) throw new Error("Veuillez fournir l'id de l'employé à supprimer");
      await EmployeService.delete(id);
      res.status(204).send();
    } catch {
      res.status(500).json({ error: "Impossible de supprimer cet employé" });
    }
  }
};

export default EmployeController;