# 🚀 Guide de Déploiement GitHub + Vercel

## PARTIE 1 : DÉPLOYER L'API BACKEND

### Étape 1 : Créer un repo GitHub pour l'API

1. Va sur https://github.com
2. Clique sur **New repository**
3. Nom : `api-members-backend`
4. Clique **Create repository**

### Étape 2 : Pousser le code API sur GitHub

Ouvre un terminal dans `api-members/` et exécute :

```bash
git init
git add .
git commit -m "API Express ready for Vercel"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/api-members-backend.git
git push -u origin main
```

⚠️ Remplace `TON_USERNAME` par ton nom d'utilisateur GitHub

### Étape 3 : Déployer l'API sur Vercel

1. Va sur https://vercel.com
2. Connecte-toi avec GitHub
3. Clique **Add New** → **Project**
4. Sélectionne le repo `api-members-backend`
5. Clique **Deploy**
6. ✅ Attends la fin du déploiement

### Étape 4 : Copier l'URL de l'API

Après le déploiement, tu verras une URL comme :
```
https://api-members-backend.vercel.app
```

**📋 COPIE CETTE URL** - tu en auras besoin pour le frontend !

### Étape 5 : Tester l'API

Utilise Postman ou curl :

```bash
# Test Get All Members
GET https://api-members-backend.vercel.app/api/v1/members

# Test Create Member
POST https://api-members-backend.vercel.app/api/v1/members
Body: { "name": "John Doe", "email": "john@example.com" }
```

---

## PARTIE 2 : DÉPLOYER LE FRONTEND REACT

### Étape 6 : Mettre à jour l'URL de l'API

Dans `react-members/.env`, remplace par ton URL Vercel :

```
VITE_API_URL=https://api-members-backend.vercel.app
```

### Étape 7 : Créer un repo GitHub pour le frontend

1. Va sur https://github.com
2. Clique **New repository**
3. Nom : `api-members-frontend`
4. Clique **Create repository**

### Étape 8 : Pousser le code React sur GitHub

Ouvre un terminal dans `api-members/react-members/` et exécute :

```bash
git init
git add .
git commit -m "React frontend ready"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/api-members-frontend.git
git push -u origin main
```

### Étape 9 : Déployer le frontend sur Vercel

1. Va sur https://vercel.com
2. Clique **Add New** → **Project**
3. Sélectionne le repo `api-members-frontend`
4. **IMPORTANT** : Ajoute la variable d'environnement :
   - Clique **Environment Variables**
   - Name : `VITE_API_URL`
   - Value : `https://api-members-backend.vercel.app` (ton URL API)
5. Clique **Deploy**
6. ✅ Attends la fin du déploiement

### Étape 10 : Tester l'application

Tu auras une URL comme :
```
https://api-members-frontend.vercel.app
```

Ouvre cette URL dans ton navigateur et teste la gestion des membres !

---

## 📋 RÉSUMÉ DES COMMANDES

### Pour l'API (dans api-members/)
```bash
git init
git add .
git commit -m "API Express ready for Vercel"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/api-members-backend.git
git push -u origin main
```

### Pour le Frontend (dans api-members/react-members/)
```bash
git init
git add .
git commit -m "React frontend ready"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/api-members-frontend.git
git push -u origin main
```

---

## ⚠️ PROBLÈMES COURANTS

### Erreur CORS
Si tu as une erreur CORS, vérifie que `api/index.js` contient :
```javascript
res.header("Access-Control-Allow-Origin", "*");
```

### API ne répond pas
- Vérifie l'URL dans `.env`
- Vérifie que la variable d'environnement est bien configurée sur Vercel

### Frontend ne se connecte pas à l'API
- Va sur Vercel Dashboard → Ton projet frontend → Settings → Environment Variables
- Ajoute `VITE_API_URL` avec l'URL de ton API
- Redéploie le projet

---

## 🎯 CHECKLIST FINALE

- [ ] API déployée sur Vercel
- [ ] URL API copiée
- [ ] API testée avec Postman
- [ ] `.env` mis à jour avec l'URL API
- [ ] Frontend déployé sur Vercel
- [ ] Variable d'environnement ajoutée sur Vercel
- [ ] Application testée en production

---

## 🔗 LIENS UTILES

- GitHub : https://github.com
- Vercel : https://vercel.com
- Postman : https://www.postman.com