const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// POST
// Enregistrer un utilisateur
router.post('/signup', userCtrl.signup);

// POST
// Connecter un utilisateur
router.post('/login', userCtrl.login);

//POST
//Connexion avec l'api Blizzard
router.post('/loginWithBlizzard', userCtrl.loginWithBlizzard);

module.exports = router;