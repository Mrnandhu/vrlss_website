import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Lenis smooth scrolling for the homepage, driven by GSAP's ticker. Returns a cleanup. */
export function startSmoothScroll() {
  const root = document.documentElement
  const lenis = new Lenis({ duration: 1.35, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const raf = (time) => {
    // Pause while the mobile menu sheet is open (the site locks scrolling then).
    if (root.classList.contains('nx-lock')) lenis.stop()
    else lenis.start()
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(raf)
    lenis.destroy()
    // ScrollTrigger may have written an inline scroll-behavior; give the rest of the site its own CSS back.
    root.style.removeProperty('scroll-behavior')
  }
}

export { gsap, ScrollTrigger }
