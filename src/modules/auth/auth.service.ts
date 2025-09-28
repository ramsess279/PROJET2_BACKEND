import jwt from "jsonwebtoken";
import UserModel from "../utilisateur/utilisateur.model.js";
import type { Utilisateur } from "@prisma/client";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

const AuthService = {
  register: async (data: Utilisateur) => {

    const hashedPassword = await bcrypt.hash(data.motDePasse, 10);
    const user = await UserModel.create({
      ...data,
      motDePasse: hashedPassword,
    });
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET
    );
    return { user, token };
  },

  login: async (email: string, motDePasse: string) => {
    const users = await UserModel.findAll();
    const user = users.find((u) => u.email === email);
    if (!user) {
      throw new Error("Aucun utilisateur avec cet email");
    }

    const valid = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!valid) {
      throw new Error("Mot de passe incorrect !");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET
    );

    return { user, token };
  },
};

export default AuthService;
