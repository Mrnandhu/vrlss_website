// Motion engine. No dependencies. Runs only in the browser, after hydration.
// Everything is progressive: with no JS, or with "reduce motion" on, the page is a normal static page.
import { useEffect } from 'react'

const REVEAL = [
  '.nx-head', '.nx-plan', '.nx-faq-item', '.nx-work-card', '.nx-fine.wk-count', '.nx-feature',
  '.nx-cta-inner', '.nx-card-founder', '.nx-contact-side', '.hm-stat', '.nx-center-note', '.hm-steps li', '.lo-copy',
].join(',')

// glass surfaces that get the pointer-following light and holographic edge
const HOLO = '.nx-faq-item, .hm-steps li, .nx-plan, .wk-card, .nx-feature, .nx-card-founder, .nx-contact-side, .hm-svc-card'

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lerp = (a, b, t) => a + (b - a) * t

export function useScrollFx(path) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const root = document.documentElement
    const cleanups = []
    const on = (t, ev, fn, opt) => {
      t.addEventListener(ev, fn, opt)
      cleanups.push(() => t.removeEventListener(ev, fn, opt))
    }

    // top progress bar
    const bar = document.createElement('div')
    bar.className = 'nx-progress'
    bar.setAttribute('aria-hidden', 'true')
    document.body.appendChild(bar)
    cleanups.push(() => bar.remove())

    if (reduce) return () => cleanups.forEach((f) => f())

    root.classList.add('fx')
    cleanups.push(() => root.classList.remove('fx'))
    const vh0 = window.innerHeight

    // ---- reveal on scroll (only below-the-fold elements start hidden, so nothing flashes) ----
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('rv-in')
          io.unobserve(e.target)
        }
      }),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    )
    const groups = new Map()
    document.querySelectorAll(REVEAL).forEach((el) => {
      if (el.closest('.ind, .dm-stage')) return
      if (el.getBoundingClientRect().top < vh0 * 0.92) return
      const p = el.parentElement
      const i = groups.get(p) || 0
      groups.set(p, i + 1)
      el.style.setProperty('--rd', `${Math.min(i, 6) * 80}ms`)
      el.classList.add('rv')
      io.observe(el)
    })
    cleanups.push(() => io.disconnect())

    // ---- count-up numbers ----
    const cio = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return
        cio.unobserve(e.target)
        const el = e.target
        const to = Number(el.dataset.count)
        const t0 = performance.now()
        const tick = (t) => {
          const k = clamp((t - t0) / 1400)
          el.textContent = `${Math.round(to * (1 - Math.pow(1 - k, 3)))}`
          if (k < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }),
      { threshold: 0.6 },
    )
    document.querySelectorAll('[data-count]').forEach((el) => {
      el.textContent = '0'
      cio.observe(el)
    })
    cleanups.push(() => cio.disconnect())

    // ---- weighted smooth scrolling (mouse/trackpad on desktop only; touch keeps native scrolling) ----
    let target = window.scrollY
    let current = window.scrollY
    let gliding = false
    let raf = 0
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame) }
    if (fine) {
      root.classList.add('glide')
      cleanups.push(() => root.classList.remove('glide'))
      const maxY = () => root.scrollHeight - window.innerHeight
      const onWheel = (e) => {
        if (e.ctrlKey || e.defaultPrevented) return
        if (e.target.closest?.('textarea, select, .nx-sheet, [data-native-scroll]')) return
        // let inner scroll areas (demo frames, tables, menus) scroll on their own
        for (let el = e.target; el && el !== document.body && el.nodeType === 1; el = el.parentElement) {
          const st = getComputedStyle(el)
          if (/(auto|scroll)/.test(st.overflowY) && el.scrollHeight > el.clientHeight + 1) {
            const up = e.deltaY < 0
            if ((up && el.scrollTop > 0) || (!up && el.scrollTop + el.clientHeight < el.scrollHeight - 1)) return
          }
        }
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
        e.preventDefault()
        if (!gliding) current = target = window.scrollY
        target = clamp(target + e.deltaY * (e.deltaMode === 1 ? 36 : 1), 0, maxY())
        gliding = true
        kick()
      }
      on(window, 'wheel', onWheel, { passive: false })
    }

    const hero = document.querySelector('.hm-hero')

    // ---- "View" bubble + magnetic buttons (desktop) ----
    let cur = null
    const mouse = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }
    if (fine) {
      cur = document.createElement('div')
      cur.className = 'cx is-out'
      cur.setAttribute('aria-hidden', 'true')
      cur.innerHTML = '<i class="cx-ring"><b class="cx-label"></b></i><i class="cx-dot"></i>'
      document.body.appendChild(cur)
      cleanups.push(() => cur.remove())
      const label = cur.querySelector('.cx-label')
      let hot = null
      const move = (e) => {
        mouse.x = e.clientX
        mouse.y = e.clientY
        cur.classList.remove('is-out')
        const t = e.target
        const view = t.closest?.('[data-cursor]')
        const link = t.closest?.('a, button, summary, label, select, [role="tab"]')
        cur.classList.toggle('is-link', !!link && !view)
        cur.classList.toggle('is-view', !!view)
        label.textContent = view ? view.dataset.cursor : ''
        cur.classList.toggle('is-text', !!t.closest?.('input, textarea'))
        if (hero && t.closest?.('.hm-hero')) {
          const r = hero.getBoundingClientRect()
          hero.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
          hero.style.setProperty('--py', (0.5 - (e.clientY - r.top) / r.height).toFixed(3))
        }
        const g = t.closest?.(HOLO)
        if (g) {
          const r = g.getBoundingClientRect()
          g.style.setProperty('--gx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`)
          g.style.setProperty('--gy', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`)
        }
        const b = t.closest?.('.nx-btn-primary, .nx-btn-light')
        if (b !== hot) {
          if (hot) hot.style.translate = ''
          hot = b
        }
        if (b) {
          const r = b.getBoundingClientRect()
          b.style.translate = `${(((e.clientX - r.left) / r.width - 0.5) * 10).toFixed(1)}px ${(((e.clientY - r.top) / r.height - 0.5) * 8).toFixed(1)}px`
        }
        kick()
      }
      on(document, 'pointermove', move, { passive: true })
      on(document, 'pointerdown', () => cur.classList.add('is-down'))
      on(document, 'pointerup', () => cur.classList.remove('is-down'))
      on(document.documentElement, 'mouseleave', () => cur.classList.add('is-out'))
    }

    // ---- elements driven every frame ----
    const fills = [...document.querySelectorAll('[data-fill]')].map((el) => ({ el, words: [...el.querySelectorAll('.mf-w')] }))
    const sps = [...document.querySelectorAll('[data-sp]')]
    const stepSets = [...document.querySelectorAll('[data-steps]')].map((el) => [...el.querySelectorAll('li')])
    const stacks = [...document.querySelectorAll('[data-stack]')].map((el) => [...el.children])
    const marquees = [...document.querySelectorAll('[data-marquee]')].map((el) => ({ el, x: 0, dir: Number(el.dataset.marquee) || -1, speed: Number(el.dataset.speed) || 0.5, w: 0 }))
    const hs = document.querySelector('[data-hscroll]')
    let hsMax = 0

    const measure = () => {
      marquees.forEach((m) => { m.w = m.el.scrollWidth / 2 })
      if (hs) {
        const wide = window.innerWidth >= 900 && window.innerHeight >= 560
        const track = hs.querySelector('.hs-track')
        const view = hs.querySelector('.hs-viewport')
        hs.classList.toggle('hs-on', wide)
        if (wide) {
          hsMax = Math.max(0, track.scrollWidth - view.clientWidth)
          hs.style.height = `${hsMax + window.innerHeight * 0.9}px`
        } else {
          hs.style.height = ''
          track.style.transform = ''
        }
      }
    }
    measure()

    let lastY = window.scrollY
    let vel = 0
    const frame = () => {
      raf = 0
      let more = marquees.length > 0 || gliding

      if (gliding) {
        current = lerp(current, target, 0.11)
        if (Math.abs(target - current) < 0.4) { current = target; gliding = false }
        window.scrollTo(0, current)
      }

      const y = window.scrollY
      const vh = window.innerHeight
      vel = lerp(vel, y - lastY, 0.2)
      lastY = y
      const max = root.scrollHeight - vh
      bar.style.transform = `scaleX(${max > 0 ? clamp(y / max) : 0})`

      if (hero) hero.style.setProperty('--hp', clamp(y / Math.max(1, hero.offsetHeight * 0.9)).toFixed(3))

      sps.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.bottom < -vh || r.top > vh * 2) return
        el.style.setProperty('--sp', clamp((vh - r.top) / (vh * 0.7)).toFixed(3))
        el.style.setProperty('--sq', clamp((vh * 0.62 - r.top) / Math.max(1, r.height)).toFixed(3))
        el.style.setProperty('--so', clamp((vh - r.top) / (vh + r.height)).toFixed(3))
      })
      stepSets.forEach((items) => items.forEach((li) => li.toggleAttribute('data-on', li.getBoundingClientRect().top < vh * 0.62)))

      // stacked cards: each card shrinks and dims as the next one slides over it
      stacks.forEach((cards) => cards.forEach((c, i) => {
        const next = cards[i + 1]
        if (!next) return
        const a = c.getBoundingClientRect()
        const b = next.getBoundingClientRect()
        c.style.setProperty('--cover', clamp(1 - (b.top - a.top) / Math.max(1, a.height)).toFixed(3))
      }))

      fills.forEach(({ el, words }) => {
        const r = el.getBoundingClientRect()
        const p = clamp((vh * 0.85 - r.top) / (vh * 0.55 + r.height * 0.6))
        const n = Math.round(p * words.length)
        words.forEach((w, i) => w.classList.toggle('on', i < n))
      })

      if (hs && hs.classList.contains('hs-on')) {
        const r = hs.getBoundingClientRect()
        const p = clamp(-r.top / Math.max(1, r.height - vh))
        hs.querySelector('.hs-track').style.transform = `translate3d(${(-p * hsMax).toFixed(1)}px,0,0)`
        hs.style.setProperty('--p', p.toFixed(3))
      }

      // marquees run continuously and speed up with scroll velocity
      marquees.forEach((m) => {
        if (!m.w) return
        m.x += m.dir * (m.speed + Math.min(8, Math.abs(vel) * 0.4))
        if (m.x <= -m.w) m.x += m.w
        if (m.x > 0) m.x -= m.w
        m.el.style.transform = `translate3d(${m.x.toFixed(2)}px,0,0)`
      })

      if (cur) {
        ring.x = lerp(ring.x, mouse.x, 0.2)
        ring.y = lerp(ring.y, mouse.y, 0.2)
        cur.style.setProperty('--mx', `${mouse.x}px`)
        cur.style.setProperty('--my', `${mouse.y}px`)
        cur.style.setProperty('--rx', `${ring.x.toFixed(1)}px`)
        cur.style.setProperty('--ry', `${ring.y.toFixed(1)}px`)
        if (Math.abs(ring.x - mouse.x) + Math.abs(ring.y - mouse.y) > 0.5) more = true
      }
      if (Math.abs(vel) > 0.05) more = true
      if (more) kick()
    }

    const onScroll = () => {
      if (!gliding) target = current = window.scrollY
      kick()
    }
    const onResize = () => { measure(); kick() }
    on(window, 'scroll', onScroll, { passive: true })
    on(window, 'resize', onResize)
    on(window, 'load', onResize)
    // fonts and images change widths after first paint
    const late = window.setTimeout(onResize, 900)
    cleanups.push(() => { window.clearTimeout(late); if (raf) cancelAnimationFrame(raf) })
    frame()

    return () => cleanups.forEach((f) => f())
  }, [path])
}
