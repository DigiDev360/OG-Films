import { useCallback, useEffect, useRef, useState } from 'react'
import { PROJECTS, pad } from '../data.js'

export default function Work({ thumbs, onOpen }) {
  const [view, setView] = useState('slider')
  const track = useRef(null)
  const bar = useRef(null)
  const drag = useRef({ down: false, sx: 0, sl: 0, moved: 0 })
  const raf = useRef(0)

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
    bar.current.style.width = Math.min(100, (t.clientWidth / sw) * 100) + '%'
    bar.current.style.left = (t.scrollLeft / sw) * 100 + '%'
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
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(raf.current)
    }
  }, [schedule])

  useEffect(() => {
    if (view === 'slider') schedule()
  }, [view, schedule])

  const onDown = (e) => {
    if (e.pointerType === 'touch') return
    drag.current = { down: true, sx: e.clientX, sl: track.current.scrollLeft, moved: 0 }
    track.current.classList.add('drag')
  }

  const open = (e, i, withRect) => {
    e.preventDefault()
    if (drag.current.moved > 6) {
      drag.current.moved = 0
      return
    }
    onOpen(i, withRect ? e.currentTarget.getBoundingClientRect() : null)
  }

  const scrollBy = (dir) =>
    track.current.scrollBy({ left: dir * track.current.clientWidth * 0.6, behavior: 'smooth' })

  return (
    <section className="work" id="work">
      <div className="work-hd wrap">
        <h2>
          Selected work<sup>{pad(PROJECTS.length)}</sup>
        </h2>
        <div className="seg mono" role="group" aria-label="View">
          {['slider', 'list'].map((v) => (
            <button key={v} aria-pressed={view === v} onClick={() => setView(v)}>
              {v === 'slider' ? 'Slider' : 'List'}
            </button>
          ))}
        </div>
      </div>

      <div className="track-wrap" hidden={view !== 'slider'}>
        <div
          className="track"
          ref={track}
          data-cursor="Drag"
          onPointerDown={onDown}
          onScroll={schedule}
        >
          {PROJECTS.map((p, i) => (
            <a
              key={p.id}
              className="card"
              href="#"
              data-cursor="View"
              onClick={(e) => open(e, i, true)}
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
          ))}
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

      <div className="list wrap" hidden={view !== 'list'}>
        {PROJECTS.map((p, i) => (
          <a
            key={p.id}
            className="row"
            href="#"
            data-i={i}
            data-cursor="View"
            onClick={(e) => open(e, i, false)}
          >
            <span className="ri">{pad(i + 1)}</span>
            <b>{p.title}</b>
            <span>{p.cat}</span>
            <span>{p.n} frames</span>
            <span>{p.year}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
