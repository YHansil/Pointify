const express = require('express');
const router = express.Router();
const { authenticateEtudiant } = require('../middlewares/auth.middleware');
const {
  getMe,
  getTransactions,
  scanQr,
  getRecompenses,
  reclamerRecompense,
  deleteMe,
} = require('../controllers/etudiant.controller');

router.use(authenticateEtudiant);

router.get('/me', getMe);
router.get('/transactions', getTransactions);
router.post('/scan', scanQr);
router.get('/recompenses', getRecompenses);
router.post('/recompenses/:id/reclamer', reclamerRecompense);
router.delete('/me', deleteMe);

module.exports = router;
