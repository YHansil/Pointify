// Pointify — Flux Étudiant (3 screens)

// 6) DASHBOARD ÉTUDIANT ─────────────────────────────────────
function DashboardEtudiantScreen() {
  return (
    <IOSDevice>
      <Screen padTop={56}>
        <div style={{ flex: 1, overflow: 'hidden', paddingBottom: 90 }}>
          {/* top row */}
          <div style={{
            padding: '14px 22px 0', display: 'flex',
            alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontFamily: P.body, fontSize: 13, color: P.inkMuted }}>Salut</div>
              <div style={{
                fontFamily: P.display, fontSize: 22, fontWeight: 700,
                color: P.ink, letterSpacing: -0.7,
              }}>Marie 👋</div>
            </div>
            <div style={{
              width: 44, height: 44, borderRadius: 14, background: '#fff',
              boxShadow: `inset 0 0 0 1.5px ${P.line}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={P.ink} strokeWidth="2">
                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M14 21a2 2 0 0 1-4 0"/>
              </svg>
              <div style={{
                position: 'absolute', top: 9, right: 9, width: 9, height: 9, borderRadius: 5,
                background: P.lime, boxShadow: '0 0 0 2px #fff',
              }}/>
            </div>
          </div>

          {/* points card */}
          <div style={{ padding: '18px 22px 0' }}>
            <div style={{
              borderRadius: 28, padding: '22px 22px 20px', position: 'relative', overflow: 'hidden',
              background: `linear-gradient(140deg, ${P.violet} 0%, ${P.violetDeep} 100%)`,
              color: '#fff',
            }}>
              {/* deco */}
              <div style={{
                position: 'absolute', top: -40, right: -30, width: 180, height: 180,
                borderRadius: '50%', border: '1.5px solid rgba(197,248,74,0.25)',
              }}/>
              <div style={{
                position: 'absolute', top: -10, right: 30, width: 110, height: 110,
                borderRadius: '50%', background: 'rgba(197,248,74,0.18)', filter: 'blur(30px)',
              }}/>

              <div style={{
                fontFamily: P.body, fontSize: 13, fontWeight: 600,
                color: 'rgba(255,255,255,0.7)', letterSpacing: 0.4, textTransform: 'uppercase',
              }}>Tes points</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
                <div style={{
                  fontFamily: P.display, fontSize: 64, fontWeight: 700,
                  letterSpacing: -3, lineHeight: 1,
                }}>1 248</div>
                <div style={{
                  width: 28, height: 28, borderRadius: 9, background: P.lime,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: P.ink, fontFamily: P.display, fontWeight: 700, fontSize: 16,
                }}>P</div>
              </div>

              {/* progress */}
              <div style={{ marginTop: 18 }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontFamily: P.body, fontSize: 12, marginBottom: 8,
                  color: 'rgba(255,255,255,0.8)',
                }}>
                  <span>Prochaine récompense</span>
                  <span><b style={{ color: P.lime }}>252</b> / 1500</span>
                </div>
                <div style={{
                  height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.15)', overflow: 'hidden',
                }}>
                  <div style={{ width: '83%', height: '100%', borderRadius: 4, background: P.lime }}/>
                </div>
                <div style={{
                  marginTop: 10, fontFamily: P.body, fontSize: 12,
                  color: 'rgba(255,255,255,0.75)',
                }}>
                  🥐 <b style={{ color: '#fff' }}>1 viennoiserie offerte</b> chez Boulangerie Pain & Co
                </div>
              </div>
            </div>

            {/* quick actions */}
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <QuickAction icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={P.ink} strokeWidth="2"><path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3M7 12h10"/></svg>} label="Scanner"/>
              <QuickAction icon="🎁" label="Récompenses"/>
              <QuickAction icon="📍" label="Carte"/>
            </div>
          </div>

          {/* commerces */}
          <div style={{ padding: '24px 22px 0' }}>
            <SectionHeader title="Commerces du campus" link="Voir tout"/>
          </div>
          <div style={{
            display: 'flex', gap: 12, padding: '12px 22px 0', overflowX: 'auto',
          }}>
            {MERCHANTS.map(m => (
              <MerchantCard key={m.name} {...m}/>
            ))}
          </div>

          {/* historique */}
          <div style={{ padding: '24px 22px 0' }}>
            <SectionHeader title="Dernières transactions"/>
            <div style={{
              background: '#fff', borderRadius: 20, marginTop: 10,
              boxShadow: `inset 0 0 0 1px ${P.line}`,
            }}>
              {TRANSACTIONS.map((t, i) => (
                <TransactionRow key={i} {...t} last={i === TRANSACTIONS.length - 1}/>
              ))}
            </div>
          </div>
        </div>
        <PTabBar active="home"/>
      </Screen>
    </IOSDevice>
  );
}

function QuickAction({ icon, label }) {
  return (
    <div style={{
      flex: 1, height: 64, borderRadius: 18, background: '#fff',
      boxShadow: `inset 0 0 0 1.5px ${P.line}`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
    }}>
      <div style={{ fontSize: 18 }}>{icon}</div>
      <div style={{ fontFamily: P.body, fontSize: 11, fontWeight: 600, color: P.ink }}>{label}</div>
    </div>
  );
}

function SectionHeader({ title, link }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
    }}>
      <div style={{
        fontFamily: P.display, fontSize: 18, fontWeight: 700,
        color: P.ink, letterSpacing: -0.5,
      }}>{title}</div>
      {link && <div style={{
        fontFamily: P.body, fontSize: 13, fontWeight: 600, color: P.violet,
      }}>{link}</div>}
    </div>
  );
}

const MERCHANTS = [
  { name: 'La Crêperie', cat: 'Crêpes', dist: '120m', pts: '+5 / €', color: '#FF8B5C', tag: '🥞' },
  { name: 'Truck & Burger', cat: 'Food truck', dist: '50m', pts: '+8 / €', color: '#3D2BB8', tag: '🍔' },
  { name: 'Pain & Co', cat: 'Boulangerie', dist: '200m', pts: '+3 / €', color: '#16162B', tag: '🥖' },
  { name: 'Le Bar à Salades', cat: 'Healthy', dist: '300m', pts: '+6 / €', color: '#0F8A4B', tag: '🥗' },
];

function MerchantCard({ name, cat, dist, pts, color, tag }) {
  return (
    <div style={{
      flexShrink: 0, width: 160, background: '#fff', borderRadius: 22,
      boxShadow: `inset 0 0 0 1px ${P.line}`,
      padding: 14, display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{
        height: 78, borderRadius: 14, background: color,
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ fontSize: 36 }}>{tag}</div>
        <div style={{
          position: 'absolute', top: 8, right: 8,
          background: 'rgba(0,0,0,0.35)', color: '#fff',
          fontFamily: P.body, fontSize: 10, fontWeight: 700,
          padding: '3px 8px', borderRadius: 999,
        }}>{dist}</div>
      </div>
      <div>
        <div style={{
          fontFamily: P.display, fontSize: 14, fontWeight: 700,
          color: P.ink, letterSpacing: -0.3,
        }}>{name}</div>
        <div style={{
          fontFamily: P.body, fontSize: 11, color: P.inkMuted, marginTop: 2,
        }}>{cat}</div>
      </div>
      <div style={{
        display: 'inline-flex', alignSelf: 'flex-start',
        background: P.violetTint, color: P.violet,
        fontFamily: P.body, fontSize: 11, fontWeight: 700,
        padding: '4px 8px', borderRadius: 6, letterSpacing: -0.1,
      }}>{pts}</div>
    </div>
  );
}

const TRANSACTIONS = [
  { name: 'Truck & Burger', when: "Aujourd'hui · 12:42", amount: '+ 64 pts', sub: '8,00 €', color: '#3D2BB8', tag: '🍔', positive: true },
  { name: 'La Crêperie', when: 'Hier · 16:20', amount: '+ 28 pts', sub: '5,50 €', color: '#FF8B5C', tag: '🥞', positive: true },
  { name: 'Pain & Co', when: 'Mar. · 08:15', amount: '− 500 pts', sub: 'Récompense', color: '#16162B', tag: '🥐', positive: false },
];

function TransactionRow({ name, when, amount, sub, color, tag, positive, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
      borderBottom: last ? 'none' : `1px solid ${P.line}`,
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 12, background: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
      }}>{tag}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: P.body, fontSize: 14, fontWeight: 600, color: P.ink }}>{name}</div>
        <div style={{ fontFamily: P.body, fontSize: 12, color: P.inkMuted, marginTop: 1 }}>{when}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{
          fontFamily: P.display, fontSize: 14, fontWeight: 700,
          color: positive ? P.violet : P.ink,
        }}>{amount}</div>
        <div style={{ fontFamily: P.body, fontSize: 11, color: P.inkMuted }}>{sub}</div>
      </div>
    </div>
  );
}

// 7) SCAN QR ─────────────────────────────────────────────────
function ScanQRScreen() {
  return (
    <IOSDevice dark>
      <div style={{
        width: '100%', height: '100%', position: 'relative', background: '#000', overflow: 'hidden',
      }}>
        {/* fake camera feed */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(80% 60% at 50% 60%, #2a2638 0%, #0a0814 70%, #000 100%)`,
        }}/>
        {/* light streaks */}
        <div style={{
          position: 'absolute', top: '20%', left: '-20%', width: '60%', height: 200,
          background: 'rgba(91,71,229,0.18)', filter: 'blur(60px)', transform: 'rotate(-20deg)',
        }}/>

        {/* top bar */}
        <div style={{
          position: 'absolute', top: 56, left: 0, right: 0, padding: '16px 22px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          zIndex: 5,
        }}>
          <button style={{
            width: 44, height: 44, borderRadius: 14,
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <path d="M6 6l12 12M6 18L18 6"/>
            </svg>
          </button>
          <div style={{
            color: '#fff', fontFamily: P.display, fontSize: 17, fontWeight: 600,
          }}>Scanner un QR</div>
          <button style={{
            width: 44, height: 44, borderRadius: 14,
            background: 'rgba(255,255,255,0.12)',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M5.5 18.5l2.1-2.1M16.4 7.6l2.1-2.1"/>
            </svg>
          </button>
        </div>

        {/* viseur */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 260, height: 260, borderRadius: 32,
        }}>
          {/* dim mask via overlay frame */}
          <div style={{
            position: 'absolute', inset: -2000,
            boxShadow: '0 0 0 2000px rgba(0,0,0,0.55)',
            borderRadius: 32, pointerEvents: 'none',
          }}/>
          {/* corners */}
          {[[0,0],[0,1],[1,0],[1,1]].map(([x,y],i)=>(
            <div key={i} style={{
              position: 'absolute',
              top: y ? 'auto' : -2, bottom: y ? -2 : 'auto',
              left: x ? 'auto' : -2, right: x ? -2 : 'auto',
              width: 44, height: 44,
              borderTop: y ? 'none' : `3px solid ${P.lime}`,
              borderBottom: y ? `3px solid ${P.lime}` : 'none',
              borderLeft: x ? 'none' : `3px solid ${P.lime}`,
              borderRight: x ? `3px solid ${P.lime}` : 'none',
              borderTopLeftRadius: !x && !y ? 24 : 0,
              borderTopRightRadius: x && !y ? 24 : 0,
              borderBottomLeftRadius: !x && y ? 24 : 0,
              borderBottomRightRadius: x && y ? 24 : 0,
            }}/>
          ))}
          {/* scanning line */}
          <div style={{
            position: 'absolute', left: 16, right: 16, top: '52%',
            height: 2, background: `linear-gradient(90deg, transparent, ${P.lime}, transparent)`,
            boxShadow: `0 0 16px ${P.lime}`,
          }}/>
        </div>

        {/* success card (overlay below) */}
        <div style={{
          position: 'absolute', left: 18, right: 18, bottom: 130,
          background: '#fff', borderRadius: 26, padding: 18,
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: P.lime,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={P.ink} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 7"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: P.body, fontSize: 12, fontWeight: 600,
              color: P.inkMuted, textTransform: 'uppercase', letterSpacing: 0.4,
            }}>Scan réussi</div>
            <div style={{
              fontFamily: P.display, fontSize: 17, fontWeight: 700, color: P.ink, marginTop: 1,
            }}>+ 64 points crédités</div>
            <div style={{
              fontFamily: P.body, fontSize: 12, color: P.inkSoft, marginTop: 2,
            }}>Truck & Burger · 8,00 €</div>
          </div>
        </div>

        {/* hint */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 70,
          textAlign: 'center', color: 'rgba(255,255,255,0.7)',
          fontFamily: P.body, fontSize: 13,
        }}>
          Place le code dans le cadre
        </div>

        {/* home indicator handled by frame */}
      </div>
    </IOSDevice>
  );
}

// 8) RÉCOMPENSES ─────────────────────────────────────────────
function RecompensesScreen() {
  return (
    <IOSDevice>
      <Screen padTop={56}>
        <div style={{ flex: 1, overflow: 'hidden', paddingBottom: 90 }}>
          {/* header */}
          <div style={{
            padding: '20px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          }}>
            <div>
              <div style={{
                fontFamily: P.display, fontSize: 28, fontWeight: 700,
                color: P.ink, letterSpacing: -1, lineHeight: 1.05,
              }}>Récompenses</div>
              <div style={{
                marginTop: 4, fontFamily: P.body, fontSize: 13, color: P.inkSoft,
              }}>Échange tes points contre des cadeaux</div>
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: P.ink, color: '#fff', padding: '8px 12px',
              borderRadius: 999, fontFamily: P.display, fontWeight: 700, fontSize: 14,
            }}>
              <div style={{
                width: 16, height: 16, borderRadius: 5, background: P.lime,
                color: P.ink, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 800,
              }}>P</div>
              1 248
            </div>
          </div>

          {/* filter chips */}
          <div style={{
            display: 'flex', gap: 8, padding: '16px 22px 0', overflowX: 'auto',
          }}>
            {['Tous', 'Food', 'Boissons', 'Bons plans', 'Goodies'].map((c, i) => (
              <div key={c} style={{
                flexShrink: 0, height: 34, padding: '0 14px', borderRadius: 999,
                background: i === 0 ? P.ink : '#fff',
                color: i === 0 ? '#fff' : P.ink,
                boxShadow: i === 0 ? 'none' : `inset 0 0 0 1px ${P.line}`,
                fontFamily: P.body, fontSize: 13, fontWeight: 600,
                display: 'flex', alignItems: 'center',
              }}>{c}</div>
            ))}
          </div>

          {/* hero reward */}
          <div style={{ padding: '18px 22px 0' }}>
            <div style={{
              borderRadius: 24, padding: '20px 20px 18px',
              background: P.lime, color: P.ink, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', right: -20, top: -20, fontSize: 120, opacity: 0.18,
              }}>🍔</div>
              <PChip bg="rgba(22,22,43,0.1)" fg={P.ink}>⭐ Coup de cœur</PChip>
              <div style={{
                marginTop: 12, fontFamily: P.display, fontSize: 24,
                fontWeight: 700, letterSpacing: -0.8, lineHeight: 1.1,
              }}>
                Menu Burger<br/>+ frites offert
              </div>
              <div style={{
                marginTop: 4, fontFamily: P.body, fontSize: 13, color: P.inkSoft,
              }}>Truck & Burger · Valable 30 jours</div>
              <div style={{
                marginTop: 14, display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{
                  background: P.ink, color: '#fff',
                  padding: '6px 12px', borderRadius: 999,
                  fontFamily: P.display, fontWeight: 700, fontSize: 13,
                }}>1 500 pts</div>
                <button style={{
                  background: P.ink, color: '#fff', border: 'none',
                  padding: '10px 16px', borderRadius: 14,
                  fontFamily: P.body, fontWeight: 700, fontSize: 13,
                  marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6,
                }}>Échanger
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                    <path d="M9 6l6 6-6 6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* reward grid */}
          <div style={{
            padding: '18px 22px 0', display: 'grid',
            gridTemplateColumns: '1fr 1fr', gap: 12,
          }}>
            {REWARDS.map((r, i) => (
              <RewardCard key={i} {...r}/>
            ))}
          </div>
        </div>
        <PTabBar active="rewards"/>
      </Screen>
    </IOSDevice>
  );
}

const REWARDS = [
  { name: 'Crêpe sucrée', shop: 'La Crêperie', pts: 400, tag: '🥞', color: '#FFE9DC', enough: true },
  { name: 'Café offert', shop: 'Pain & Co', pts: 250, tag: '☕', color: '#EFE7DD', enough: true },
  { name: 'Bowl healthy', shop: 'Le Bar à Salades', pts: 900, tag: '🥗', color: '#E1F5E8', enough: true },
  { name: '-20% sur menu', shop: 'Truck & Burger', pts: 600, tag: '🍟', color: '#EDE9FE', enough: true },
  { name: 'Tote bag', shop: 'Pointify', pts: 1800, tag: '👜', color: '#F4F2EC', enough: false },
  { name: 'Smoothie XL', shop: 'Le Bar à Salades', pts: 700, tag: '🥤', color: '#FFEFE0', enough: true },
];

function RewardCard({ name, shop, pts, tag, color, enough }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 20, padding: 12,
      boxShadow: `inset 0 0 0 1px ${P.line}`, opacity: enough ? 1 : 0.7,
    }}>
      <div style={{
        height: 88, borderRadius: 14, background: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 40, position: 'relative',
      }}>
        {tag}
        {!enough && (
          <div style={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(22,22,43,0.85)', color: '#fff',
            fontFamily: P.body, fontSize: 10, fontWeight: 700,
            padding: '4px 8px', borderRadius: 999,
          }}>🔒</div>
        )}
      </div>
      <div style={{
        marginTop: 10, fontFamily: P.display, fontSize: 14,
        fontWeight: 700, color: P.ink, letterSpacing: -0.3, lineHeight: 1.1,
      }}>{name}</div>
      <div style={{
        marginTop: 2, fontFamily: P.body, fontSize: 11, color: P.inkMuted,
      }}>{shop}</div>
      <div style={{
        marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          fontFamily: P.display, fontSize: 14, fontWeight: 700,
          color: enough ? P.violet : P.inkMuted,
        }}>{pts} pts</div>
        <button style={{
          background: enough ? P.violet : P.line,
          color: enough ? '#fff' : P.inkMuted,
          border: 'none', borderRadius: 10, fontFamily: P.body,
          fontWeight: 700, fontSize: 11, padding: '6px 10px',
        }}>{enough ? 'Échanger' : 'Bientôt'}</button>
      </div>
    </div>
  );
}

Object.assign(window, {
  DashboardEtudiantScreen, ScanQRScreen, RecompensesScreen,
});
