const bcrypt = require('bcrypt');
const EtudiantModel = require('../models/etudiant.model');
const CommercantModel = require('../models/commercant.model');
const { signToken } = require('../config/jwt');

const SALT_ROUNDS = 12;

const registerEtudiant = async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe } = req.body;

    const existing = await EtudiantModel.findByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }

    const hash = await bcrypt.hash(mot_de_passe, SALT_ROUNDS);
    const etudiant = await EtudiantModel.create({ nom, prenom, email, mot_de_passe: hash });

    const token = signToken({ id: etudiant.id, profil: 'etudiant' });

    return res.status(201).json({ token, etudiant });
  } catch (err) {
    console.error('registerEtudiant:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

const loginEtudiant = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    const etudiant = await EtudiantModel.findByEmail(email);
    if (!etudiant) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const match = await bcrypt.compare(mot_de_passe, etudiant.mot_de_passe);
    if (!match) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const token = signToken({ id: etudiant.id, profil: 'etudiant' });

    const { mot_de_passe: _, ...etudiantSafe } = etudiant;
    return res.status(200).json({ token, etudiant: etudiantSafe });
  } catch (err) {
    console.error('loginEtudiant:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

const registerCommercant = async (req, res) => {
  try {
    const { nom_commerce, email, mot_de_passe, description } = req.body;

    const existing = await CommercantModel.findByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }

    const hash = await bcrypt.hash(mot_de_passe, SALT_ROUNDS);
    const commercant = await CommercantModel.create({ nom_commerce, email, mot_de_passe: hash, description });

    const token = signToken({ id: commercant.id, profil: 'commercant' });

    return res.status(201).json({ token, commercant });
  } catch (err) {
    console.error('registerCommercant:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

const loginCommercant = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    const commercant = await CommercantModel.findByEmail(email);
    if (!commercant) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const match = await bcrypt.compare(mot_de_passe, commercant.mot_de_passe);
    if (!match) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const token = signToken({ id: commercant.id, profil: 'commercant' });

    const { mot_de_passe: _, ...commercantSafe } = commercant;
    return res.status(200).json({ token, commercant: commercantSafe });
  } catch (err) {
    console.error('loginCommercant:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = { registerEtudiant, loginEtudiant, registerCommercant, loginCommercant };
