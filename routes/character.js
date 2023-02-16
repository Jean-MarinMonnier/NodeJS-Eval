const express = require('express');
const router = express.Router();
const characterCtrl = require('../controllers/character');
const auth = require('../middlewares/auth');

// GET
// Liste tous les objets
router.get('/', auth, characterCtrl.getAllCharacters);

// GET
// Récupère et retourne un objet
router.get('/:pseudo/:class', auth, characterCtrl.getOneCharacter);

// POST
// Ajoute l'objet en base de donnée
router.post('/', auth, characterCtrl.createCharacter);

// PUT
// Récupère et modifie un objet
router.put('/:pseudo/:class', auth, characterCtrl.updateCharacter);

// DELETE
// Supprime un objet de la base de donnée
router.delete('/:id', auth, characterCtrl.deleteCharacter);

module.exports = router;