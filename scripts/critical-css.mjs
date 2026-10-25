// Critical CSS without dependencies: keeps only the style rules a prerendered page can use.
// A rule is kept when at least one of its selectors only needs classes / ids found in the page HTML
// (or in SAFE, for classes the app adds while running, such as open menus and active states).
// Everything else still arrives with the full stylesheet, which loads right after first paint.

// Classes added by JavaScript after load (menus, states, motion). Keep generous: a missing rule here
// only means a short flash until the full stylesheet arrives.
const SAFE = [
  /^is-/, /^has-/, /^nx-lock$/, /^open$/, /^seen$/, /^intro$/, /^fx$/, /^lenis/, /^rv-/, /^in$/, /^on$/, /^active$/,
  /^nx-sheet/, /^nx-menu/, /^nx-mbar/, /^nx-cur/, /^cb/, /^pt/, /^st-rot/,
]
const safe = (name) => SAFE.some((re) => re.test(name))

/** Splits CSS text into top-level blocks: { prelude, body } for at-rules/rules, or { raw } for statements. */
function blocks(css) {
  const out = []
  let i = 0
  const n = css.length
  while (i < n) {
    // skip whitespace and comments
    if (/\s/.test(css[i])) { i++; continue }
    if (css.startsWith('/*', i)) { const e = css.indexOf('*/', i + 2); i = e < 0 ? n : e + 2; continue }
    let j = i
    let quote = null
    while (j < n) {
      const ch = css[j]
      if (quote) { if (ch === '\\') j++; else if (ch === quote) quote = null; j++; continue }
      if (ch === '"' || ch === "'") { quote = ch; j++; continue }
      if (ch === '{' || ch === ';') break
      j++
    }
    if (j >= n) break
    const prelude = css.slice(i, j).trim()
    if (css[j] === ';') { out.push({ raw: prelude + ';' }); i = j + 1; continue }
    // find the matching closing brace
    let depth = 1
    let k = j + 1
    quote = null
    while (k < n && depth) {
      const ch = css[k]
      if (quote) { if (ch === '\\') k++; else if (ch === quote) quote = null }
      else if (ch === '"' || ch === "'") quote = ch
      else if (css.startsWith('/*', k)) { const e = css.indexOf('*/', k + 2); k = e < 0 ? n : e + 1 }
      else if (ch === '{') depth++
      else if (ch === '}') depth--
      k++
    }
    out.push({ prelude, body: css.slice(j + 1, k - 1) })
    i = k
  }
  return out
}

// Splits a selector list on top-level commas (not inside :is(), :not(), [..] etc.).
function splitSelectors(list) {
  const parts = []
  let depth = 0
  let cur = ''
  for (const ch of list) {
    if (ch === '(' || ch === '[') depth++
    else if (ch === ')' || ch === ']') depth--
    if (ch === ',' && depth === 0) { parts.push(cur); cur = '' } else cur += ch
  }
  if (cur.trim()) parts.push(cur)
  return parts
}

// Can this selector match the page? Classes/ids inside :not() / :where() / :is() / :has() are ignored
// (being generous), the rest must exist in the page or be safelisted.
function canMatch(sel, classes, ids) {
  let s = sel
  for (let guard = 0; guard < 6 && /:(not|where|is|has|nth-[a-z-]+)\(/.test(s); guard++) {
    s = s.replace(/:(not|where|is|has|nth-[a-z-]+)\((?:[^()]|\([^()]*\))*\)/g, '')
  }
  s = s.replace(/\[[^\]]*\]/g, '') // attribute selectors: keep generously
  for (const m of s.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) if (!classes.has(m[1]) && !safe(m[1])) return false
  for (const m of s.matchAll(/#(-?[_a-zA-Z][\w-]*)/g)) if (!ids.has(m[1])) return false
  return true
}

function prune(css, classes, ids) {
  let out = ''
  for (const b of blocks(css)) {
    if (b.raw) { out += b.raw; continue }
    const p = b.prelude
    if (p.startsWith('@')) {
      const name = p.slice(1).split(/[\s(]/)[0].toLowerCase()
      if (['media', 'supports', 'layer', 'container', 'scope', 'document'].includes(name)) {
        const inner = prune(b.body, classes, ids)
        if (inner.trim()) out += `${p}{${inner}}`
      } else {
        out += `${p}{${b.body}}` // @font-face, @keyframes, @property, @page …: keep as they are
      }
      continue
    }
    const sels = splitSelectors(p).filter((x) => canMatch(x, classes, ids))
    if (sels.length) out += `${sels.join(',')}{${b.body}}`
  }
  return out
}

/** Returns the CSS this page needs at first paint. */
export function criticalCss(html, css) {
  const classes = new Set()
  const ids = new Set()
  for (const m of html.matchAll(/\sclass="([^"]*)"/g)) for (const c of m[1].split(/\s+/)) if (c) classes.add(c)
  for (const m of html.matchAll(/\sid="([^"]*)"/g)) ids.add(m[1])
  ids.add('root')
  ids.add('intro')
  return prune(css, classes, ids)
}
