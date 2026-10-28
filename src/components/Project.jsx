import { useEffect, useMemo, useRef, useState } from 'react'
import { PROJECTS, frameSrc, pad } from '../data.js'

const LAYOUT = ['w', 'l', 'r', 'w', 'l', 'r']
const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const EASE = 'cubic-bezier(.77,0,.18,1)'

const insetFrom = (r) =>
  `inset(${Math.max(0, r.top)}px ${Math.max(0, window.innerWidth - r.right)}px ${Math.max(
    0,
    window.innerHeight - r.bottom
  )}px ${Math.max(0, r.left)}px)`

// Full-screen project page. It expands out of the card that was clicked
// and shrinks back into it on close.
export default function Project({ index, rect, onClose, onGo }) {
  const root = useRef(null)
  const [shown, setShown] = useState(false)
  const p = PROJECTS[index]
  const next = (index + 1) % PROJECTS.length

  const frames = useMemo(
    () =>
      Array.from({ length: p.n }, (_, i) => {
        const cls = LAYOUT[i % LAYOUT.length]
        const wide = cls === 'w'
        const w = wide ? 1500 : 880
        const h = wide ? 1000 : 1100
        return { cls, w, h, src: frameSrc(p, i, w, h) }
      }),
    [p]
  )

  // Opening animation and scroll-reveal for frames.
  useEffect(() => {
    const el = root.current
    el.scrollTop = 0
    if (!reduce()) {
      if (rect) {
        el.animate([{ clipPath: insetFrom(rect) }, { clipPath: 'inset(0px 0px 0px 0px)' }], {
          duration: 950,
          easing: EASE,
        })
      } else {
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500 })
      }
    }
    const raf = requestAnimationFrame(() => setShown(true))

    let io
    const figs = el.querySelectorAll('.fr')
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io.unobserve(e.target)
            }
          }),
        { root: el, threshold: 0.12 }
      )
      figs.forEach((f) => io.observe(f))
    } else {
      figs.forEach((f) => f.classList.add('in'))
    }
    el.querySelector('.proj-x').focus({ preventScroll: true })

    return () => {
      cancelAnimationFrame(raf)
      io && io.disconnect()
    }
  }, [index, rect])

  const close = () => {
    const el = root.current
    const visible = rect && rect.bottom > 0 && rect.top < window.innerHeight
    if (visible && !reduce()) {
      setShown(false)
      el.animate([{ clipPath: 'inset(0px 0px 0px 0px)' }, { clipPath: insetFrom(rect) }], {
        duration: 750,
        easing: EASE,
        fill: 'forwards',
      }).onfinish = onClose
    } else {
      onClose()
    }
  }

  useEffect(() => {
    const key = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect])

  const goNext = (e) => {
    e.preventDefault()
    if (reduce()) return onGo(next)
    root.current.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: 'forwards' }).onfinish = () =>
      onGo(next)
  }

  return (
    <div className={'proj' + (shown ? ' shown' : '')} ref={root} role="dialog" aria-modal="true" aria-label={p.title}>
      <button className="proj-x mono" onClick={close}>
        Close
      </button>
      <div className="proj-in wrap">
        <span className="mono" style={{ color: 'var(--mute)' }}>
          Project {pad(index + 1)} / {pad(PROJECTS.length)}
        </span>
        <h2>{p.title}</h2>
        <dl className="facts mono">
          <div>
            <dt>Category</dt>
            <dd>{p.cat}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{p.year}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{p.place}</dd>
          </div>
          <div>
            <dt>Frames</dt>
            <dd>{p.n}</dd>
          </div>
        </dl>
        <p className="blurb">{p.blurb}</p>
        <div className="frames">
          {frames.map((f, i) => (
            <figure key={i} className={'fr ' + f.cls}>
              <div className="im">
                <img src={f.src} alt={`${p.title}, frame ${i + 1}`} width={f.w} height={f.h} />
              </div>
              <figcaption className="mono">
                <span>
                  {index + 1}.{i + 1}
                </span>
                <span>{p.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <a className="next" href="#" onClick={goNext}>
          <span className="mono">Next project</span>
          <b>{PROJECTS[next].title}</b>
        </a>
      </div>
    </div>
  )
}
