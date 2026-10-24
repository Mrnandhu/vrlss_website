// Small built-in SVG flags (emoji flags show as plain letters on Windows/Linux). Simplified designs, 3:2 ratio.
const star = (cx, cy, r, fill) => {
  const p = []
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5
    const rr = i % 2 ? r * 0.42 : r
    p.push(`${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`)
  }
  return <polygon points={p.join(' ')} fill={fill} />
}

const union = (
  <g>
    <rect width="30" height="20" fill="#012169" />
    <path d="M0 0 30 20M30 0 0 20" stroke="#fff" strokeWidth="4" />
    <path d="M0 0 30 20M30 0 0 20" stroke="#C8102E" strokeWidth="1.5" />
    <path d="M15 0v20M0 10h30" stroke="#fff" strokeWidth="6" />
    <path d="M15 0v20M0 10h30" stroke="#C8102E" strokeWidth="3.4" />
  </g>
)

const flags = {
  IN: (
    <>
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="6.67" fill="#FF9933" />
      <rect y="13.33" width="30" height="6.67" fill="#138808" />
      <circle cx="15" cy="10" r="2.3" fill="none" stroke="#000080" strokeWidth=".6" />
      <circle cx="15" cy="10" r=".5" fill="#000080" />
    </>
  ),
  AE: (
    <>
      <rect width="30" height="6.67" fill="#00732F" />
      <rect y="6.67" width="30" height="6.67" fill="#fff" />
      <rect y="13.33" width="30" height="6.67" fill="#000" />
      <rect width="7.5" height="20" fill="#FF0000" />
    </>
  ),
  SA: (
    <>
      <rect width="30" height="20" fill="#006C35" />
      <path d="M8 7.5c2 1 4-.8 6 .2s4-.9 6 .1 2 .2 2 .2" fill="none" stroke="#fff" strokeWidth="1" />
      <path d="M9 12.8h12l1.5-.8" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
    </>
  ),
  QA: (
    <>
      <rect width="30" height="20" fill="#8A1538" />
      <path d="M0 0h9l2.5 1.11L9 2.22l2.5 1.11L9 4.44l2.5 1.11L9 6.67l2.5 1.11L9 8.89l2.5 1.11L9 11.11l2.5 1.11L9 13.33l2.5 1.11L9 15.56l2.5 1.11L9 17.78l2.5 1.11L9 20H0Z" fill="#fff" />
    </>
  ),
  GB: union,
  US: (
    <>
      <rect width="30" height="20" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => <rect key={i} y={i * 1.54} width="30" height="1.54" fill="#B22234" />)}
      <rect width="13" height="10.77" fill="#3C3B6E" />
      {[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4].map((c) => <circle key={`${r}${c}`} cx={1.5 + c * 2.5 + (r % 2) * 1.2} cy={1.6 + r * 2.5} r=".45" fill="#fff" />))}
    </>
  ),
  CA: (
    <>
      <rect width="30" height="20" fill="#fff" />
      <rect width="7.5" height="20" fill="#D52B1E" />
      <rect x="22.5" width="7.5" height="20" fill="#D52B1E" />
      <path d="M15 4.2l1 2 1.4-.5-.6 3 1.7-1.4.5 1 1.8-.3-.7 1.8.8.4-3.1 2.5.3 1.2-2.6-.4V16h-.9v-2.5l-2.6.4.3-1.2-3.1-2.5.8-.4-.7-1.8 1.8.3.5-1 1.7 1.4-.6-3 1.4.5Z" fill="#D52B1E" />
    </>
  ),
  AU: (
    <>
      <rect width="30" height="20" fill="#012169" />
      <g transform="scale(.5)">{union}</g>
      {star(7.5, 15, 2.2, '#fff')}
      {star(22.5, 4.5, 1.1, '#fff')}
      {star(19, 9.5, 1.1, '#fff')}
      {star(26, 8.5, 1.1, '#fff')}
      {star(22.5, 16, 1.1, '#fff')}
    </>
  ),
  SG: (
    <>
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="10" fill="#EF3340" />
      <circle cx="6.5" cy="5" r="3.2" fill="#fff" />
      <circle cx="7.7" cy="5" r="3" fill="#EF3340" />
      {[[9.6, 2.9], [11.4, 4], [10.8, 6], [8.6, 6], [8.1, 4]].map(([x, y]) => <g key={x}>{star(x, y, 0.6, '#fff')}</g>)}
    </>
  ),
  MY: (
    <>
      <rect width="30" height="20" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => <rect key={i} y={i * 1.43} width="30" height="1.43" fill="#CC0001" />)}
      <rect width="15" height="11.43" fill="#010066" />
      <circle cx="5.6" cy="5.7" r="3.6" fill="#FFCC00" />
      <circle cx="6.6" cy="5.7" r="3.1" fill="#010066" />
      {star(10.7, 5.7, 2.4, '#FFCC00')}
    </>
  ),
  DE: (
    <>
      <rect width="30" height="6.67" fill="#000" />
      <rect y="6.67" width="30" height="6.67" fill="#DD0000" />
      <rect y="13.33" width="30" height="6.67" fill="#FFCE00" />
    </>
  ),
  FR: (
    <>
      <rect width="10" height="20" fill="#002395" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#ED2939" />
    </>
  ),
}

export default function Flag({ cc, size = 30 }) {
  const f = flags[cc]
  if (!f) return null
  return (
    <svg className="flag" width={size} height={(size * 2) / 3} viewBox="0 0 30 20" aria-hidden="true" focusable="false">
      {f}
    </svg>
  )
}
