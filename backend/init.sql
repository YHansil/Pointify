-- ============================================================
-- Pointify - Script d'initialisation de la base de données
-- ============================================================

-- Étudiants
CREATE TABLE IF NOT EXISTS etudiants (
    id              SERIAL PRIMARY KEY,
    nom             VARCHAR(100) NOT NULL,
    prenom          VARCHAR(100) NOT NULL,
    email           VARCHAR(150) UNIQUE NOT NULL,
    mot_de_passe    VARCHAR(255) NOT NULL,
    points_total    INTEGER DEFAULT 0,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Commerçants
CREATE TABLE IF NOT EXISTS commercants (
    id              SERIAL PRIMARY KEY,
    nom_commerce    VARCHAR(150) NOT NULL,
    email           VARCHAR(150) UNIQUE NOT NULL,
    mot_de_passe    VARCHAR(255) NOT NULL,
    description     VARCHAR(255),
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Récompenses
CREATE TABLE IF NOT EXISTS recompenses (
    id              SERIAL PRIMARY KEY,
    commercant_id   INTEGER REFERENCES commercants(id) ON DELETE CASCADE,
    nom             VARCHAR(150) NOT NULL,
    description     VARCHAR(255),
    points_requis   INTEGER NOT NULL,
    actif           BOOLEAN DEFAULT TRUE
);

-- QR Tokens (temporaires)
CREATE TABLE IF NOT EXISTS qr_tokens (
    id              SERIAL PRIMARY KEY,
    token           UUID UNIQUE NOT NULL,
    commercant_id   INTEGER REFERENCES commercants(id) ON DELETE CASCADE,
    montant         DECIMAL(6,2) NOT NULL,
    points_generes  INTEGER NOT NULL,
    expire_at       TIMESTAMP NOT NULL,
    used            BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Transactions
CREATE TABLE IF NOT EXISTS transactions (
    id              SERIAL PRIMARY KEY,
    etudiant_id     INTEGER REFERENCES etudiants(id) ON DELETE CASCADE,
    commercant_id   INTEGER REFERENCES commercants(id) ON DELETE CASCADE,
    montant         DECIMAL(6,2) NOT NULL,
    points_gagnes   INTEGER NOT NULL,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Récompenses réclamées
CREATE TABLE IF NOT EXISTS recompenses_reclamees (
    id              SERIAL PRIMARY KEY,
    etudiant_id     INTEGER REFERENCES etudiants(id) ON DELETE CASCADE,
    recompense_id   INTEGER REFERENCES recompenses(id) ON DELETE CASCADE,
    claimed_at      TIMESTAMP DEFAULT NOW()
);
