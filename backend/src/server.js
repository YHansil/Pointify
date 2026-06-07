require('dotenv').config();
const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Base de données connectée');
  } catch (err) {
    console.error('Impossible de se connecter à la base de données :', err.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Pointify API démarrée sur http://localhost:${PORT}`);
    console.log(`Environnement : ${process.env.NODE_ENV || 'development'}`);
  });
};

start();
