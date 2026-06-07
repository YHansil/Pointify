// Pointify — Flux Commerçant (2 screens)

// 9) DASHBOARD COMMERÇANT ────────────────────────────────────
function DashboardCommercantScreen() {
  return (
    <IOSDevice dark>
      <Screen bg={P.ink} padTop={56}>
        <div style={{ flex: 1, overflow: 'hidden', paddingBottom: 90, color: '#fff' }}>
          {/* top row */}
          <div style={{
            padding: '14px 22px 0', display: 'flex',
            alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <MerchantAvatar name="Crêperie Quartier Latin" color={P.violet} size={40}/>
              <div>
                <div style={{ fontFamily: P.body, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
                  Bonjour,
                </div>
                <div style={{
                  fontFamily: P.display, fontSize: 18, fontWeight: 700,
                  color: '#fff', letterSpacing: -0.5,
                }}>Crêperie QL</div>
              </div>
            </div>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(255,255,255,0.08)',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </div>
          </div>

          {/* big CTA */}
          <div style={{ padding: '20px 22px 0' }}>
            <button style={{
              width: '100%', height: 96, borderRadius: 24,
              background: P.lime, color: P.ink, border: 'none',
              display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px',
              position: 'relative', overflow: 'hidden',
              boxShadow: `0 16px 40px -10px ${P.lime}80`,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16, background: P.ink,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={P.lime} strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/>
                  <path d="M14 14h3v3M21 14v7M17 21h4M14 17h3"/>
                </svg>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontFamily: P.display, fontSize: 20, fontWeight: 700,
                  letterSpacing: -0.6,
                }}>Générer un QR Code</div>
                <div style={{
                  fontFamily: P.body, fontSize: 12, fontWeight: 500,
                  color: 'rgba(22,22,43,0.65)', marginTop: 2,
                }}>Crédite des points à un client en 5 sec</div>
              </div>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={P.ink} strokeWidth="2.5"
                   style={{ marginLeft: 'auto' }}>
                <path d="M9 6l6 6-6 6"/>
              </svg>
            </button>
          </div>

          {/* stats */}
          <div style={{ padding: '20px 22px 0' }}>
            <div style={{
              fontFamily: P.body, fontSize: 12, fontWeight: 600,
              color: 'rgba(255,255,255,0.5)', letterSpacing: 0.3,
              textTransform: 'uppercase', marginBottom: 10,
            }}>Aperçu</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <StatTile label="Scans aujourd'hui" value="34" delta="+12%" trend="up"/>
              <StatTile label="Cette semaine" value="218" delta="+5%" trend="up"/>
              <StatTile label="Points distribués" value="4,2k" delta="—" trend="flat" subtle/>
              <StatTile label="Clients fidèles" value="87" delta="+8" trend="up" subtle/>
            </div>
          </div>

          {/* sparkline card */}
          <div style={{ padding: '14px 22px 0' }}>
            <div style={{
              background: 'rgba(255,255,255,0.04)', borderRadius: 20,
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
              padding: 16,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontFamily: P.body, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
                    Scans, 7 derniers jours
                  </div>
                  <div style={{
                    fontFamily: P.display, fontSize: 28, fontWeight: 700, color: '#fff',
                    letterSpacing: -0.8, marginTop: 2,
                  }}>218 <span style={{
                    fontSize: 14, color: P.lime, fontWeight: 600,
                  }}>↑ 12%</span></div>
                </div>
              </div>
              {/* mini bar chart */}
              <div style={{
                display: 'flex', alignItems: 'flex-end', gap: 6, height: 56, marginTop: 14,
              }}>
                {[40, 60, 35, 70, 55, 85, 100].map((h, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      width: '100%', height: `${h}%`, borderRadius: 6,
                      background: i === 6 ? P.lime : 'rgba(255,255,255,0.18)',
                    }}/>
                  </div>
                ))}
              </div>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontFamily: P.mono, fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 6,
              }}>
                {['L','M','M','J','V','S','D'].map((d,i) => (
                  <span key={i} style={{ flex: 1, textAlign: 'center', color: i === 6 ? P.lime : undefined }}>{d}</span>
                ))}
              </div>
            </div>
          </div>

          {/* transactions */}
          <div style={{ padding: '20px 22px 0' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            }}>
              <div style={{
                fontFamily: P.display, fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: -0.5,
              }}>Dernières transactions</div>
              <div style={{ fontFamily: P.body, fontSize: 12, fontWeight: 600, color: P.lime }}>Tout voir</div>
            </div>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {MERCHANT_TX.map((t, i) => <MerchantTxRow key={i} {...t}/>)}
            </div>
          </div>
        </div>
        <PTabBarMerchant active="home"/>
      </Screen>
    </IOSDevice>
  );
}

function StatTile({ label, value, delta, trend, subtle }) {
  const trendColor = trend === 'up' ? P.lime : trend === 'down' ? '#FF7B7B' : 'rgba(255,255,255,0.4)';
  return (
    <div style={{
      background: subtle ? 'rgba(255,255,255,0.04)' : 'rgba(197,248,74,0.08)',
      boxShadow: subtle
        ? 'inset 0 0 0 1px rgba(255,255,255,0.06)'
        : `inset 0 0 0 1px rgba(197,248,74,0.2)`,
      borderRadius: 18, padding: 14,
    }}>
      <div style={{
        fontFamily: P.body, fontSize: 11, color: 'rgba(255,255,255,0.55)',
      }}>{label}</div>
      <div style={{
        marginTop: 4, fontFamily: P.display, fontSize: 26,
        fontWeight: 700, color: '#fff', letterSpacing: -0.8, lineHeight: 1,
      }}>{value}</div>
      <div style={{
        marginTop: 6, fontFamily: P.body, fontSize: 11,
        fontWeight: 600, color: trendColor,
      }}>{delta}</div>
    </div>
  );
}

const MERCHANT_TX = [
  { client: 'Marie D.', when: '12:42', amount: '8,00 €', pts: '+64', initials: 'MD', avatar: '#FF8B5C' },
  { client: 'Thomas L.', when: '12:18', amount: '5,50 €', pts: '+44', initials: 'TL', avatar: '#5B47E5' },
  { client: 'Lina M.', when: '11:55', amount: '12,00 €', pts: '+96', initials: 'LM', avatar: '#0F8A4B' },
];

function MerchantTxRow({ client, when, amount, pts, initials, avatar }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      background: 'rgba(255,255,255,0.04)',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
      borderRadius: 16, padding: '12px 14px',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 11, background: avatar,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontFamily: P.display, fontWeight: 700, fontSize: 13,
      }}>{initials}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: P.body, fontSize: 14, fontWeight: 600, color: '#fff' }}>{client}</div>
        <div style={{ fontFamily: P.body, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
          Aujourd'hui · {when} · {amount}
        </div>
      </div>
      <div style={{
        background: 'rgba(197,248,74,0.15)', color: P.lime,
        padding: '5px 10px', borderRadius: 999,
        fontFamily: P.display, fontWeight: 700, fontSize: 12,
      }}>{pts}</div>
    </div>
  );
}

// 10) GÉNÉRATION QR ──────────────────────────────────────────
function GenerationQRScreen() {
  return (
    <IOSDevice dark>
      <Screen bg={P.ink} padTop={62}>
        <div style={{ padding: '0 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* top bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginTop: 8,
          }}>
            <button style={{
              width: 44, height: 44, borderRadius: 14,
              background: 'rgba(255,255,255,0.08)',
              boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.12)',
              border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <path d="M15 6l-6 6 6 6"/>
              </svg>
            </button>
            <div style={{
              fontFamily: P.display, fontSize: 17, fontWeight: 700, color: '#fff',
            }}>Nouveau QR Code</div>
            <div style={{ width: 44 }}/>
          </div>

          {/* amount input */}
          <div style={{ marginTop: 24 }}>
            <div style={{
              fontFamily: P.body, fontSize: 12, fontWeight: 600,
              color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: 0.4,
            }}>Montant de l'achat</div>
            <div style={{
              marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 6,
            }}>
              <div style={{
                fontFamily: P.display, fontSize: 64, fontWeight: 700,
                color: '#fff', letterSpacing: -3, lineHeight: 1,
              }}>8,00</div>
              <div style={{
                fontFamily: P.display, fontSize: 32, fontWeight: 700, color: P.lime,
              }}>€</div>
            </div>
            <div style={{
              marginTop: 6, fontFamily: P.body, fontSize: 13,
              color: 'rgba(255,255,255,0.6)',
            }}>
              soit <b style={{ color: P.lime }}>+ 64 points</b> pour le client (8 pts / €)
            </div>
          </div>

          {/* QR code card */}
          <div style={{
            marginTop: 24, background: '#fff', borderRadius: 28, padding: 20,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            }}>
              <div>
                <PointifyWordmark size={14}/>
                <div style={{
                  marginTop: 2, fontFamily: P.body, fontSize: 11, color: P.inkMuted,
                }}>Crêperie du Quartier Latin</div>
              </div>
              <div style={{
                background: P.ink, color: '#fff',
                padding: '6px 10px', borderRadius: 999,
                fontFamily: P.mono, fontSize: 11, fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: 3, background: P.lime,
                }}/>
                EXP. 00:47
              </div>
            </div>

            {/* QR code (pseudo, dot grid) */}
            <div style={{
              marginTop: 18, aspectRatio: '1 / 1', borderRadius: 16,
              padding: 14, position: 'relative',
              background: '#fff', boxShadow: `inset 0 0 0 2px ${P.line}`,
            }}>
              <QRGrid/>
              {/* center logo */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 52, height: 52, borderRadius: 14, background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              }}>
                <PointifyMark size={36}/>
              </div>
            </div>

            {/* countdown */}
            <div style={{
              marginTop: 16, padding: 12, borderRadius: 14,
              background: P.cream,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{ position: 'relative', width: 36, height: 36 }}>
                <svg width="36" height="36" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="18" cy="18" r="15" fill="none" stroke={P.line} strokeWidth="3"/>
                  <circle cx="18" cy="18" r="15" fill="none" stroke={P.violet} strokeWidth="3"
                    strokeDasharray="94.2" strokeDashoffset="20" strokeLinecap="round"/>
                </svg>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontFamily: P.mono, fontSize: 10, fontWeight: 700, color: P.ink,
                }}>47s</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: P.body, fontSize: 13, fontWeight: 600, color: P.ink }}>
                  Le client doit scanner avant expiration
                </div>
                <div style={{ fontFamily: P.body, fontSize: 11, color: P.inkMuted, marginTop: 1 }}>
                  Le code se renouvelle automatiquement
                </div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, minHeight: 16 }}/>

          {/* footer actions */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 30 }}>
            <button style={{
              width: 56, height: 56, borderRadius: 18,
              background: 'rgba(255,255,255,0.08)',
              boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.12)',
              border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-9 9z"/>
                <path d="M3 12h6m6 0h6M12 3v6m0 6v6"/>
              </svg>
            </button>
            <PButton color={P.lime} fg={P.ink} style={{ flex: 1, width: 'auto' }}>
              Régénérer
            </PButton>
          </div>
        </div>
      </Screen>
    </IOSDevice>
  );
}

// Pseudo QR grid (decorative — 21x21 with corner finders + random-ish modules)
function QRGrid() {
  // deterministic pseudo-random pattern (no hooks)
  const SIZE = 21;
  const isFinder = (x, y) =>
    (x < 7 && y < 7) || (x >= SIZE - 7 && y < 7) || (x < 7 && y >= SIZE - 7);
  const finderModule = (x, y) => {
    let lx = x, ly = y;
    if (x >= SIZE - 7) lx = x - (SIZE - 7);
    if (y >= SIZE - 7) ly = y - (SIZE - 7);
    // outer ring 7x7
    const onOuter = lx === 0 || lx === 6 || ly === 0 || ly === 6;
    const inMiddle = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4;
    return onOuter || inMiddle;
  };
  const cells = [];
  // simple LCG for pseudo-random data modules
  let seed = 7;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      let on = false;
      if (isFinder(x, y)) on = finderModule(x, y);
      else on = rnd() > 0.5;
      // hide cells under center logo region (~rows 9-12)
      const inCenter = x >= 8 && x <= 12 && y >= 8 && y <= 12;
      cells.push({ x, y, on: on && !inCenter });
    }
  }
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'grid',
      gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
      gridTemplateRows: `repeat(${SIZE}, 1fr)`,
      gap: 0,
    }}>
      {cells.map((c, i) => (
        <div key={i} style={{
          background: c.on ? P.ink : 'transparent',
          borderRadius: 1.5,
        }}/>
      ))}
    </div>
  );
}

Object.assign(window, {
  DashboardCommercantScreen, GenerationQRScreen,
});
