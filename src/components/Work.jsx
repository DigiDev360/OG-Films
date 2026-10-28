import { useCallback, useEffect, useRef } from 'react'
import { PROJECTS, pad } from '../data.js'

export default function Work({ thumbs, onOpen }) {
  const track = useRef(null)
  const bar = useRef(null)
  const drag = useRef({ down: false, sx: 0, sl: 0, moved: 0 })
  const raf = useRef(0)
  const isHovered = useRef(false)
  const scrollPos = useRef(0)

  // Parallax inside each card and the progress bar under the track.
  const update = useCallback(() => {
    raf.current = 0
    const t = track.current
    if (!t) return
    const vw = window.innerWidth
    t.querySelectorAll('.card').forEach((c) => {
      const r = c.getBoundingClientRect()
      const k = (r.left + r.width / 2 - vw / 2) / vw
      c.querySelector('img').style.transform = `translate3d(${k * -44}px,0,0) scale(1.18)`
    })
    const sw = t.scrollWidth || 1
    const half = sw / 2
    if (bar.current && half > 0) {
      bar.current.style.width = Math.min(100, (t.clientWidth / half) * 100) + '%'
      bar.current.style.left = (((t.scrollLeft % half) + half) % half / half) * 100 + '%'
    }
  }, [])

  const schedule = useCallback(() => {
    if (!raf.current) raf.current = requestAnimationFrame(update)
  }, [update])

  useEffect(() => {
    const move = (e) => {
      const d = drag.current
      if (!d.down) return
      const dx = e.clientX - d.sx
      d.moved = Math.max(d.moved, Math.abs(dx))
      track.current.scrollLeft = d.sl - dx
    }
    const up = () => {
      drag.current.down = false
      track.current?.classList.remove('drag')
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('resize', schedule)
    schedule()
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(raf.current)
    }
  }, [schedule])

  // Auto-scroll loop
  useEffect(() => {
    let animId
    let lastTime = performance.now()
    const speed = 0.5

    const loop = (time) => {
      const dt = Math.min((time - lastTime) / 16.67, 3)
      lastTime = time

      const t = track.current
      if (t) {
        if (!drag.current.down && !isHovered.current) {
          scrollPos.current += speed * dt
          const half = t.scrollWidth / 2
          if (half > 0 && scrollPos.current >= half) {
            scrollPos.current -= half
          }
          t.scrollLeft = scrollPos.current
        } else {
          scrollPos.current = t.scrollLeft
        }
      }

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [])

  const onDown = (e) => {
    if (e.pointerType === 'touch') return
    scrollPos.current = track.current.scrollLeft
    drag.current = { down: true, sx: e.clientX, sl: track.current.scrollLeft, moved: 0 }
    track.current.classList.add('drag')
  }

  const open = (e, i) => {
    e.preventDefault()
    if (drag.current.moved > 6) {
      drag.current.moved = 0
      return
    }
    onOpen(i, e.currentTarget.getBoundingClientRect())
  }

  const scrollBy = (dir) => {
    const delta = dir * track.current.clientWidth * 0.6
    scrollPos.current = track.current.scrollLeft + delta
    track.current.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <section className="work" id="work">
      <div className="work-hd wrap">
        <h2>
          Selected work<sup>{pad(PROJECTS.length)}</sup>
        </h2>
      </div>

      <div className="track-wrap">
        <div
          className="track"
          ref={track}
          onPointerDown={onDown}
          onPointerEnter={() => { isHovered.current = true }}
          onPointerLeave={() => { isHovered.current = false }}
          onScroll={schedule}
        >
          {[...PROJECTS, ...PROJECTS].map((p, index) => {
            const i = index % PROJECTS.length
            return (
              <a
                key={`${p.id}-${index}`}
                className="card"
                href="#"
                onClick={(e) => open(e, i)}
              >
                <div className="ph">
                  <img
                    src={thumbs[i]}
                    alt={`${p.title}, a ${p.cat.toLowerCase()} photograph`}
                    draggable="false"
                  />
                </div>
                <div className="cm">
                  <span>
                    {i + 1}.1—{i + 1}.{p.n}
                  </span>
                  <b>{p.title}</b>
                  <i>
                    {p.cat} · {p.year}
                  </i>
                </div>
              </a>
            )
          })}
        </div>
        <div className="rail wrap">
          <div className="bar">
            <i ref={bar}></i>
          </div>
          <div className="arrows">
            <button onClick={() => scrollBy(-1)} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 3 5 8l5 5" />
              </svg>
            </button>
            <button onClick={() => scrollBy(1)} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="m6 3 5 5-5 5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}