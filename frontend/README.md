# Pointify Frontend

Application mobile React Native + Expo pour Pointify.

## Prérequis

- Node.js 18+
- Expo CLI : `npm install -g expo-cli`
- Expo Go sur ton téléphone (App Store / Play Store)

## Installation

```bash
cd frontend
npm install
```

## Configuration

```bash
cp .env.example .env
```

Édite `.env` :

```env
EXPO_PUBLIC_API_URL=http://TON_IP_LOCAL:3000/api/v1
```

> Sur Android, utilise l'IP locale (ex: `192.168.1.42`).
> Sur iOS avec Expo Go, `localhost` fonctionne si le backend tourne sur le même Mac.

## Lancer l'application

```bash
npx expo start
```

Scanne le QR code avec **Expo Go** sur ton téléphone.

| Commande | Description |
|----------|-------------|
| `npx expo start` | Démarrer le serveur Expo |
| `npx expo start --android` | Lancer sur Android |
| `npx expo start --ios` | Lancer sur iOS |

---

## Architecture

```
src/
├── api/             ← Appels HTTP (axios)
│   ├── client.js    ← Instance axios + intercepteurs JWT + 401
│   ├── auth.api.js
│   ├── etudiant.api.js
│   └── commercant.api.js
├── context/
│   └── AuthContext.js  ← Token JWT + profil + login/logout
├── navigation/
│   ├── index.js        ← Routeur racine (auth vs app)
│   ├── EtudiantNavigator.js
│   └── CommercantNavigator.js
├── screens/
│   ├── auth/           ← Splash, ChoixProfil, Login, Register x2
│   ├── etudiant/       ← Dashboard, Scan, Récompenses, Historique, Profil
│   └── commercant/     ← Dashboard, GenererQR, Stats, Profil/Boutique
├── components/         ← Button, Input, Card, PointsBadge, QRCodeDisplay, LoadingSpinner
└── theme/index.js      ← Palette, fonts, spacing (charte extraite des fichiers design)
```

## Flux utilisateur

### Étudiant
1. Splash → Choix profil → Login/Register
2. Dashboard → solde de points + transactions récentes
3. Onglet Scanner → caméra → scan QR → points crédités instantanément
4. Onglet Récompenses → liste + bouton Échanger (déduit les points)
5. Onglet Historique → transactions groupées par jour

### Commerçant
1. Splash → Choix profil → Login/Register (écran sombre)
2. Dashboard → stats du jour + bouton QR + dernières transactions
3. Onglet QR → saisie montant → QR généré + countdown 60s
4. Onglet Stats → aperçu + graphique + historique complet
5. Onglet Boutique → gestion récompenses + déconnexion

## Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|--------|
| `EXPO_PUBLIC_API_URL` | URL du backend | `http://localhost:3000/api/v1` |
