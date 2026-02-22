const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { success, error } = require('./functions');
const config = require('./config.json');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Données simulées (base de données temporaire)
let members = [
    { id: 1, name: "Ahmed Ahmed", email: "ahmed@example.com" },
    { id: 2, name: "Amal Amal", email: "amal@example.com" },
    { id: 3, name: "Reda Reda", email: "reda@example.com" }
];

// Route d'accueil
app.get('/', (req, res) => {
    res.json({
        message: "API Members - Gestion des membres",
        endpoints: {
            getAll: "GET /api/v1/members",
            getById: "GET /api/v1/members/:id",
            create: "POST /api/v1/members",
            update: "PUT /api/v1/members/:id",
            delete: "DELETE /api/v1/members/:id"
        }
    });
});

// ============================================
// ROUTES API - GESTION DES MEMBRES
// ============================================

// GET ALL - Récupérer tous les membres
app.get('/api/v1/members', (req, res) => {
    res.json(success(members));
});

// GET BY ID - Récupérer un membre par son ID
app.get('/api/v1/members/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const member = members.find(m => m.id === id);
    
    if (!member) {
        return res.status(404).json(error(`Membre avec l'ID ${id} non trouvé`, 404));
    }
    
    res.json(success(member));
});

// POST - Créer un nouveau membre
app.post('/api/v1/members', (req, res) => {
    const { id, name, email } = req.body;
    
    // Validation
    if (!id || !name || !email) {
        return res.status(400).json(error("ID, nom et email sont requis"));
    }
    
    // Vérifier si l'ID existe déjà
    const existingMember = members.find(m => m.id === parseInt(id));
    if (existingMember) {
        return res.status(400).json(error(`Un membre avec l'ID ${id} existe déjà`));
    }
    
    const newMember = {
        id: parseInt(id),
        name,
        email
    };
    
    members.push(newMember);
    res.status(201).json(success(newMember));
});

// PUT - Modifier un membre
app.put('/api/v1/members/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    
    const memberIndex = members.findIndex(m => m.id === id);
    
    if (memberIndex === -1) {
        return res.status(404).json(error(`Membre avec l'ID ${id} non trouvé`, 404));
    }
    
    // Mise à jour
    members[memberIndex] = {
        ...members[memberIndex],
        name: name || members[memberIndex].name,
        email: email || members[memberIndex].email
    };
    
    res.json(success(members[memberIndex]));
});

// DELETE - Supprimer un membre
app.delete('/api/v1/members/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const memberIndex = members.findIndex(m => m.id === id);
    
    if (memberIndex === -1) {
        return res.status(404).json(error(`Membre avec l'ID ${id} non trouvé`, 404));
    }
    
    const deletedMember = members.splice(memberIndex, 1)[0];
    res.json(success({ deleted: deletedMember, message: "Membre supprimé avec succès" }));
});

// Gestion des routes non trouvées
app.use((req, res) => {
    res.status(404).json(error("Route non trouvée", 404));
});

module.exports = app;

if (require.main === module) {
    const PORT = config.port || 8081;
    app.listen(PORT, () => {
        console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
    });
}