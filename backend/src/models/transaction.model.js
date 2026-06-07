const pool = require('../config/db');

const TransactionModel = {
  async create({ etudiant_id, commercant_id, montant, points_gagnes }) {
    const { rows } = await pool.query(
      `INSERT INTO transactions (etudiant_id, commercant_id, montant, points_gagnes)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [etudiant_id, commercant_id, montant, points_gagnes]
    );
    return rows[0];
  },
};

module.exports = TransactionModel;
