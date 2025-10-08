export function requireRole(role) {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ error: "Accès interdit : rôle insuffisant" });
        }
        next();
    };
}
export function canAccessCompany() {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "Authentification requise" });
        }
        // Super-admin peut accéder à toutes les entreprises
        if (req.user.role === 'super-admin') {
            return next();
        }
        // Utilisateurs avec entrepriseId peuvent accéder à leur entreprise
        if (req.user.entrepriseId && req.params.id === req.user.entrepriseId) {
            return next();
        }
        return res.status(403).json({ error: "Accès interdit : vous ne pouvez accéder qu'aux données de votre entreprise" });
    };
}
export function canModifyCompany() {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "Authentification requise" });
        }
        // Super-admin peut modifier toutes les entreprises
        if (req.user.role === 'super-admin') {
            return next();
        }
        // Pour les admins, vérifier qu'ils ont une entreprise assignée
        if (req.user.role === 'admin' && req.user.entrepriseId) {
            // Pour les requêtes POST (création), vérifier que l'entreprise dans le body correspond
            if (req.method === 'POST') {
                const bodyEntrepriseId = req.body.entrepriseId;
                if (!bodyEntrepriseId || bodyEntrepriseId === req.user.entrepriseId) {
                    return next();
                }
            }
            // Pour les autres requêtes (PUT/PATCH/DELETE), vérifier le paramètre id
            else if (req.params.id === req.user.entrepriseId) {
                return next();
            }
        }
        return res.status(403).json({ error: "Accès interdit : vous ne pouvez modifier que votre entreprise" });
    };
}
//# sourceMappingURL=role.middleware.js.map