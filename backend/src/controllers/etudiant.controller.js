const pool = require('../config/db');
const EtudiantModel = require('../models/etudiant.model');
const QrTokenModel = require('../models/qrtoken.model');
const TransactionModel = require('../models/transaction.model');

const getMe = async (req, res) => {
  try {
    const etudiant = await EtudiantModel.findById(req.user.id);
    if (!etudiant) return res.status(404).json({ error: 'Étudiant introuvable' });
    return res.status(200).json({ etudiant });
  } catch (err) {
    console.error('getMe (etudiant):', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await EtudiantModel.getTransactions(req.user.id);
    return res.status(200).json({ transactions });
  } catch (err) {
    console.error('getTransactions (etudiant):', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

const scanQr = async (req, res) => {
  const client = await pool.connect();
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Token QR manquant' });

    const qr = await QrTokenModel.findByToken(token);

    if (!qr) return res.status(404).json({ error: 'QR code invalide' });
    if (qr.used) return res.status(400).json({ error: 'QR code déjà utilisé' });

    // Comparaison côté DB pour éviter les décalages de fuseau horaire
    const { rows: expCheck } = await pool.query(
      'SELECT expire_at > NOW() AS valid FROM qr_tokens WHERE id = $1',
      [qr.id]
    );
    if (!expCheck[0].valid) {
      return res.status(400).json({ error: 'QR code expiré' });
    }

    await client.query('BEGIN');

    await client.query('UPDATE qr_tokens SET used = TRUE WHERE id = $1', [qr.id]);

    const { rows: updated } = await client.query(
      `UPDATE etudiants SET points_total = points_total + $1
       WHERE id = $2
       RETURNING points_total`,
      [qr.points_generes, req.user.id]
    );

    await client.query(
      `INSERT INTO transactions (etudiant_id, commercant_id, montant, points_gagnes)
       VALUES ($1, $2, $3, $4)`,
      [req.user.id, qr.commercant_id, qr.montant, qr.points_generes]
    );

    await client.query('COMMIT');

    return res.status(200).json({
      message: 'Points crédités avec succès',
      points_gagnes: qr.points_generes,
      points_total: updated[0].points_total,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('scanQr:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  } finally {
    client.release();
  }
};

const getRecompenses = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT r.id, r.nom, r.description, r.points_requis, c.nom_commerce
       FROM recompenses r
       JOIN commercants c ON c.id = r.commercant_id
       WHERE r.actif = TRUE
       ORDER BY r.points_requis ASC`
    );
    return res.status(200).json({ recompenses: rows });
  } catch (err) {
    console.error('getRecompenses (etudiant):', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

const reclamerRecompense = async (req, res) => {
  const client = await pool.connect();
  try {
    const recompenseId = parseInt(req.params.id);

    const { rows: recompRows } = await client.query(
      'SELECT * FROM recompenses WHERE id = $1',
      [recompenseId]
    );
    const recompense = recompRows[0];

    if (!recompense) return res.status(404).json({ error: 'Récompense introuvable' });
    if (!recompense.actif) return res.status(400).json({ error: 'Récompense non disponible' });

    const etudiant = await EtudiantModel.findById(req.user.id);
    if (!etudiant) return res.status(404).json({ error: 'Étudiant introuvable' });

    if (etudiant.points_total < recompense.points_requis) {
      return res.status(400).json({
        error: 'Points insuffisants',
        points_disponibles: etudiant.points_total,
        points_requis: recompense.points_requis,
      });
    }

    await client.query('BEGIN');

    await client.query(
      'UPDATE etudiants SET points_total = points_total - $1 WHERE id = $2',
      [recompense.points_requis, req.user.id]
    );

    const { rows: claimed } = await client.query(
      `INSERT INTO recompenses_reclamees (etudiant_id, recompense_id)
       VALUES ($1, $2)
       RETURNING *`,
      [req.user.id, recompenseId]
    );

    await client.query('COMMIT');

    const { rows: updatedEtudiant } = await pool.query(
      'SELECT points_total FROM etudiants WHERE id = $1',
      [req.user.id]
    );

    return res.status(201).json({
      message: 'Récompense réclamée avec succès',
      recompense: recompense.nom,
      points_deduits: recompense.points_requis,
      points_restants: updatedEtudiant[0].points_total,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('reclamerRecompense:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  } finally {
    client.release();
  }
};

const deleteMe = async (req, res) => {
  try {
    await EtudiantModel.delete(req.user.id);
    return res.status(200).json({ message: 'Compte supprimé avec succès' });
  } catch (err) {
    console.error('deleteMe (etudiant):', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = { getMe, getTransactions, scanQr, getRecompenses, reclamerRecompense, deleteMe };
