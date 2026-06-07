const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const QrTokenModel = {
  async create({ commercant_id, montant, points_generes }) {
    const token = uuidv4();
    const { rows } = await pool.query(
      `INSERT INTO qr_tokens (token, commercant_id, montant, points_generes, expire_at)
       VALUES ($1, $2, $3, $4, NOW() + INTERVAL '60 seconds')
       RETURNING token, expire_at,
         EXTRACT(EPOCH FROM (expire_at - NOW()))::INTEGER AS expire_dans`,
      [token, commercant_id, montant, points_generes]
    );
    return rows[0];
  },

  async findByToken(token) {
    const { rows } = await pool.query(
      'SELECT * FROM qr_tokens WHERE token = $1',
      [token]
    );
    return rows[0] || null;
  },

  async markAsUsed(id) {
    await pool.query('UPDATE qr_tokens SET used = TRUE WHERE id = $1', [id]);
  },
};

module.exports = QrTokenModel;
