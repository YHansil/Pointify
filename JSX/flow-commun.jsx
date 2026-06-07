// Pointify — Flux Commun (5 screens)

// 1) SPLASH ────────────────────────────────────────────────
function SplashScreen() {
  return (
    <IOSDevice dark>
      <div style={{
        width: '100%', height: '100%', position: 'relative',
        background: `radial-gradient(120% 80% at 70% 10%, ${P.violetDeep} 0%, ${P.violet} 45%, #2A1F8A 100%)`,
        overflow: 'hidden',
      }}>
        {/* abstract orbit decoration */}
        <div style={{
          position: 'absolute', top: -120, left: -80, width: 360, height: 360,
          borderRadius: '50%', border: `1.5px solid rgba(197,248,74,0.35)`,
        }} />
        <div style={{
          position: 'absolute', top: -40, left: 40, width: 280, height: 280,
          borderRadius: '50%', border: `1px solid rgba(255,255,255,0.18)`,
        }} />
        <div style={{
          position: 'absolute', bottom: 60, right: -80, width: 220, height: 220,
          borderRadius: '50%', background: 'rgba(197,248,74,0.12)', filter: 'blur(40px)',
        }} />

        {/* logo block */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 22,
        }}>
          <div style={{
            width: 108, height: 108, borderRadius: 30, background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
            transform: 'rotate(-6deg)',
          }}>
            <PointifyMark size={70} color={P.violet} dotColor={P.lime}/>
          </div>
          <div style={{
            fontFamily: P.display, fontWeight: 700, fontSize: 44,
            color: '#fff', letterSpacing: -1.4,
          }}>
            Pointify<span style={{ color: P.lime }}>.</span>
          </div>
          <div style={{
            fontFamily: P.body, fontSize: 14, fontWeight: 500,
            color: 'rgba(255,255,255,0.7)', letterSpacing: 0.4,
            textTransform: 'uppercase',
          }}>
            La fidélité, sur ton campus
          </div>
        </div>

        {/* loading dots */}
        <div style={{
          position: 'absolute', bottom: 80, left: 0, right: 0,
          display: 'flex', justifyContent: 'center', gap: 8,
        }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: 4,
              background: i === 1 ? P.lime : 'rgba(255,255,255,0.3)',
            }}/>
          ))}
        </div>
      </div>
    </IOSDevice>
  );
}

// 2) CHOIX DU PROFIL ─────────────────────────────────────────
function ChoixProfilScreen() {
  return (
    <IOSDevice>
      <Screen padTop={56}>
        <div style={{ padding: '24px 24px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
            <PointifyMark size={32}/>
            <PointifyWordmark size={20}/>
          </div>

          {/* hero copy */}
          <div style={{ marginTop: 48 }}>
            <div style={{
              fontFamily: P.display, fontSize: 38, fontWeight: 700,
              color: P.ink, letterSpacing: -1.4, lineHeight: 1.05,
            }}>
              Bienvenue sur<br/>
              <span style={{
                background: `linear-gradient(95deg, ${P.violet}, ${P.violetDeep})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>le campus</span>.
            </div>
            <div style={{
              marginTop: 12, fontFamily: P.body, fontSize: 15,
              color: P.inkSoft, lineHeight: 1.45,
            }}>
              Cumule des points dans tes commerces préférés et échange-les contre des récompenses.
            </div>
          </div>

          <div style={{ flex: 1 }}/>

          {/* big choice cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
            <ChoiceCard
              role="Étudiant"
              icon="🎓"
              hint="Cumule, scanne, gagne"
              bg={P.violet} fg="#fff"
              accent={P.lime}
            />
            <ChoiceCard
              role="Commerçant"
              icon="🏪"
              hint="Fidélise tes clients"
              bg="#fff" fg={P.ink}
              accent={P.violet}
              border
            />
          </div>

          <div style={{
            textAlign: 'center', fontFamily: P.body, fontSize: 13,
            color: P.inkMuted, marginBottom: 30,
          }}>
            En continuant, tu acceptes nos <span style={{ color: P.ink, fontWeight: 600 }}>CGU</span>
          </div>
        </div>
      </Screen>
    </IOSDevice>
  );
}

function ChoiceCard({ role, icon, hint, bg, fg, accent, border }) {
  return (
    <div style={{
      background: bg, color: fg, borderRadius: 24,
      padding: '22px 22px 20px', position: 'relative', overflow: 'hidden',
      boxShadow: border ? `inset 0 0 0 1.5px ${P.line}` : `0 12px 30px -10px ${bg}55`,
    }}>
      <div style={{
        position: 'absolute', top: -10, right: -10, width: 88, height: 88,
        borderRadius: '50%', background: `${accent}33`,
      }}/>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
        <div style={{
          width: 54, height: 54, borderRadius: 16, background: accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28,
        }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: P.display, fontSize: 22, fontWeight: 700,
            letterSpacing: -0.7,
          }}>Je suis {role}</div>
          <div style={{
            fontFamily: P.body, fontSize: 13, fontWeight: 500,
            color: fg === '#fff' ? 'rgba(255,255,255,0.7)' : P.inkMuted,
            marginTop: 2,
          }}>{hint}</div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="2.5">
          <path d="M9 6l6 6-6 6"/>
        </svg>
      </div>
    </div>
  );
}

// 3) CONNEXION ───────────────────────────────────────────────
function ConnexionScreen({ role = 'Étudiant' }) {
  const accent = role === 'Étudiant' ? P.violet : P.ink;
  return (
    <IOSDevice>
      <Screen padTop={62}>
        <div style={{ padding: '0 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* back chevron */}
          <button style={{
            width: 44, height: 44, borderRadius: 14, border: 'none', background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `inset 0 0 0 1.5px ${P.line}`, marginTop: 8,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={P.ink} strokeWidth="2.5">
              <path d="M15 6l-6 6 6 6"/>
            </svg>
          </button>

          <div style={{ marginTop: 32 }}>
            <PChip bg={role === 'Étudiant' ? P.violetTint : '#EAEAF0'} fg={accent}>
              {role === 'Étudiant' ? '🎓' : '🏪'} {role}
            </PChip>
            <div style={{
              marginTop: 14, fontFamily: P.display, fontSize: 34,
              fontWeight: 700, color: P.ink, letterSpacing: -1.2, lineHeight: 1.05,
            }}>
              Bon retour !
            </div>
            <div style={{
              marginTop: 8, fontFamily: P.body, fontSize: 15, color: P.inkSoft,
            }}>
              Connecte-toi pour reprendre où tu en étais.
            </div>
          </div>

          <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <PField
              label="Email"
              value="marie.durand@univ-paris.fr"
              type="email"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={P.inkMuted} strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2"/>
                  <path d="M3 7l9 6 9-6"/>
                </svg>
              }
            />
            <PField
              label="Mot de passe"
              value="••••••••••"
              type="password"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={P.inkMuted} strokeWidth="2">
                  <rect x="4" y="11" width="16" height="10" rx="2"/>
                  <path d="M8 11V8a4 4 0 0 1 8 0v3"/>
                </svg>
              }
            />
            <div style={{
              textAlign: 'right', fontFamily: P.body, fontSize: 13,
              fontWeight: 600, color: accent, marginTop: -4,
            }}>Mot de passe oublié ?</div>
          </div>

          <div style={{ flex: 1 }}/>

          <div style={{ marginBottom: 24 }}>
            <PButton color={accent}>Se connecter</PButton>
            <div style={{
              textAlign: 'center', marginTop: 18, fontFamily: P.body,
              fontSize: 14, color: P.inkSoft,
            }}>
              Pas encore de compte ?{' '}
              <span style={{ color: accent, fontWeight: 700 }}>S'inscrire</span>
            </div>
          </div>
          <div style={{ height: 18 }}/>
        </div>
      </Screen>
    </IOSDevice>
  );
}

// 4) INSCRIPTION ÉTUDIANT ────────────────────────────────────
function InscriptionEtudiantScreen() {
  return (
    <IOSDevice>
      <Screen padTop={62}>
        <div style={{ padding: '0 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <button style={{
            width: 44, height: 44, borderRadius: 14, border: 'none', background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `inset 0 0 0 1.5px ${P.line}`, marginTop: 8,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={P.ink} strokeWidth="2.5">
              <path d="M15 6l-6 6 6 6"/>
            </svg>
          </button>

          <div style={{ marginTop: 24 }}>
            <PChip>🎓 Étudiant</PChip>
            <div style={{
              marginTop: 14, fontFamily: P.display, fontSize: 32,
              fontWeight: 700, color: P.ink, letterSpacing: -1.1, lineHeight: 1.05,
            }}>
              Crée ton compte
            </div>
            <div style={{
              marginTop: 6, fontFamily: P.body, fontSize: 14, color: P.inkSoft,
            }}>
              30 secondes, et tu cumules tes premiers points.
            </div>
          </div>

          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}><PField label="Prénom" value="Marie"/></div>
              <div style={{ flex: 1 }}><PField label="Nom" value="Durand"/></div>
            </div>
            <PField label="Email universitaire" value="marie.durand@univ-paris.fr"/>
            <PField label="Mot de passe" value="••••••••" type="password"/>
            <div style={{
              padding: 14, borderRadius: 14, background: P.violetTint,
              display: 'flex', gap: 10, alignItems: 'flex-start',
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: 6, background: P.violet,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5">
                  <path d="M5 12l5 5L20 7"/>
                </svg>
              </div>
              <div style={{ fontFamily: P.body, fontSize: 12, color: P.ink, lineHeight: 1.45 }}>
                J'accepte les CGU et la politique de confidentialité de Pointify.
              </div>
            </div>
          </div>

          <div style={{ flex: 1, minHeight: 12 }}/>

          <div style={{ marginBottom: 30 }}>
            <PButton>Créer mon compte</PButton>
          </div>
        </div>
      </Screen>
    </IOSDevice>
  );
}

// 5) INSCRIPTION COMMERÇANT ──────────────────────────────────
function InscriptionCommercantScreen() {
  return (
    <IOSDevice dark>
      <Screen bg={P.ink} padTop={62}>
        <div style={{ padding: '0 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <button style={{
            width: 44, height: 44, borderRadius: 14, border: 'none', background: 'rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.12)', marginTop: 8,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <path d="M15 6l-6 6 6 6"/>
            </svg>
          </button>

          <div style={{ marginTop: 24 }}>
            <span style={{
              display: 'inline-flex', height: 28, padding: '0 12px', borderRadius: 999,
              background: P.lime, color: P.ink, fontFamily: P.body,
              fontSize: 12, fontWeight: 700, alignItems: 'center',
            }}>🏪 Commerçant</span>
            <div style={{
              marginTop: 14, fontFamily: P.display, fontSize: 32,
              fontWeight: 700, color: '#fff', letterSpacing: -1.1, lineHeight: 1.05,
            }}>
              Ouvre ta<br/>boutique.
            </div>
            <div style={{
              marginTop: 8, fontFamily: P.body, fontSize: 14,
              color: 'rgba(255,255,255,0.65)',
            }}>
              Toucher 12 000 étudiants à deux pas de chez toi.
            </div>
          </div>

          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <DarkField label="Nom du commerce" value="Crêperie du Quartier Latin"/>
            <DarkField label="Email pro" value="hello@creperie-ql.fr"/>
            <DarkField label="Mot de passe" value="••••••••"/>
            <DarkField label="Description courte" value="Crêpes sucrées-salées artisanales, à 5 min de la Sorbonne." multiline/>
          </div>

          <div style={{ flex: 1, minHeight: 8 }}/>

          <div style={{ marginBottom: 30 }}>
            <PButton color={P.lime} fg={P.ink}>Créer mon commerce</PButton>
          </div>
        </div>
      </Screen>
    </IOSDevice>
  );
}

function DarkField({ label, value, multiline }) {
  return (
    <label>
      <div style={{
        fontFamily: P.body, fontSize: 13, fontWeight: 500,
        color: 'rgba(255,255,255,0.55)', marginBottom: 8,
      }}>{label}</div>
      <div style={{
        minHeight: multiline ? 76 : 56, borderRadius: 16,
        background: 'rgba(255,255,255,0.06)',
        boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.1)',
        padding: multiline ? '14px 18px' : '0 18px',
        display: 'flex', alignItems: multiline ? 'flex-start' : 'center',
        fontFamily: P.body, fontSize: 15, fontWeight: 500, color: '#fff',
        lineHeight: 1.4,
      }}>{value}</div>
    </label>
  );
}

Object.assign(window, {
  SplashScreen, ChoixProfilScreen, ConnexionScreen,
  InscriptionEtudiantScreen, InscriptionCommercantScreen,
});
