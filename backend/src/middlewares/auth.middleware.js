const { verifyToken } = require('../config/jwt');

const authenticate = (profilRequis) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token manquant ou malformé' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = verifyToken(token);

      if (profilRequis && decoded.profil !== profilRequis) {
        return res.status(403).json({ error: `Accès réservé aux ${profilRequis}s` });
      }

      req.user = decoded;
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expiré' });
      }
      return res.status(401).json({ error: 'Token invalide' });
    }
  };
};

const authenticateEtudiant = authenticate('etudiant');
const authenticateCommercant = authenticate('commercant');

module.exports = { authenticate, authenticateEtudiant, authenticateCommercant };
