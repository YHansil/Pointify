// Pointify — design tokens + shared atoms
const P = {
  // palette
  violet: '#5B47E5',
  violetDeep: '#3D2BB8',
  violetTint: '#EDE9FE',
  lime: '#C5F84A',
  limeDeep: '#9FD420',
  cream: '#FAF7F2',
  paper: '#FFFFFF',
  ink: '#16162B',
  inkSoft: '#4A4A65',
  inkMuted: '#8A8AA0',
  line: '#ECEAE3',
  // fonts
  display: '"Bricolage Grotesque", "DM Sans", system-ui, sans-serif',
  body: '"DM Sans", "Helvetica Neue", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

// Pointify logo mark — a stylized "P" composed of a pin + dot (point/loyalty)
function PointifyMark({ size = 48, color = P.violet, dotColor = P.lime }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M10 8h18a12 12 0 0 1 0 24h-8v8H10V8z" fill={color}/>
      <circle cx="20" cy="20" r="4" fill={dotColor}/>
    </svg>
  );
}

function PointifyWordmark({ size = 22, color = P.ink, dotColor = P.violet }) {
  return (
    <div style={{
      fontFamily: P.display, fontWeight: 700, fontSize: size,
      letterSpacing: -0.6, color, display: 'inline-flex', alignItems: 'baseline',
    }}>
      Pointify<span style={{ color: dotColor, marginLeft: 1 }}>.</span>
    </div>
  );
}

// Primary CTA button
function PButton({ children, color = P.violet, fg = '#fff', icon, ghost, full = true, onClick, style }) {
  return (
    <button onClick={onClick} style={{
      width: full ? '100%' : 'auto',
      height: 56, borderRadius: 18, border: 'none',
      background: ghost ? 'transparent' : color,
      color: ghost ? P.ink : fg,
      fontFamily: P.body, fontSize: 17, fontWeight: 600,
      letterSpacing: -0.2, cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      boxShadow: ghost ? `inset 0 0 0 1.5px ${P.line}` : `0 8px 20px -8px ${color}88`,
      ...style,
    }}>{icon}{children}</button>
  );
}

// Input field — mock (no interaction; just the shape)
function PField({ label, value, placeholder, type = 'text', icon }) {
  return (
    <label style={{ display: 'block' }}>
      <div style={{
        fontFamily: P.body, fontSize: 13, fontWeight: 500,
        color: P.inkSoft, marginBottom: 8, letterSpacing: -0.1,
      }}>{label}</div>
      <div style={{
        height: 56, borderRadius: 16, background: '#fff',
        boxShadow: `inset 0 0 0 1.5px ${P.line}`,
        display: 'flex', alignItems: 'center', padding: '0 18px', gap: 10,
      }}>
        {icon}
        <span style={{
          fontFamily: P.body, fontSize: 16, fontWeight: value ? 500 : 400,
          color: value ? P.ink : P.inkMuted, flex: 1,
          textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
        }}>{value || placeholder}</span>
        {type === 'password' && value && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={P.inkMuted} strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        )}
      </div>
    </label>
  );
}

// Subtle screen background w/ noise-free soft glow
function Screen({ children, bg = P.cream, padTop = 0, padBottom = 0 }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: bg,
      paddingTop: padTop, paddingBottom: padBottom, boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column',
    }}>{children}</div>
  );
}

// Tab bar (étudiant)
function PTabBar({ active = 'home' }) {
  const items = [
    { id: 'home', label: 'Accueil', icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M3 11l9-8 9 8v10a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2V11z"/></svg> },
    { id: 'scan', label: 'Scanner', icon: (c) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3M7 12h10"/></svg> },
    { id: 'rewards', label: 'Récompenses', icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg> },
    { id: 'me', label: 'Profil', icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg> },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 28, paddingTop: 10, background: '#fff',
      borderTop: `1px solid ${P.line}`,
      display: 'flex', justifyContent: 'space-around',
    }}>
      {items.map(it => {
        const isActive = it.id === active;
        const c = isActive ? P.violet : P.inkMuted;
        return (
          <div key={it.id} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          }}>
            {it.icon(c)}
            <span style={{
              fontFamily: P.body, fontSize: 10, fontWeight: isActive ? 600 : 500,
              color: c, letterSpacing: -0.1,
            }}>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// Tab bar (commerçant) — different items
function PTabBarMerchant({ active = 'home' }) {
  const items = [
    { id: 'home', label: 'Accueil', icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M3 11l9-8 9 8v10a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2V11z"/></svg> },
    { id: 'qr', label: 'QR Code', icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v7M17 21h4M14 17h3"/></svg> },
    { id: 'stats', label: 'Stats', icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M3 21V10M9 21V4M15 21v-7M21 21v-12"/></svg> },
    { id: 'me', label: 'Boutique', icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M3 9l1.5-5h15L21 9M3 9v11h18V9M3 9h18M8 13h8"/></svg> },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 28, paddingTop: 10, background: P.ink,
      display: 'flex', justifyContent: 'space-around',
    }}>
      {items.map(it => {
        const isActive = it.id === active;
        const c = isActive ? P.lime : 'rgba(255,255,255,0.45)';
        return (
          <div key={it.id} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          }}>
            {it.icon(c)}
            <span style={{
              fontFamily: P.body, fontSize: 10, fontWeight: isActive ? 600 : 500,
              color: c, letterSpacing: -0.1,
            }}>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// Generic chip / pill
function PChip({ children, bg = P.violetTint, fg = P.violet, style }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      height: 28, padding: '0 12px', borderRadius: 999,
      background: bg, color: fg, fontFamily: P.body,
      fontSize: 12, fontWeight: 600, letterSpacing: -0.1, ...style,
    }}>{children}</span>
  );
}

// Small avatar circle for merchants (initials)
function MerchantAvatar({ name, color, size = 44 }) {
  const init = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: 14, background: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontFamily: P.display, fontWeight: 700, fontSize: size * 0.4,
      letterSpacing: -0.5,
    }}>{init}</div>
  );
}

Object.assign(window, {
  P, PointifyMark, PointifyWordmark, PButton, PField,
  Screen, PTabBar, PTabBarMerchant, PChip, MerchantAvatar,
});
