const pool = require('../config/db');

const EtudiantModel = {
  async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM etudiants WHERE email = $1',
      [email]
    );
    return rows[0] || null;
  },

  async findById(id) {
    const { rows } = await pool.query(
      'SELECT id, nom, prenom, email, points_total, created_at FROM etudiants WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  },

  async create({ nom, prenom, email, mot_de_passe }) {
    const { rows } = await pool.query(
      `INSERT INTO etudiants (nom, prenom, email, mot_de_passe)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nom, prenom, email, points_total, created_at`,
      [nom, prenom, email, mot_de_passe]
    );
    return rows[0];
  },

  async addPoints(id, points) {
    const { rows } = await pool.query(
      `UPDATE etudiants SET points_total = points_total + $1
       WHERE id = $2
       RETURNING points_total`,
      [points, id]
    );
    return rows[0];
  },

  async deductPoints(id, points) {
    const { rows } = await pool.query(
      `UPDATE etudiants SET points_total = points_total - $1
       WHERE id = $2
       RETURNING points_total`,
      [points, id]
    );
    return rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM etudiants WHERE id = $1', [id]);
  },

  async getTransactions(etudiantId) {
    const { rows } = await pool.query(
      `SELECT t.id, t.montant, t.points_gagnes, t.created_at,
              c.nom_commerce
       FROM transactions t
       JOIN commercants c ON c.id = t.commercant_id
       WHERE t.etudiant_id = $1
       ORDER BY t.created_at DESC`,
      [etudiantId]
    );
    return rows;
  },
};

module.exports = EtudiantModel;
