import AuthService from "./auth.service.js";
const AuthController = {
    register: async (req, res) => {
        try {
            const data = req.body;
            const { user, token } = await AuthService.register(data);
            res.status(201).json({ success: true, user, token });
        }
        catch {
            res.status(500).json({ error: "Impossible de créer cet utilisateur, vérifiez les attributs passés dans le body." });
        }
    },
    login: async (req, res) => {
        try {
            const { email, motDePasse } = req.body;
            const result = await AuthService.login(email, motDePasse);
            res.status(200).json({ success: true, ...result });
        }
        catch {
            res.status(401).json({ error: "Les informations saisies sont incorrectes ! Veuillez recommencer." });
        }
    }
};
export default AuthController;
//# sourceMappingURL=%20auth.controller.js.map