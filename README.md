# Squelette backend - Gestion Salaires (Express + TypeScript + Prisma)

## But
Ce dépôt contient un **squelette** de backend pour l'application "Gestion des salaires" :
- Express + TypeScript
- Prisma (MySQL)
- Architecture modulaire par entité (modules en français : entreprise, employe, paie, utilisateur)

> Ce squelette est destiné à démarrer rapidement le développement. Il contient les routes et modules de base, ainsi que le `schema.prisma`.

---
## Structure principale (français)

```
backend-squelette/
├─ prisma/
│  └─ schema.prisma
├─ src/
│  ├─ config/
│  │  ├─ env.ts
│  │  └─ db.ts
│  ├─ modules/
│  │  ├─ entreprise/
│  │  ├─ utilisateur/
│  │  ├─ employe/
│  │  └─ paie/
│  ├─ app.ts
│  └─ server.ts
├─ .env.example
├─ package.json
└─ tsconfig.json
```

---
## Principes d'architecture
- **Architecture par entités (modulaire)** : chaque entité métier a son dossier (entity, model, service, controller, routes).
- **Prisma** gère la couche accès DB.
- **Sécurité** et validations non incluses dans ce squelette : à ajouter (bcrypt, JWT, validation).

---
## Démarrage local (exemple)
1. Copier `.env.example` en `.env` et renseigner `DATABASE_URL` et `JWT_SECRET`.
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Générer le client Prisma et lancer la migration :
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Lancer en dev :
   ```bash
   npm run dev
   ```

---
