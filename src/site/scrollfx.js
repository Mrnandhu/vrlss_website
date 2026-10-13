// Scroll-driven motion engine. No dependencies. Runs only in the browser, after hydration.
// Everything is progressive: with no JS, or with "reduce motion" on, the page is a normal static page.
import { useEffect } from 'react'

const REVEAL = [
  '.nx-head', '.nx-panel', '.nx-feature', '.nx-plan', '.nx-faq-item', '.nx-work-card', '.nx-fine.wk-count',
  '.nx-cta-inner', '.nx-card-founder', '.nx-contact-side', '.hm-stat', '.nx-center-note',
].join(',')

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))

export function useScrollFx(path) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    const cleanups = []

    // top progress bar
    const bar = document.createElement('div')
    bar.className = 'nx-progress'
    bar.setAttribute('aria-hidden', 'true')
    document.body.appendChild(bar)
    cleanups.push(() => bar.remove())

    if (reduce) {
      return () => cleanups.forEach((f) => f())
    }

    // remember where the visitor clicked, so page changes open outward from that point
    const mark = (e) => {
      root.style.setProperty('--vx', `${e.clientX}px`)
      root.style.setProperty('--vy', `${e.clientY}px`)
    }
    document.addEventListener('pointerdown', mark, { passive: true })
    cleanups.push(() => document.removeEventListener('pointerdown', mark))

    root.classList.add('fx')
    cleanups.push(() => root.classList.remove('fx'))

    // ---- reveal on scroll (only below-the-fold elements start hidden, so nothing flashes) ----
    const vh = window.innerHeight
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('rv-in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    const groups = new Map()
    document.querySelectorAll(REVEAL).forEach((el) => {
      if (el.closest('.ind, .hs-on, .sy-on')) return
      const r = el.getBoundingClientRect()
      if (r.top < vh * 0.92) return
      const p = el.parentElement
      const i = groups.get(p) || 0
      groups.set(p, i + 1)
      el.style.setProperty('--rd', `${Math.min(i, 6) * 70}ms`)
      el.classList.add('rv')
      io.observe(el)
    })
    cleanups.push(() => io.disconnect())

    // ---- count-up numbers ----
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          cio.unobserve(e.target)
          const el = e.target
          const to = Number(el.dataset.count)
          const suffix = el.dataset.suffix || ''
          const t0 = performance.now()
          const tick = (t) => {
            const k = clamp((t - t0) / 1400)
            el.textContent = `${Math.round(to * (1 - Math.pow(1 - k, 3)))}${suffix}`
            if (k < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        })
      },
      { threshold: 0.6 },
    )
    document.querySelectorAll('[data-count]').forEach((el) => {
      el.textContent = `0${el.dataset.suffix || ''}`
      cio.observe(el)
    })
    cleanups.push(() => cio.disconnect())

    // ---- cursor spotlight on cards, magnetic buttons, hero tilt (mouse devices only) ----
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const SPOT = '.hm-demo, .nx-plan, .nx-panel, .nx-feature, .nx-work-card, .hm-stat, .nx-faq-item'
      let hot = null
      const move = (e) => {
        const c = e.target.closest?.(SPOT)
        if (c) {
          const r = c.getBoundingClientRect()
          c.style.setProperty('--mx', `${e.clientX - r.left}px`)
          c.style.setProperty('--my', `${e.clientY - r.top}px`)
        }
        const b = e.target.closest?.('.nx-btn-primary')
        if (b !== hot) {
          if (hot) hot.style.transform = ''
          hot = b
        }
        if (b) {
          const r = b.getBoundingClientRect()
          const dx = (e.clientX - (r.left + r.width / 2)) / r.width
          const dy = (e.clientY - (r.top + r.height / 2)) / r.height
          b.style.transform = `translate(${(dx * 8).toFixed(1)}px, ${(dy * 6).toFixed(1)}px)`
        }
        const hv = document.querySelector('.nx-hvwrap')
        if (hv && e.target.closest?.('.nx-hero')) {
          const r = hv.getBoundingClientRect()
          hv.style.setProperty('--tx', (((e.clientX - r.left) / r.width - 0.5) * 8).toFixed(2) + 'deg')
          hv.style.setProperty('--ty', ((0.5 - (e.clientY - r.top) / r.height) * 6).toFixed(2) + 'deg')
        }
      }
      document.addEventListener('pointermove', move, { passive: true })
      cleanups.push(() => document.removeEventListener('pointermove', move))
    }

    // ---- scroll-filled text ----
    const fills = [...document.querySelectorAll('[data-fill]')].map((el) => ({ el, words: [...el.querySelectorAll('.mf-w')] }))

    // ---- pinned scenes: story (vertical) and demo track (horizontal) ----
    const story = document.querySelector('[data-story]')
    const hs = document.querySelector('[data-hscroll]')
    const hero = document.querySelector('.nx-hero')
    const cin = document.querySelector('[data-cin]')
    const cinSteps = cin ? [...cin.querySelectorAll('.cin-steps li')] : []
    let cinTab = -1
    const labels = story ? [...story.querySelectorAll('.sy-list li')] : []
    let hsMax = 0

    const setup = () => {
      const wide = window.innerWidth >= 900 && window.innerHeight >= 560
      root.classList.toggle('cin-wide', wide)
      if (story) story.classList.toggle('sy-on', wide)
      if (hs) {
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
    setup()

    let raf = 0
    const sm = {}
    let more = false
    // ease the displayed progress toward the real scroll position, so wheel steps feel like glide
    const ease = (key, target) => {
      const cur = sm[key] === undefined ? target : sm[key]
      let n = cur + (target - cur) * 0.13
      if (Math.abs(target - n) < 0.0006) n = target
      sm[key] = n
      if (n !== target) more = true
      return n
    }
    const frame = () => {
      raf = 0
      more = false
      const y = window.scrollY
      const max = root.scrollHeight - window.innerHeight
      bar.style.transform = `scaleX(${max > 0 ? clamp(y / max) : 0})`

      if (cin && root.classList.contains('cin-wide')) {
        const r = cin.getBoundingClientRect()
        const p = ease('cin', clamp(-r.top / Math.max(1, r.height - window.innerHeight)))
        cin.style.setProperty('--cp', p.toFixed(4))
        const t = Math.min(4, Math.floor(clamp((p - 0.4) / 0.4) * 4.999))
        if (t !== cinTab) {
          cinTab = t
          window.dispatchEvent(new CustomEvent('vrlss:tab', { detail: t }))
          cinSteps.forEach((li, k) => li.toggleAttribute('data-on', k === t))
        }
      } else if (hero) hero.style.setProperty('--hp', clamp(y / Math.max(1, hero.offsetHeight * 0.9)).toFixed(3))

      fills.forEach(({ el, words }) => {
        const r = el.getBoundingClientRect()
        const p = clamp((window.innerHeight * 0.85 - r.top) / (window.innerHeight * 0.55 + r.height * 0.6))
        const n = Math.round(p * words.length)
        words.forEach((w, i) => w.classList.toggle('on', i < n))
      })

      if (story && story.classList.contains('sy-on')) {
        const r = story.getBoundingClientRect()
        const p = ease('story', clamp(-r.top / Math.max(1, r.height - window.innerHeight)))
        const n = Math.min(3, Math.floor(p * 4))
        story.style.setProperty('--p', p.toFixed(3))
        story.style.setProperty('--lp', (p * 4 - n).toFixed(3))
        if (story.dataset.step !== String(n)) {
          story.dataset.step = String(n)
          labels.forEach((li, k) => li.toggleAttribute('data-on', k === n))
        }
      }

      if (hs && hs.classList.contains('hs-on')) {
        const r = hs.getBoundingClientRect()
        const p = ease('hs', clamp(-r.top / Math.max(1, r.height - window.innerHeight)))
        hs.querySelector('.hs-track').style.transform = `translate3d(${(-p * hsMax).toFixed(1)}px,0,0)`
        hs.style.setProperty('--p', p.toFixed(3))
      }
      if (more) req()
    }
    const req = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }
    const onResize = () => {
      setup()
      req()
    }
    window.addEventListener('scroll', req, { passive: true })
    window.addEventListener('resize', onResize)
    // images change layout widths after load
    window.addEventListener('load', onResize)
    frame()
    cleanups.push(() => {
      window.removeEventListener('scroll', req)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', onResize)
      if (raf) cancelAnimationFrame(raf)
    })

    return () => cleanups.forEach((f) => f())
  }, [path])
}
