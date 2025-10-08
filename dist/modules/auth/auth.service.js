import jwt from "jsonwebtoken";
import UserModel from "../utilisateur/utilisateur.model.js";
import bcrypt from "bcrypt";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const AuthService = {
    register: async (data) => {
        const hashedPassword = await bcrypt.hash(data.motDePasse, 10);
        const user = await UserModel.create({
            ...data,
            motDePasse: hashedPassword,
        });
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role, entrepriseId: user.entrepriseId }, JWT_SECRET);
        return { user, token };
    },
    login: async (email, motDePasse) => {
        console.log('Tentative de connexion pour:', email);
        const users = await UserModel.findAll();
        console.log('Nombre total d\'utilisateurs trouvés:', users.length);
        const user = users.find((u) => u.email === email);
        if (!user) {
            console.log('Aucun utilisateur trouvé avec l\'email:', email);
            throw new Error("Aucun utilisateur avec cet email");
        }
        console.log('Utilisateur trouvé:', { id: user.id, email: user.email, role: user.role });
        // Vérifier d'abord le mot de passe haché
        let valid = await bcrypt.compare(motDePasse, user.motDePasse);
        console.log('Mot de passe haché valide:', valid);
        // Si le mot de passe haché n'est pas valide, vérifier le mot de passe temporaire
        if (!valid && user.motDePasseTemporaire) {
            valid = motDePasse === user.motDePasseTemporaire;
            console.log('Mot de passe temporaire valide:', valid);
        }
        if (!valid) {
            console.log('Mot de passe incorrect pour l\'utilisateur:', email);
            throw new Error("Mot de passe incorrect !");
        }
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role, entrepriseId: user.entrepriseId }, JWT_SECRET);
        return { user, token };
    },
};
export default AuthService;
//# sourceMappingURL=auth.service.js.map