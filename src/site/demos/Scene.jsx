// Illustrated scenes for demos that have no photo. Pure SVG: no downloads, always sharp.
const W = '#fff'
const S = 'rgba(15,34,48,.26)'
const D = 'rgba(15,34,48,.35)'

const glyphs = {
  tooth: (<><path d="M60 26c-8-6-26-4-28 14-1 10 4 16 6 28 1 8 3 26 10 26 6 0 6-18 12-18s6 18 12 18c7 0 9-18 10-26 2-12 7-18 6-28-2-18-20-20-28-14z" fill={W} /><path d="M44 42c2-4 6-6 10-6" stroke={S} strokeWidth="5" strokeLinecap="round" fill="none" /></>),
  dumbbell: (<><rect x="30" y="55" width="60" height="10" rx="5" fill={S} /><rect x="16" y="38" width="16" height="44" rx="6" fill={W} /><rect x="88" y="38" width="16" height="44" rx="6" fill={W} /><rect x="32" y="46" width="11" height="28" rx="4" fill={W} /><rect x="77" y="46" width="11" height="28" rx="4" fill={W} /></>),
  scales: (<><rect x="56" y="28" width="8" height="64" rx="3" fill={W} /><rect x="36" y="90" width="48" height="9" rx="4" fill={W} /><rect x="22" y="34" width="76" height="7" rx="3" fill={W} /><path d="M26 41l-14 30h28z" fill={S} /><path d="M94 41l-14 30h28z" fill={S} /><path d="M12 71a14 8 0 0028 0z" fill={W} /><path d="M80 71a14 8 0 0028 0z" fill={W} /></>),
  hotel: (<><rect x="30" y="24" width="60" height="74" rx="6" fill={W} />{[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={38 + c * 17} y={32 + r * 17} width="10" height="11" rx="2" fill={S} />))}<rect x="52" y="78" width="16" height="20" rx="3" fill={D} /></>),
  construction: (<><path d="M24 78a36 36 0 0172 0z" fill={W} /><rect x="14" y="78" width="92" height="11" rx="5" fill={W} /><rect x="53" y="32" width="14" height="26" rx="5" fill={S} /><rect x="30" y="64" width="60" height="5" rx="2" fill={S} /></>),
  plane: (<><path d="M20 58l84-32-32 72-18-28z" fill={W} /><path d="M54 70l50-44" stroke={S} strokeWidth="5" strokeLinecap="round" fill="none" /></>),
  gem: (<><path d="M38 34h44l20 24-42 42-42-42z" fill={W} /><path d="M18 58h84M38 34l22 24 22-24M60 58v42" stroke={S} strokeWidth="4" strokeLinejoin="round" fill="none" /></>),
  calc: (<><rect x="30" y="20" width="60" height="80" rx="9" fill={W} /><rect x="38" y="29" width="44" height="17" rx="4" fill={S} />{[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={44 + c * 16} cy={58 + r * 14} r="4.5" fill={r === 2 && c === 2 ? D : S} />))}</>),
  truck: (<><rect x="12" y="44" width="58" height="38" rx="5" fill={W} /><path d="M70 54h20l16 16v12H70z" fill={W} /><path d="M78 60h10l9 9H78z" fill={S} /><circle cx="36" cy="88" r="10" fill={D} /><circle cx="90" cy="88" r="10" fill={D} /><circle cx="36" cy="88" r="4" fill={W} /><circle cx="90" cy="88" r="4" fill={W} /></>),
  heart: (<path d="M60 98C16 68 20 34 42 30c11-2 18 4 18 12 0-8 7-14 18-12 22 4 26 38-18 68z" fill={W} />),
  laptop: (<><rect x="20" y="26" width="80" height="56" rx="8" fill={W} /><rect x="20" y="26" width="80" height="12" rx="8" fill={S} /><rect x="28" y="46" width="30" height="28" rx="4" fill={S} /><rect x="64" y="46" width="28" height="8" rx="3" fill={S} /><rect x="64" y="60" width="20" height="8" rx="3" fill={S} /><rect x="10" y="88" width="100" height="7" rx="3.5" fill={W} /></>),
  leaf: (<><path d="M28 92C24 50 50 26 96 24c2 42-20 68-54 68z" fill={W} /><path d="M32 88C52 64 70 48 90 32" stroke={S} strokeWidth="4" strokeLinecap="round" fill="none" /></>),
  lotus: (<><path d="M60 24c13 15 13 42 0 58-13-16-13-43 0-58z" fill={W} /><path d="M30 42c20 2 31 20 30 40-20 0-32-16-30-40z" fill={S} /><path d="M90 42c-20 2-31 20-30 40 20 0 32-16 30-40z" fill={S} /><path d="M20 88c14 12 66 12 80 0" stroke={W} strokeWidth="6" strokeLinecap="round" fill="none" /></>),
  spray: (<><rect x="38" y="52" width="38" height="48" rx="9" fill={W} /><rect x="47" y="36" width="20" height="18" rx="4" fill={W} /><path d="M66 36h20l5 9H66z" fill={S} /><circle cx="98" cy="30" r="4" fill={W} /><circle cx="106" cy="44" r="3" fill={S} /><circle cx="94" cy="18" r="3" fill={S} /><rect x="46" y="64" width="22" height="16" rx="4" fill={S} /></>),
  bag: (<><path d="M32 40h56l6 56H26z" fill={W} /><path d="M46 52V42a14 14 0 0128 0v10" stroke={S} strokeWidth="6" strokeLinecap="round" fill="none" /></>),
  calendar: (<><rect x="22" y="28" width="76" height="70" rx="11" fill={W} /><path d="M22 40a11 11 0 0111-11h54a11 11 0 0111 11v10H22z" fill={S} /><rect x="38" y="20" width="6" height="16" rx="3" fill={W} /><rect x="76" y="20" width="6" height="16" rx="3" fill={W} />{[0, 1, 2].flatMap((r) => [0, 1, 2, 3].map((c) => <circle key={`${r}${c}`} cx={38 + c * 15} cy={62 + r * 13} r="4" fill={r === 1 && c === 2 ? D : S} />))}</>),
  chart: (<><rect x="24" y="64" width="16" height="32" rx="4" fill={S} /><rect x="46" y="46" width="16" height="50" rx="4" fill={W} /><rect x="68" y="56" width="16" height="40" rx="4" fill={S} /><rect x="90" y="30" width="16" height="66" rx="4" fill={W} /><rect x="16" y="100" width="96" height="5" rx="2.5" fill={W} /></>),
  user: (<><circle cx="60" cy="42" r="17" fill={W} /><path d="M26 98c2-22 15-32 34-32s32 10 34 32z" fill={W} /><rect x="76" y="72" width="26" height="22" rx="5" fill={D} /><path d="M82 72v-5a7 7 0 0114 0v5" stroke={W} strokeWidth="4" fill="none" /></>),
  phone: (<><rect x="36" y="14" width="48" height="92" rx="11" fill={W} /><rect x="43" y="28" width="34" height="58" rx="5" fill={S} /><circle cx="60" cy="96" r="4" fill={D} /><rect x="50" y="19" width="20" height="4" rx="2" fill={D} /></>),
  kanban: (<><rect x="16" y="26" width="26" height="68" rx="7" fill={S} /><rect x="47" y="26" width="26" height="68" rx="7" fill={S} /><rect x="78" y="26" width="26" height="68" rx="7" fill={S} /><rect x="20" y="33" width="18" height="14" rx="4" fill={W} /><rect x="20" y="52" width="18" height="14" rx="4" fill={W} /><rect x="51" y="33" width="18" height="14" rx="4" fill={W} /><rect x="82" y="33" width="18" height="14" rx="4" fill={W} /><rect x="82" y="52" width="18" height="14" rx="4" fill={W} /><rect x="82" y="71" width="18" height="14" rx="4" fill={W} /></>),
  invoice: (<><path d="M34 20h42l16 16v62a6 6 0 01-6 6H34a6 6 0 01-6-6V26a6 6 0 016-6z" fill={W} /><path d="M76 20v16h16" fill={S} /><rect x="38" y="46" width="44" height="5" rx="2.5" fill={S} /><rect x="38" y="58" width="44" height="5" rx="2.5" fill={S} /><rect x="38" y="70" width="26" height="5" rx="2.5" fill={S} /><circle cx="78" cy="86" r="9" fill={D} /><path d="M73 86l4 4 7-8" stroke={W} strokeWidth="3" fill="none" strokeLinecap="round" /></>),
  store: (<><path d="M22 52l8-24h60l8 24z" fill={W} /><rect x="26" y="52" width="68" height="44" rx="4" fill={S} /><rect x="50" y="68" width="22" height="28" rx="3" fill={W} /><path d="M22 52a12 10 0 0024 0 12 10 0 0024 0 12 10 0 0024 0z" fill={W} /></>),
  food: (<><circle cx="60" cy="62" r="32" fill={W} /><circle cx="60" cy="62" r="22" fill={S} /><path d="M14 30v24M20 30v24M26 30v24M20 54v38" stroke={W} strokeWidth="4" strokeLinecap="round" /><path d="M104 30c-8 6-8 24 0 28V92" stroke={W} strokeWidth="4" strokeLinecap="round" fill="none" /></>),
  camera: (<><rect x="18" y="38" width="84" height="56" rx="10" fill={W} /><rect x="44" y="28" width="32" height="14" rx="5" fill={W} /><circle cx="60" cy="66" r="19" fill={S} /><circle cx="60" cy="66" r="10" fill={W} /></>),
  ring: (<><circle cx="60" cy="72" r="26" fill="none" stroke={W} strokeWidth="9" /><path d="M48 34l12-14 12 14-12 14z" fill={W} /></>),
  house: (<><path d="M16 58L60 22l44 36z" fill={W} /><rect x="28" y="56" width="64" height="42" rx="3" fill={S} /><rect x="52" y="72" width="16" height="26" rx="3" fill={W} /></>),
  car: (<><path d="M16 74l10-24c2-4 6-6 10-6h48c4 0 8 2 10 6l10 24z" fill={W} /><rect x="12" y="70" width="96" height="22" rx="8" fill={W} /><circle cx="36" cy="92" r="10" fill={D} /><circle cx="84" cy="92" r="10" fill={D} /><path d="M34 52h22v18H28zM64 52h22l6 18H64z" fill={S} /></>),
  paw: (<><ellipse cx="60" cy="78" rx="22" ry="18" fill={W} /><ellipse cx="32" cy="52" rx="9" ry="12" fill={W} /><ellipse cx="50" cy="36" rx="9" ry="12" fill={W} /><ellipse cx="70" cy="36" rx="9" ry="12" fill={W} /><ellipse cx="88" cy="52" rx="9" ry="12" fill={W} /></>),
  book: (<><path d="M16 30c16-4 32-2 44 8v58C48 88 32 86 16 90z" fill={W} /><path d="M104 30c-16-4-32-2-44 8v58c12-10 28-12 44-8z" fill={S} /></>),
  cart: (<><path d="M14 30h14l12 48h46l10-34H34" stroke={W} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" /><circle cx="46" cy="94" r="8" fill={W} /><circle cx="82" cy="94" r="8" fill={W} /><rect x="44" y="50" width="14" height="14" rx="3" fill={S} /><rect x="62" y="50" width="14" height="14" rx="3" fill={S} /></>),
  scissors: (<><circle cx="36" cy="84" r="13" fill="none" stroke={W} strokeWidth="7" /><circle cx="84" cy="84" r="13" fill="none" stroke={W} strokeWidth="7" /><path d="M44 74L96 24M76 74L24 24" stroke={W} strokeWidth="7" strokeLinecap="round" /></>),
  hospital: (<><rect x="20" y="30" width="80" height="68" rx="8" fill={W} /><rect x="52" y="42" width="16" height="40" rx="3" fill={S} /><rect x="40" y="54" width="40" height="16" rx="3" fill={S} /><rect x="50" y="84" width="20" height="14" rx="3" fill={D} /></>),
  sofa: (<><rect x="18" y="52" width="84" height="32" rx="10" fill={W} /><rect x="26" y="38" width="68" height="24" rx="10" fill={S} /><rect x="24" y="84" width="8" height="12" rx="3" fill={W} /><rect x="88" y="84" width="8" height="12" rx="3" fill={W} /></>),
  rings: (<><circle cx="46" cy="66" r="24" fill="none" stroke={W} strokeWidth="8" /><circle cx="74" cy="66" r="24" fill="none" stroke={S} strokeWidth="8" /></>),
  bread: (<><path d="M24 86c-12-4-12-30 6-38 8-14 52-14 60 0 18 8 18 34 6 38z" fill={W} /><path d="M44 52l-6 14M60 50l-6 16M76 52l-6 14" stroke={S} strokeWidth="5" strokeLinecap="round" /></>),
}

const aliases = { bakery: 'bread', salon: 'scissors', fashion: 'bag', pets: 'paw', supermarket: 'cart' }

export function Glyph({ name, className = '' }) {
  const g = glyphs[aliases[name] || name] || glyphs.laptop
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      {g}
    </svg>
  )
}

export default function Scene({ glyph, pattern = 'circles', className = '' }) {
  return (
    <div className={`scene pat-${pattern} ${className}`} aria-hidden="true">
      <span className="scene-dot d1" />
      <span className="scene-dot d2" />
      <span className="scene-dot d3" />
      <span className="scene-card">
        <Glyph name={glyph} className="scene-glyph" />
      </span>
    </div>
  )
}
