const pool = require('../config/db');
const CommercantModel = require('../models/commercant.model');
const QrTokenModel = require('../models/qrtoken.model');

const getMe = async (req, res) => {
  try {
    const commercant = await CommercantModel.findById(req.user.id);
    if (!commercant) return res.status(404).json({ error: 'Commerçant introuvable' });
    return res.status(200).json({ commercant });
  } catch (err) {
    console.error('getMe (commercant):', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

const genererQr = async (req, res) => {
  try {
    const { montant } = req.body;

    if (!montant || isNaN(montant) || parseFloat(montant) <= 0) {
      return res.status(400).json({ error: 'Montant invalide' });
    }

    const montantNum = parseFloat(montant);
    const points_generes = Math.floor(montantNum * 10);

    const qr = await QrTokenModel.create({
      commercant_id: req.user.id,
      montant: montantNum,
      points_generes,
    });

    return res.status(201).json({
      token: qr.token,
      montant: montantNum,
      points_generes,
      expire_dans: qr.expire_dans,
      expire_at: qr.expire_at,
    });
  } catch (err) {
    console.error('genererQr:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await CommercantModel.getTransactions(req.user.id);
    return res.status(200).json({ transactions });
  } catch (err) {
    console.error('getTransactions (commercant):', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

const getStats = async (req, res) => {
  try {
    const stats = await CommercantModel.getStats(req.user.id);
    return res.status(200).json({ stats });
  } catch (err) {
    console.error('getStats:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

const getRecompenses = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM recompenses WHERE commercant_id = $1 ORDER BY points_requis ASC`,
      [req.user.id]
    );
    return res.status(200).json({ recompenses: rows });
  } catch (err) {
    console.error('getRecompenses (commercant):', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

const createRecompense = async (req, res) => {
  try {
    const { nom, description, points_requis } = req.body;

    if (!nom || !points_requis || isNaN(points_requis) || parseInt(points_requis) <= 0) {
      return res.status(400).json({ error: 'Champs nom et points_requis (entier positif) obligatoires' });
    }

    const { rows } = await pool.query(
      `INSERT INTO recompenses (commercant_id, nom, description, points_requis)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [req.user.id, nom, description || null, parseInt(points_requis)]
    );

    return res.status(201).json({ recompense: rows[0] });
  } catch (err) {
    console.error('createRecompense:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

const updateRecompense = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nom, description, points_requis, actif } = req.body;

    const { rows: existing } = await pool.query(
      'SELECT * FROM recompenses WHERE id = $1 AND commercant_id = $2',
      [id, req.user.id]
    );

    if (!existing[0]) {
      return res.status(404).json({ error: 'Récompense introuvable ou non autorisée' });
    }

    const updated = {
      nom: nom ?? existing[0].nom,
      description: description ?? existing[0].description,
      points_requis: points_requis ?? existing[0].points_requis,
      actif: actif ?? existing[0].actif,
    };

    const { rows } = await pool.query(
      `UPDATE recompenses
       SET nom = $1, description = $2, points_requis = $3, actif = $4
       WHERE id = $5 AND commercant_id = $6
       RETURNING *`,
      [updated.nom, updated.description, updated.points_requis, updated.actif, id, req.user.id]
    );

    return res.status(200).json({ recompense: rows[0] });
  } catch (err) {
    console.error('updateRecompense:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

const deleteRecompense = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { rows } = await pool.query(
      'SELECT id FROM recompenses WHERE id = $1 AND commercant_id = $2',
      [id, req.user.id]
    );

    if (!rows[0]) {
      return res.status(404).json({ error: 'Récompense introuvable ou non autorisée' });
    }

    await pool.query('DELETE FROM recompenses WHERE id = $1', [id]);

    return res.status(200).json({ message: 'Récompense supprimée' });
  } catch (err) {
    console.error('deleteRecompense:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

const deleteMe = async (req, res) => {
  try {
    await CommercantModel.delete(req.user.id);
    return res.status(200).json({ message: 'Compte supprimé avec succès' });
  } catch (err) {
    console.error('deleteMe (commercant):', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = {
  getMe,
  genererQr,
  getTransactions,
  getStats,
  getRecompenses,
  createRecompense,
  updateRecompense,
  deleteRecompense,
  deleteMe,
};
