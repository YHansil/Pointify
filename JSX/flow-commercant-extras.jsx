// Pointify — Écrans complémentaires Commerçant

// 16) PROFIL / BOUTIQUE COMMERÇANT ───────────────────────────
function ProfilCommercantScreen() {
  return (
    <IOSDevice dark>
      <Screen bg={P.ink} padTop={56}>
        <div style={{ flex: 1, overflow: 'hidden', paddingBottom: 90, color: '#fff' }}>
          {/* header */}
          <div style={{
            padding: '14px 22px 0', display: 'flex',
            alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{
              fontFamily: P.display, fontSize: 22, fontWeight: 700, color: '#fff',
              letterSpacing: -0.7,
            }}>Ma boutique</div>
            <div style={{
              fontFamily: P.body, fontSize: 13, fontWeight: 700,
              color: P.lime,
            }}>Modifier</div>
          </div>

          {/* hero card */}
          <div style={{ padding: '18px 22px 0' }}>
            <div style={{
              borderRadius: 24, padding: 18, position: 'relative', overflow: 'hidden',
              background: `linear-gradient(140deg, ${P.violet} 0%, ${P.violetDeep} 100%)`,
            }}>
              <div style={{
                position: 'absolute', top: -30, right: -30, width: 140, height: 140,
                borderRadius: '50%', border: '1.5px solid rgba(197,248,74,0.3)',
              }}/>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 18, background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32, boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                }}>🥞</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: P.display, fontSize: 19, fontWeight: 700,
                    color: '#fff', letterSpacing: -0.5, lineHeight: 1.1,
                  }}>Crêperie du Quartier Latin</div>
                  <div style={{
                    marginTop: 4, fontFamily: P.body, fontSize: 12,
                    color: 'rgba(255,255,255,0.7)',
                  }}>15 rue des Écoles · 75005</div>
                </div>
              </div>
              <div style={{
                marginTop: 16, display: 'flex', alignItems: 'center', gap: 8,
                fontFamily: P.body, fontSize: 12, color: 'rgba(255,255,255,0.8)',
              }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'rgba(197,248,74,0.2)', color: P.lime,
                  padding: '4px 10px', borderRadius: 999, fontWeight: 700,
                }}>● Ouvert maintenant</span>
                <span>⭐ 4.6 · 89 avis</span>
              </div>
            </div>
          </div>

          {/* KPIs row */}
          <div style={{ padding: '14px 22px 0' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
            }}>
              <KpiCell value="328" label="Clients fidèles"/>
              <KpiCell value="14,2k" label="Pts distribués"/>
              <KpiCell value="92%" label="Taux retour" hl/>
            </div>
          </div>

          {/* programme de fidélité */}
          <div style={{ padding: '22px 22px 0' }}>
            <div style={{
              fontFamily: P.body, fontSize: 12, fontWeight: 700,
              color: 'rgba(255,255,255,0.5)', letterSpacing: 0.4,
              textTransform: 'uppercase', marginBottom: 10,
            }}>Programme de fidélité</div>
            <div style={{
              background: 'rgba(255,255,255,0.04)', borderRadius: 20,
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
              padding: '14px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontFamily: P.body, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                  Taux de points
                </div>
                <div style={{
                  marginTop: 4, fontFamily: P.display, fontSize: 22, fontWeight: 700,
                  color: '#fff', letterSpacing: -0.5, lineHeight: 1,
                }}>5 <span style={{ color: P.lime, fontSize: 15 }}>pts / €</span></div>
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                background: P.lime, color: P.ink, padding: '8px 12px', borderRadius: 12,
                fontFamily: P.body, fontSize: 13, fontWeight: 700, gap: 4,
              }}>Modifier
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={P.ink} strokeWidth="2.5">
                  <path d="M9 6l6 6-6 6"/>
                </svg>
              </div>
            </div>
          </div>

          {/* récompenses gérées */}
          <div style={{ padding: '22px 22px 0' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10,
            }}>
              <div style={{
                fontFamily: P.body, fontSize: 12, fontWeight: 700,
                color: 'rgba(255,255,255,0.5)', letterSpacing: 0.4, textTransform: 'uppercase',
              }}>Mes récompenses · 5</div>
              <div style={{
                fontFamily: P.body, fontSize: 13, fontWeight: 700, color: P.lime,
              }}>+ Ajouter</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <MerchantRewardRow tag="🥞" name="1 crêpe sucrée offerte" pts={400} echanges={42}/>
              <MerchantRewardRow tag="🧇" name="Gaufre offerte" pts={350} echanges={28}/>
              <MerchantRewardRow tag="🍫" name="−2 € sur tout le menu" pts={250} echanges={67}/>
            </div>
          </div>

          {/* settings */}
          <div style={{ padding: '22px 22px 0' }}>
            <div style={{
              fontFamily: P.body, fontSize: 12, fontWeight: 700,
              color: 'rgba(255,255,255,0.5)', letterSpacing: 0.4,
              textTransform: 'uppercase', marginBottom: 10,
            }}>Réglages</div>
            <div style={{
              background: 'rgba(255,255,255,0.04)', borderRadius: 20,
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)', overflow: 'hidden',
            }}>
              <DarkSettingRow icon="🕐" label="Horaires d'ouverture" hint="Lun–Sam"/>
              <DarkSettingRow icon="💳" label="Moyens de paiement"/>
              <DarkSettingRow icon="👥" label="Équipe" hint="3 membres"/>
              <DarkSettingRow icon="📊" label="Exporter les données"/>
              <DarkSettingRow icon="↪️" label="Se déconnecter" danger last/>
            </div>
          </div>
          <div style={{ height: 30 }}/>
        </div>
        <PTabBarMerchant active="me"/>
      </Screen>
    </IOSDevice>
  );
}

function KpiCell({ value, label, hl }) {
  return (
    <div style={{
      background: hl ? 'rgba(197,248,74,0.08)' : 'rgba(255,255,255,0.04)',
      boxShadow: hl
        ? 'inset 0 0 0 1px rgba(197,248,74,0.2)'
        : 'inset 0 0 0 1px rgba(255,255,255,0.06)',
      borderRadius: 16, padding: '12px 14px',
    }}>
      <div style={{
        fontFamily: P.display, fontSize: 22, fontWeight: 700,
        color: hl ? P.lime : '#fff', letterSpacing: -0.6, lineHeight: 1,
      }}>{value}</div>
      <div style={{
        marginTop: 4, fontFamily: P.body, fontSize: 11,
        color: 'rgba(255,255,255,0.55)',
      }}>{label}</div>
    </div>
  );
}

function MerchantRewardRow({ tag, name, pts, echanges }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)', borderRadius: 16,
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
      padding: '12px 14px',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
      }}>{tag}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: P.body, fontSize: 14, fontWeight: 600, color: '#fff' }}>{name}</div>
        <div style={{
          fontFamily: P.body, fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2,
        }}>{pts} pts · {echanges} échanges</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5">
        <path d="M9 6l6 6-6 6"/>
      </svg>
    </div>
  );
}

function DarkSettingRow({ icon, label, hint, danger, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
      borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 9,
        background: danger ? 'rgba(255,123,123,0.15)' : 'rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
      }}>{icon}</div>
      <div style={{
        flex: 1, fontFamily: P.body, fontSize: 15, fontWeight: 500,
        color: danger ? '#FF7B7B' : '#fff',
      }}>{label}</div>
      {hint && <div style={{
        fontFamily: P.body, fontSize: 12, color: 'rgba(255,255,255,0.5)',
      }}>{hint}</div>}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5">
        <path d="M9 6l6 6-6 6"/>
      </svg>
    </div>
  );
}

Object.assign(window, { ProfilCommercantScreen });
