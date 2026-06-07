const express = require('express');
const router = express.Router();
const { validateBody } = require('../middlewares/validate.middleware');
const {
  registerEtudiant,
  loginEtudiant,
  registerCommercant,
  loginCommercant,
} = require('../controllers/auth.controller');

router.post('/etudiant/register', validateBody(['nom', 'prenom', 'email', 'mot_de_passe']), registerEtudiant);
router.post('/etudiant/login', validateBody(['email', 'mot_de_passe']), loginEtudiant);
router.post('/commercant/register', validateBody(['nom_commerce', 'email', 'mot_de_passe']), registerCommercant);
router.post('/commercant/login', validateBody(['email', 'mot_de_passe']), loginCommercant);

module.exports = router;
