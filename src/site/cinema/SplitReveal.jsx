import { Fragment, useLayoutEffect, useRef } from 'react'
import { gsap } from './lib/smooth'

/**
 * Real HTML heading whose words slide up and fade in, staggered, when it scrolls into view.
 * Renders plain text on the server; the animation only starts in the browser when motion is on.
 */
export default function SplitReveal({ as: Tag = 'h2', text, className = '', id }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (document.documentElement.dataset.cmMotion !== 'on' || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('.cm-w > span'), {
        yPercent: 115,
        opacity: 0,
        rotate: 4,
        duration: 1.5,
        ease: 'expo.out',
        stagger: 0.075,
        scrollTrigger: { trigger: ref.current, start: 'top 88%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [text])

  const words = text.split(' ')
  return (
    <Tag ref={ref} id={id} className={`cm-split ${className}`}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="cm-w">
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
