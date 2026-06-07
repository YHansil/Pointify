const express = require('express');
const router = express.Router();
const { authenticateCommercant } = require('../middlewares/auth.middleware');
const {
  getMe,
  genererQr,
  getTransactions,
  getStats,
  getRecompenses,
  createRecompense,
  updateRecompense,
  deleteRecompense,
  deleteMe,
} = require('../controllers/commercant.controller');

router.use(authenticateCommercant);

router.get('/me', getMe);
router.post('/qr/generer', genererQr);
router.get('/transactions', getTransactions);
router.get('/stats', getStats);
router.get('/recompenses', getRecompenses);
router.post('/recompenses', createRecompense);
router.patch('/recompenses/:id', updateRecompense);
router.delete('/recompenses/:id', deleteRecompense);
router.delete('/me', deleteMe);

module.exports = router;
