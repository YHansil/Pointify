// Pointify — Écrans complémentaires Étudiant

// 11) PROFIL ÉTUDIANT ────────────────────────────────────────
function ProfilEtudiantScreen() {
  return (
    <IOSDevice>
      <Screen padTop={56}>
        <div style={{ flex: 1, overflow: 'hidden', paddingBottom: 90 }}>
          {/* header */}
          <div style={{
            padding: '14px 22px 0', display: 'flex',
            alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{
              fontFamily: P.display, fontSize: 22, fontWeight: 700,
              color: P.ink, letterSpacing: -0.7,
            }}>Mon profil</div>
            <div style={{
              width: 40, height: 40, borderRadius: 12, background: '#fff',
              boxShadow: `inset 0 0 0 1.5px ${P.line}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={P.ink} strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </div>
          </div>

          {/* identity card */}
          <div style={{ padding: '18px 22px 0' }}>
            <div style={{
              background: '#fff', borderRadius: 24, padding: 18,
              boxShadow: `inset 0 0 0 1px ${P.line}`,
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 20,
                background: `linear-gradient(135deg, ${P.violet}, ${P.violetDeep})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontFamily: P.display, fontWeight: 700, fontSize: 24,
                letterSpacing: -0.8,
              }}>MD</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: P.display, fontSize: 20, fontWeight: 700,
                  color: P.ink, letterSpacing: -0.5,
                }}>Marie Durand</div>
                <div style={{
                  fontFamily: P.body, fontSize: 12, color: P.inkMuted, marginTop: 2,
                }}>marie.durand@univ-paris.fr</div>
                <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                  <PChip bg={P.violetTint} fg={P.violet}>🎓 Sorbonne</PChip>
                  <PChip bg="#FFF6DD" fg="#A67400">⭐ Gold</PChip>
                </div>
              </div>
            </div>
          </div>

          {/* stats row */}
          <div style={{ padding: '12px 22px 0' }}>
            <div style={{
              background: P.ink, color: '#fff', borderRadius: 20, padding: '16px 18px',
              display: 'flex', justifyContent: 'space-between', gap: 8,
            }}>
              <ProfileStat value="1 248" label="Points" hl/>
              <Sep/>
              <ProfileStat value="42" label="Scans"/>
              <Sep/>
              <ProfileStat value="6" label="Récomp."/>
              <Sep/>
              <ProfileStat value="3" label="Badges"/>
            </div>
          </div>

          {/* badges */}
          <div style={{ padding: '22px 22px 0' }}>
            <SectionHeader title="Tes badges" link="Voir tout"/>
            <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
              <BadgeChip emoji="🔥" name="En feu" sub="7 jours" earned/>
              <BadgeChip emoji="🍔" name="Foodie" sub="20 scans"earned/>
              <BadgeChip emoji="🥇" name="Top 100" sub="Campus" earned/>
              <BadgeChip emoji="🦋" name="Explorer" sub="5/10" />
            </div>
          </div>

          {/* settings */}
          <div style={{ padding: '22px 22px 0' }}>
            <SectionHeader title="Paramètres"/>
            <div style={{
              background: '#fff', borderRadius: 20, marginTop: 10,
              boxShadow: `inset 0 0 0 1px ${P.line}`,
            }}>
              <SettingRow icon="🔔" label="Notifications" hint="Toutes activées"/>
              <SettingRow icon="🎓" label="Mon université" hint="Sorbonne"/>
              <SettingRow icon="🔒" label="Confidentialité"/>
              <SettingRow icon="💬" label="Aide et support"/>
              <SettingRow icon="↪️" label="Se déconnecter" danger last/>
            </div>
          </div>
          <div style={{ height: 30 }}/>
        </div>
        <PTabBar active="me"/>
      </Screen>
    </IOSDevice>
  );
}

function ProfileStat({ value, label, hl }) {
  return (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <div style={{
        fontFamily: P.display, fontSize: 22, fontWeight: 700,
        color: hl ? P.lime : '#fff', letterSpacing: -0.6, lineHeight: 1,
      }}>{value}</div>
      <div style={{
        marginTop: 4, fontFamily: P.body, fontSize: 11,
        color: 'rgba(255,255,255,0.6)',
      }}>{label}</div>
    </div>
  );
}
function Sep() {
  return <div style={{ width: 1, background: 'rgba(255,255,255,0.12)' }}/>;
}

function BadgeChip({ emoji, name, sub, earned }) {
  return (
    <div style={{
      flex: 1, background: earned ? '#fff' : P.cream,
      boxShadow: earned ? `inset 0 0 0 1px ${P.line}` : `inset 0 0 0 1px ${P.line}`,
      borderRadius: 16, padding: '12px 8px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 4, opacity: earned ? 1 : 0.5,
    }}>
      <div style={{ fontSize: 24 }}>{emoji}</div>
      <div style={{
        fontFamily: P.display, fontSize: 12, fontWeight: 700,
        color: P.ink, letterSpacing: -0.2,
      }}>{name}</div>
      <div style={{ fontFamily: P.body, fontSize: 10, color: P.inkMuted }}>{sub}</div>
    </div>
  );
}

function SettingRow({ icon, label, hint, danger, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
      borderBottom: last ? 'none' : `1px solid ${P.line}`,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 11, background: danger ? '#FFEBEB' : P.cream,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
      }}>{icon}</div>
      <div style={{
        flex: 1, fontFamily: P.body, fontSize: 15, fontWeight: 600,
        color: danger ? '#D63232' : P.ink,
      }}>{label}</div>
      {hint && <div style={{ fontFamily: P.body, fontSize: 12, color: P.inkMuted }}>{hint}</div>}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.inkMuted} strokeWidth="2.5">
        <path d="M9 6l6 6-6 6"/>
      </svg>
    </div>
  );
}

// 12) DÉTAIL COMMERCE ────────────────────────────────────────
function DetailCommerceScreen() {
  return (
    <IOSDevice>
      <Screen padTop={0}>
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {/* hero image */}
          <div style={{
            height: 260, background: `linear-gradient(150deg, #3D2BB8, #5B47E5 60%, #7E63F0)`,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(80% 60% at 80% 30%, rgba(197,248,74,0.25), transparent)`,
            }}/>
            <div style={{
              position: 'absolute', bottom: -30, right: -10, fontSize: 220, opacity: 0.85,
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))',
            }}>🍔</div>

            {/* status bar dark text → keep status bar dark*/}
            {/* top bar */}
            <div style={{
              position: 'absolute', top: 56, left: 0, right: 0,
              display: 'flex', justifyContent: 'space-between', padding: '16px 22px',
            }}>
              <button style={{
                width: 44, height: 44, borderRadius: 14,
                background: 'rgba(255,255,255,0.92)', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={P.ink} strokeWidth="2.5">
                  <path d="M15 6l-6 6 6 6"/>
                </svg>
              </button>
              <button style={{
                width: 44, height: 44, borderRadius: 14,
                background: 'rgba(255,255,255,0.92)', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={P.ink} strokeWidth="2">
                  <path d="M19 14c1.5-4.5-3.5-9.5-7-9-3.5-.5-8.5 4.5-7 9 1 3 8 7 7 7s6-4 7-7z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* content sheet */}
          <div style={{
            background: P.cream, marginTop: -28, borderTopLeftRadius: 28, borderTopRightRadius: 28,
            position: 'relative', minHeight: 400, paddingBottom: 100,
          }}>
            <div style={{ padding: '20px 22px 0' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <PChip bg={P.violetTint} fg={P.violet}>Food truck</PChip>
                  <div style={{
                    marginTop: 8, fontFamily: P.display, fontSize: 26,
                    fontWeight: 700, color: P.ink, letterSpacing: -0.9, lineHeight: 1.05,
                  }}>Truck & Burger</div>
                  <div style={{
                    marginTop: 6, display: 'flex', alignItems: 'center', gap: 10,
                    fontFamily: P.body, fontSize: 13, color: P.inkSoft,
                  }}>
                    <span>⭐ <b style={{ color: P.ink }}>4.8</b> · 124 avis</span>
                    <span>·</span>
                    <span>📍 50m</span>
                    <span>·</span>
                    <span style={{ color: '#0F8A4B', fontWeight: 600 }}>● Ouvert</span>
                  </div>
                </div>
                <div style={{
                  background: P.lime, color: P.ink, padding: '8px 12px', borderRadius: 12,
                  fontFamily: P.display, fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap',
                }}>+8 pts / €</div>
              </div>

              <div style={{
                marginTop: 16, fontFamily: P.body, fontSize: 14, color: P.inkSoft, lineHeight: 1.55,
              }}>
                Burgers maison cuisinés sur place avec des produits frais.
                Garé devant la fac, du lundi au vendredi, 11h–15h.
              </div>

              {/* horaires/info quick stats */}
              <div style={{
                marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 8,
              }}>
                <InfoTile icon="🕐" title="11:00–15:00" sub="Lun–Ven"/>
                <InfoTile icon="📍" title="Cour B" sub="à 50m"/>
                <InfoTile icon="💳" title="CB / Espèces" sub="Pas de tickets resto"/>
              </div>

              {/* récompenses */}
              <div style={{ marginTop: 22 }}>
                <SectionHeader title="Récompenses disponibles" link="Tout voir"/>
              </div>
            </div>

            <div style={{ marginTop: 12, padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <DetailRewardRow tag="🍔" name="Menu burger + frites" pts={1500} canRedeem desc="Burger + frites + boisson"/>
              <DetailRewardRow tag="🍟" name="-20% sur ton menu" pts={600} canRedeem desc="Sur tout le menu"/>
              <DetailRewardRow tag="🥤" name="Boisson offerte" pts={300} canRedeem desc="Au choix"/>
              <DetailRewardRow tag="👕" name="T-shirt Truck & Burger" pts={2500} desc="Edition limitée"/>
            </div>
          </div>

          {/* sticky CTA */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '14px 22px 30px', background: 'linear-gradient(to top, #FAF7F2 70%, transparent)',
          }}>
            <PButton color={P.violet}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3M7 12h10"/>
                </svg>
              }
            >
              Scanner ici
            </PButton>
          </div>
        </div>
      </Screen>
    </IOSDevice>
  );
}

function InfoTile({ icon, title, sub }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 14, padding: '10px 12px',
      boxShadow: `inset 0 0 0 1px ${P.line}`,
    }}>
      <div style={{ fontSize: 16 }}>{icon}</div>
      <div style={{
        marginTop: 4, fontFamily: P.body, fontSize: 12, fontWeight: 700, color: P.ink,
      }}>{title}</div>
      <div style={{ fontFamily: P.body, fontSize: 10, color: P.inkMuted }}>{sub}</div>
    </div>
  );
}

function DetailRewardRow({ tag, name, pts, desc, canRedeem }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 18, padding: 14,
      boxShadow: `inset 0 0 0 1px ${P.line}`,
      display: 'flex', alignItems: 'center', gap: 14,
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 14, background: P.violetTint,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
      }}>{tag}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: P.body, fontSize: 14, fontWeight: 700, color: P.ink }}>{name}</div>
        <div style={{ fontFamily: P.body, fontSize: 11, color: P.inkMuted, marginTop: 1 }}>{desc}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{
          fontFamily: P.display, fontSize: 14, fontWeight: 700,
          color: canRedeem ? P.violet : P.inkMuted,
        }}>{pts} pts</div>
        <div style={{
          marginTop: 4, fontFamily: P.body, fontSize: 11, fontWeight: 700,
          color: canRedeem ? P.violet : P.inkMuted,
        }}>{canRedeem ? 'Échanger →' : '🔒'}</div>
      </div>
    </div>
  );
}

// 13) HISTORIQUE COMPLET ─────────────────────────────────────
function HistoriqueScreen() {
  const days = [
    {
      label: "AUJOURD'HUI · 27 mai",
      items: [
        { name: 'Truck & Burger', when: '12:42', amount: '+64 pts', sub: '8,00 €', tag: '🍔', color: '#3D2BB8', pos: true },
        { name: 'Pain & Co', when: '08:15', amount: '−500 pts', sub: 'Croissant offert', tag: '🥐', color: '#16162B', pos: false },
      ],
    },
    {
      label: "HIER · 26 mai",
      items: [
        { name: 'La Crêperie', when: '16:20', amount: '+28 pts', sub: '5,50 €', tag: '🥞', color: '#FF8B5C', pos: true },
        { name: 'Le Bar à Salades', when: '12:48', amount: '+72 pts', sub: '12,00 €', tag: '🥗', color: '#0F8A4B', pos: true },
      ],
    },
    {
      label: "MAR. 25 mai",
      items: [
        { name: 'Truck & Burger', when: '13:10', amount: '+56 pts', sub: '7,00 €', tag: '🍔', color: '#3D2BB8', pos: true },
        { name: 'Récompense', when: '11:00', amount: '−250 pts', sub: 'Café offert · Pain & Co', tag: '🎁', color: P.violet, pos: false },
        { name: 'Pain & Co', when: '08:22', amount: '+15 pts', sub: '5,00 €', tag: '🥐', color: '#16162B', pos: true },
      ],
    },
    {
      label: "LUN. 24 mai",
      items: [
        { name: 'Le Bar à Salades', when: '12:30', amount: '+60 pts', sub: '10,00 €', tag: '🥗', color: '#0F8A4B', pos: true },
      ],
    },
  ];

  return (
    <IOSDevice>
      <Screen padTop={56}>
        <div style={{ flex: 1, overflow: 'hidden', paddingBottom: 90 }}>
          {/* header */}
          <div style={{ padding: '14px 22px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{
                  fontFamily: P.display, fontSize: 26, fontWeight: 700,
                  color: P.ink, letterSpacing: -0.9, lineHeight: 1.1,
                }}>Historique</div>
                <div style={{
                  marginTop: 2, fontFamily: P.body, fontSize: 13, color: P.inkSoft,
                }}>Tous tes points et échanges</div>
              </div>
              <div style={{
                width: 40, height: 40, borderRadius: 12, background: '#fff',
                boxShadow: `inset 0 0 0 1.5px ${P.line}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={P.ink} strokeWidth="2">
                  <path d="M3 6h18M6 12h12M10 18h4"/>
                </svg>
              </div>
            </div>
          </div>

          {/* summary */}
          <div style={{ padding: '14px 22px 0' }}>
            <div style={{
              background: '#fff', borderRadius: 20, padding: '14px 16px',
              boxShadow: `inset 0 0 0 1px ${P.line}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontFamily: P.body, fontSize: 11, color: P.inkMuted }}>30 derniers jours</div>
                <div style={{
                  marginTop: 2, fontFamily: P.display, fontSize: 22, fontWeight: 700,
                  color: P.ink, letterSpacing: -0.5,
                }}>+ 1 482 pts <span style={{
                  fontFamily: P.body, fontSize: 12, color: P.inkSoft, fontWeight: 500,
                }}>/ − 750</span></div>
              </div>
              <div style={{
                background: P.violetTint, color: P.violet,
                fontFamily: P.display, fontWeight: 700, fontSize: 13,
                padding: '6px 10px', borderRadius: 10,
              }}>↗ +18%</div>
            </div>
          </div>

          {/* filter pills */}
          <div style={{
            display: 'flex', gap: 8, padding: '14px 22px 0', overflowX: 'auto',
          }}>
            {['Tout', 'Achats', 'Récompenses', 'Bonus'].map((c, i) => (
              <div key={c} style={{
                flexShrink: 0, height: 32, padding: '0 14px', borderRadius: 999,
                background: i === 0 ? P.ink : '#fff',
                color: i === 0 ? '#fff' : P.inkSoft,
                boxShadow: i === 0 ? 'none' : `inset 0 0 0 1px ${P.line}`,
                fontFamily: P.body, fontSize: 13, fontWeight: 600,
                display: 'flex', alignItems: 'center',
              }}>{c}</div>
            ))}
          </div>

          {/* day groups */}
          <div style={{ padding: '14px 22px 0', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {days.map(d => (
              <div key={d.label}>
                <div style={{
                  fontFamily: P.body, fontSize: 11, fontWeight: 700,
                  color: P.inkMuted, letterSpacing: 0.6, marginBottom: 8,
                }}>{d.label}</div>
                <div style={{
                  background: '#fff', borderRadius: 18,
                  boxShadow: `inset 0 0 0 1px ${P.line}`,
                }}>
                  {d.items.map((t, i) => (
                    <HistoRow key={i} {...t} last={i === d.items.length - 1}/>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <PTabBar active="home"/>
      </Screen>
    </IOSDevice>
  );
}

function HistoRow({ name, when, amount, sub, tag, color, pos, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
      borderBottom: last ? 'none' : `1px solid ${P.line}`,
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 12, background: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
      }}>{tag}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: P.body, fontSize: 14, fontWeight: 600, color: P.ink,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{name}</div>
        <div style={{ fontFamily: P.body, fontSize: 11, color: P.inkMuted, marginTop: 1 }}>
          {when} · {sub}
        </div>
      </div>
      <div style={{
        fontFamily: P.display, fontSize: 14, fontWeight: 700,
        color: pos ? P.violet : P.ink,
      }}>{amount}</div>
    </div>
  );
}

// 14) DÉTAIL RÉCOMPENSE / ÉCHANGE ────────────────────────────
function DetailRecompenseScreen() {
  return (
    <IOSDevice>
      <Screen bg="#fff" padTop={62}>
        <div style={{ padding: '0 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* top */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8,
          }}>
            <button style={{
              width: 44, height: 44, borderRadius: 14, background: '#fff',
              boxShadow: `inset 0 0 0 1.5px ${P.line}`, border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={P.ink} strokeWidth="2.5">
                <path d="M15 6l-6 6 6 6"/>
              </svg>
            </button>
            <button style={{
              width: 44, height: 44, borderRadius: 14, background: '#fff',
              boxShadow: `inset 0 0 0 1.5px ${P.line}`, border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={P.ink} strokeWidth="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v14"/>
              </svg>
            </button>
          </div>

          {/* hero */}
          <div style={{ marginTop: 18 }}>
            <div style={{
              borderRadius: 28, padding: '30px 20px 26px', position: 'relative', overflow: 'hidden',
              background: `radial-gradient(80% 70% at 30% 20%, #FFE9DC 0%, #FFD2B0 100%)`,
              height: 260,
            }}>
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 180,
                filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.18))',
              }}>🥞</div>
              <div style={{ position: 'absolute', top: 18, left: 18 }}>
                <PChip bg="#fff" fg={P.ink}>⭐ Disponible</PChip>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 22 }}>
            <div style={{
              fontFamily: P.body, fontSize: 12, fontWeight: 600,
              color: P.inkMuted, letterSpacing: 0.4, textTransform: 'uppercase',
            }}>La Crêperie · Crêpes</div>
            <div style={{
              marginTop: 6, fontFamily: P.display, fontSize: 28, fontWeight: 700,
              color: P.ink, letterSpacing: -1, lineHeight: 1.1,
            }}>1 crêpe sucrée<br/>au choix offerte</div>
            <div style={{
              marginTop: 12, fontFamily: P.body, fontSize: 14,
              color: P.inkSoft, lineHeight: 1.5,
            }}>
              Choisis parmi 8 garnitures sucrées : chocolat, sucre, citron,
              confiture, chantilly… Présente le code généré au comptoir.
            </div>
          </div>

          {/* metadata */}
          <div style={{
            marginTop: 18, padding: 14, borderRadius: 16, background: P.cream,
            display: 'flex', justifyContent: 'space-between', gap: 8,
          }}>
            <MetaCell icon="⏰" label="Validité" value="30 jours"/>
            <MetaCell icon="📦" label="Stock" value="42 restant"/>
            <MetaCell icon="🏪" label="Lieu" value="Sur place"/>
          </div>

          <div style={{ flex: 1, minHeight: 12 }}/>

          {/* sticky CTA */}
          <div style={{ marginBottom: 30 }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 18px', background: P.ink, borderRadius: 22, marginBottom: 10,
            }}>
              <div>
                <div style={{
                  fontFamily: P.body, fontSize: 11, color: 'rgba(255,255,255,0.6)',
                }}>Coût</div>
                <div style={{
                  marginTop: 2, fontFamily: P.display, fontSize: 22, fontWeight: 700, color: '#fff',
                  letterSpacing: -0.6,
                }}>400 <span style={{ color: P.lime, fontSize: 14 }}>pts</span></div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: P.body, fontSize: 11, color: 'rgba(255,255,255,0.6)',
                }}>Tu auras</div>
                <div style={{
                  marginTop: 2, fontFamily: P.display, fontSize: 22, fontWeight: 700, color: '#fff',
                  letterSpacing: -0.6,
                }}>848 <span style={{ color: P.lime, fontSize: 14 }}>pts</span></div>
              </div>
            </div>
            <PButton>Échanger maintenant</PButton>
          </div>
        </div>
      </Screen>
    </IOSDevice>
  );
}

function MetaCell({ icon, label, value }) {
  return (
    <div style={{ flex: 1, textAlign: 'left' }}>
      <div style={{ fontSize: 16 }}>{icon}</div>
      <div style={{
        marginTop: 4, fontFamily: P.body, fontSize: 10,
        color: P.inkMuted, textTransform: 'uppercase', letterSpacing: 0.4,
      }}>{label}</div>
      <div style={{
        marginTop: 2, fontFamily: P.body, fontSize: 13, fontWeight: 700, color: P.ink,
      }}>{value}</div>
    </div>
  );
}

// 15) ÉCHANGE RÉUSSI ─────────────────────────────────────────
function EchangeReussiScreen() {
  return (
    <IOSDevice>
      <div style={{
        width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
        background: `radial-gradient(120% 60% at 50% 0%, ${P.violet} 0%, ${P.violetDeep} 50%, ${P.ink} 100%)`,
      }}>
        {/* confetti */}
        {[...Array(20)].map((_, i) => {
          const cs = ['#C5F84A', '#FF8B5C', '#fff', '#FFD66B'];
          const left = (i * 53 + 11) % 100;
          const top = (i * 71 + 19) % 60;
          const rot = (i * 37) % 360;
          const sz = 6 + (i % 4) * 3;
          const round = i % 3 === 0;
          return (
            <div key={i} style={{
              position: 'absolute', left: `${left}%`, top: `${top}%`,
              width: sz, height: sz * (round ? 1 : 0.5),
              background: cs[i % 4], borderRadius: round ? '50%' : 1,
              transform: `rotate(${rot}deg)`, opacity: 0.85,
            }}/>
          );
        })}

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: '0 22px',
        }}>
          {/* big check */}
          <div style={{
            width: 132, height: 132, borderRadius: 38,
            background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
            transform: 'rotate(-4deg)',
          }}>
            <div style={{
              width: 96, height: 96, borderRadius: 28, background: P.lime,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={P.ink} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L20 7"/>
              </svg>
            </div>
          </div>

          <div style={{
            marginTop: 28, fontFamily: P.display, fontSize: 36, fontWeight: 700,
            color: '#fff', letterSpacing: -1.3, textAlign: 'center', lineHeight: 1.05,
          }}>Récompense<br/>obtenue !</div>
          <div style={{
            marginTop: 10, fontFamily: P.body, fontSize: 15,
            color: 'rgba(255,255,255,0.75)', textAlign: 'center', lineHeight: 1.45,
            maxWidth: 280,
          }}>
            Présente ce code au comptoir de La Crêperie pour récupérer ta crêpe.
          </div>

          {/* code */}
          <div style={{
            marginTop: 24, background: '#fff', borderRadius: 22, padding: '16px 24px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              fontFamily: P.mono, fontSize: 28, fontWeight: 700,
              color: P.ink, letterSpacing: 4,
            }}>P-4A2X9</div>
            <div style={{
              width: 1, height: 28, background: P.line,
            }}/>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={P.inkSoft} strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </div>
        </div>

        {/* buttons */}
        <div style={{
          position: 'absolute', bottom: 30, left: 22, right: 22,
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <PButton color={P.lime} fg={P.ink}>Voir mes récompenses</PButton>
          <PButton ghost color="rgba(255,255,255,0.1)" fg="#fff" style={{
            background: 'rgba(255,255,255,0.08)',
            boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.18)',
            color: '#fff',
          }}>Continuer</PButton>
        </div>
      </div>
    </IOSDevice>
  );
}

Object.assign(window, {
  ProfilEtudiantScreen, DetailCommerceScreen, HistoriqueScreen,
  DetailRecompenseScreen, EchangeReussiScreen,
});
