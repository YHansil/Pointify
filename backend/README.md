# Pointify Backend API

API REST pour l'application de fidélité étudiante Pointify.

## Stack technique

- **Runtime** : Node.js
- **Framework** : Express.js
- **Base de données** : PostgreSQL (via `pg`)
- **Auth** : JWT + bcrypt
- **UUID** : uuid v4

---

## Installation

### 1. Cloner et installer les dépendances

```bash
cd backend
npm install
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Éditer `.env` :

```env
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/pointify
JWT_SECRET=un_secret_tres_long_et_aleatoire
```

### 3. Initialiser la base de données

Exécuter le fichier `init.sql` dans votre instance PostgreSQL (Supabase, psql, etc.) :

```bash
psql $DATABASE_URL -f init.sql
```

### 4. Lancer le serveur

```bash
# Développement (hot-reload)
npm run dev

# Production
npm start
```

---

## Base URL

```
http://localhost:3000/api/v1
```

---

## Routes & Exemples

### AUTH (public)

#### POST /auth/etudiant/register

```bash
curl -X POST http://localhost:3000/api/v1/auth/etudiant/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Dupont",
    "prenom": "Alice",
    "email": "alice@campus.fr",
    "mot_de_passe": "motdepasse123"
  }'
```

**Réponse 201 :**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "etudiant": {
    "id": 1,
    "nom": "Dupont",
    "prenom": "Alice",
    "email": "alice@campus.fr",
    "points_total": 0,
    "created_at": "2024-01-15T10:00:00.000Z"
  }
}
```

---

#### POST /auth/etudiant/login

```bash
curl -X POST http://localhost:3000/api/v1/auth/etudiant/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@campus.fr",
    "mot_de_passe": "motdepasse123"
  }'
```

**Réponse 200 :**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "etudiant": { "id": 1, "nom": "Dupont", "prenom": "Alice", "email": "alice@campus.fr", "points_total": 150 }
}
```

---

#### POST /auth/commercant/register

```bash
curl -X POST http://localhost:3000/api/v1/auth/commercant/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom_commerce": "La Bonne Boulangerie",
    "email": "boulangerie@campus.fr",
    "mot_de_passe": "secret456",
    "description": "Pains et viennoiseries artisanaux"
  }'
```

**Réponse 201 :**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "commercant": {
    "id": 1,
    "nom_commerce": "La Bonne Boulangerie",
    "email": "boulangerie@campus.fr",
    "description": "Pains et viennoiseries artisanaux",
    "created_at": "2024-01-15T10:00:00.000Z"
  }
}
```

---

#### POST /auth/commercant/login

```bash
curl -X POST http://localhost:3000/api/v1/auth/commercant/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "boulangerie@campus.fr",
    "mot_de_passe": "secret456"
  }'
```

---

### ÉTUDIANT (JWT étudiant requis)

> Ajouter le header : `Authorization: Bearer <token>`

#### GET /etudiant/me

```bash
curl http://localhost:3000/api/v1/etudiant/me \
  -H "Authorization: Bearer <token_etudiant>"
```

**Réponse 200 :**
```json
{
  "etudiant": {
    "id": 1,
    "nom": "Dupont",
    "prenom": "Alice",
    "email": "alice@campus.fr",
    "points_total": 150,
    "created_at": "2024-01-15T10:00:00.000Z"
  }
}
```

---

#### GET /etudiant/transactions

```bash
curl http://localhost:3000/api/v1/etudiant/transactions \
  -H "Authorization: Bearer <token_etudiant>"
```

**Réponse 200 :**
```json
{
  "transactions": [
    {
      "id": 3,
      "montant": "12.50",
      "points_gagnes": 125,
      "created_at": "2024-01-15T14:30:00.000Z",
      "nom_commerce": "La Bonne Boulangerie"
    }
  ]
}
```

---

#### POST /etudiant/scan

```bash
curl -X POST http://localhost:3000/api/v1/etudiant/scan \
  -H "Authorization: Bearer <token_etudiant>" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

**Réponse 200 :**
```json
{
  "message": "Points crédités avec succès",
  "points_gagnes": 125,
  "points_total": 275
}
```

**Erreurs possibles :**
- `400` QR code déjà utilisé
- `400` QR code expiré
- `404` QR code invalide

---

#### GET /etudiant/recompenses

```bash
curl http://localhost:3000/api/v1/etudiant/recompenses \
  -H "Authorization: Bearer <token_etudiant>"
```

**Réponse 200 :**
```json
{
  "recompenses": [
    {
      "id": 1,
      "nom": "Café offert",
      "description": "Un café au choix",
      "points_requis": 100,
      "nom_commerce": "La Bonne Boulangerie"
    }
  ]
}
```

---

#### POST /etudiant/recompenses/:id/reclamer

```bash
curl -X POST http://localhost:3000/api/v1/etudiant/recompenses/1/reclamer \
  -H "Authorization: Bearer <token_etudiant>"
```

**Réponse 201 :**
```json
{
  "message": "Récompense réclamée avec succès",
  "recompense": "Café offert",
  "points_deduits": 100,
  "points_restants": 50
}
```

---

#### DELETE /etudiant/me

```bash
curl -X DELETE http://localhost:3000/api/v1/etudiant/me \
  -H "Authorization: Bearer <token_etudiant>"
```

**Réponse 200 :**
```json
{ "message": "Compte supprimé avec succès" }
```

---

### COMMERÇANT (JWT commerçant requis)

> Ajouter le header : `Authorization: Bearer <token_commercant>`

#### GET /commercant/me

```bash
curl http://localhost:3000/api/v1/commercant/me \
  -H "Authorization: Bearer <token_commercant>"
```

---

#### POST /commercant/qr/generer

```bash
curl -X POST http://localhost:3000/api/v1/commercant/qr/generer \
  -H "Authorization: Bearer <token_commercant>" \
  -H "Content-Type: application/json" \
  -d '{ "montant": 12.50 }'
```

**Réponse 201 :**
```json
{
  "token": "550e8400-e29b-41d4-a716-446655440000",
  "montant": 12.5,
  "points_generes": 125,
  "expire_dans": 60,
  "expire_at": "2024-01-15T14:31:00.000Z"
}
```

> Le token UUID est valable **60 secondes** et usage unique.
> Règle : 1€ = 10 points → 12,50€ = 125 points

---

#### GET /commercant/transactions

```bash
curl http://localhost:3000/api/v1/commercant/transactions \
  -H "Authorization: Bearer <token_commercant>"
```

**Réponse 200 :**
```json
{
  "transactions": [
    {
      "id": 3,
      "montant": "12.50",
      "points_gagnes": 125,
      "created_at": "2024-01-15T14:30:00.000Z",
      "etudiant_nom": "Dupont",
      "etudiant_prenom": "Alice"
    }
  ]
}
```

---

#### GET /commercant/stats

```bash
curl http://localhost:3000/api/v1/commercant/stats \
  -H "Authorization: Bearer <token_commercant>"
```

**Réponse 200 :**
```json
{
  "stats": {
    "scans_aujourd_hui": 5,
    "scans_cette_semaine": 23,
    "total_points_distribues": 4750
  }
}
```

---

#### GET /commercant/recompenses

```bash
curl http://localhost:3000/api/v1/commercant/recompenses \
  -H "Authorization: Bearer <token_commercant>"
```

---

#### POST /commercant/recompenses

```bash
curl -X POST http://localhost:3000/api/v1/commercant/recompenses \
  -H "Authorization: Bearer <token_commercant>" \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Café offert",
    "description": "Un café au choix parmi notre sélection",
    "points_requis": 100
  }'
```

**Réponse 201 :**
```json
{
  "recompense": {
    "id": 1,
    "commercant_id": 1,
    "nom": "Café offert",
    "description": "Un café au choix parmi notre sélection",
    "points_requis": 100,
    "actif": true
  }
}
```

---

#### PATCH /commercant/recompenses/:id

```bash
curl -X PATCH http://localhost:3000/api/v1/commercant/recompenses/1 \
  -H "Authorization: Bearer <token_commercant>" \
  -H "Content-Type: application/json" \
  -d '{
    "actif": false
  }'
```

**Réponse 200 :**
```json
{
  "recompense": { "id": 1, "nom": "Café offert", "actif": false, ... }
}
```

---

#### DELETE /commercant/recompenses/:id

```bash
curl -X DELETE http://localhost:3000/api/v1/commercant/recompenses/1 \
  -H "Authorization: Bearer <token_commercant>"
```

**Réponse 200 :**
```json
{ "message": "Récompense supprimée" }
```

---

#### DELETE /commercant/me

```bash
curl -X DELETE http://localhost:3000/api/v1/commercant/me \
  -H "Authorization: Bearer <token_commercant>"
```

---

## Codes HTTP utilisés

| Code | Signification         |
|------|-----------------------|
| 200  | OK                    |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 500  | Internal Server Error |

---

## Logique QR Code

```
Commerçant génère QR → token UUID v4, TTL 60s
         ↓
Étudiant scanne → vérifie (existe / non expiré / non utilisé)
         ↓
Transaction atomique :
  • qr_tokens.used = true
  • etudiants.points_total += points_generes
  • INSERT transactions
```
