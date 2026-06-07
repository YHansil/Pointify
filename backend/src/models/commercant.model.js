const pool = require('../config/db');

const CommercantModel = {
  async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM commercants WHERE email = $1',
      [email]
    );
    return rows[0] || null;
  },

  async findById(id) {
    const { rows } = await pool.query(
      'SELECT id, nom_commerce, email, description, created_at FROM commercants WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  },

  async create({ nom_commerce, email, mot_de_passe, description }) {
    const { rows } = await pool.query(
      `INSERT INTO commercants (nom_commerce, email, mot_de_passe, description)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nom_commerce, email, description, created_at`,
      [nom_commerce, email, mot_de_passe, description || null]
    );
    return rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM commercants WHERE id = $1', [id]);
  },

  async getTransactions(commercantId) {
    const { rows } = await pool.query(
      `SELECT t.id, t.montant, t.points_gagnes, t.created_at,
              e.nom AS etudiant_nom, e.prenom AS etudiant_prenom
       FROM transactions t
       JOIN etudiants e ON e.id = t.etudiant_id
       WHERE t.commercant_id = $1
       ORDER BY t.created_at DESC`,
      [commercantId]
    );
    return rows;
  },

  async getStats(commercantId) {
    const { rows: today } = await pool.query(
      `SELECT COUNT(*) AS scans_today, COALESCE(SUM(points_gagnes), 0) AS points_today
       FROM transactions
       WHERE commercant_id = $1
         AND created_at >= CURRENT_DATE`,
      [commercantId]
    );

    const { rows: week } = await pool.query(
      `SELECT COUNT(*) AS scans_week, COALESCE(SUM(points_gagnes), 0) AS points_week
       FROM transactions
       WHERE commercant_id = $1
         AND created_at >= DATE_TRUNC('week', NOW())`,
      [commercantId]
    );

    const { rows: total } = await pool.query(
      `SELECT COALESCE(SUM(points_gagnes), 0) AS total_points
       FROM transactions
       WHERE commercant_id = $1`,
      [commercantId]
    );

    return {
      scans_aujourd_hui: parseInt(today[0].scans_today),
      scans_cette_semaine: parseInt(week[0].scans_week),
      total_points_distribues: parseInt(total[0].total_points),
    };
  },
};

module.exports = CommercantModel;
