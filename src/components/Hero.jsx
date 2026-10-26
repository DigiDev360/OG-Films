import { useEffect, useState } from 'react'
import { pad } from '../data.js'

export default function Hero({ srcs }) {
  const [cur, setCur] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCur((c) => (c + 1) % srcs.length), 5200)
    return () => clearInterval(id)
  }, [srcs.length, cur])

  return (
    <section className="hero" aria-label="Introduction">
      <div>
        {srcs.map((s, i) => {
          const src = typeof s === 'string' ? s : s.src
          const pos = typeof s === 'object' && s.position ? s.position : undefined
          return (
            <div key={i} className={'slide' + (i === cur ? ' on' : '')}>
              <img alt="" src={src} style={pos ? { objectPosition: pos } : undefined} />
            </div>
          )
        })}
      </div>
      <div className="hero-in wrap">
        <h1>
          <span className="ln">
            <span>OG FILMS</span>
          </span>
        </h1>
        <div className="hero-side">
          <p>Photographer working in landscape, architecture and the rooms in between.</p>
          <div className="dots" role="tablist" aria-label="Slides">
            {srcs.map((_, i) => (
              <button
                key={i === cur ? `${i}-${cur}` : i}
                className={i === cur ? 'on' : ''}
                onClick={() => setCur(i)}
                aria-label={`Go to slide ${i + 1}`}
                role="tab"
                aria-selected={i === cur}
              ></button>
            ))}
          </div>
          <span className="mono">
            {pad(cur + 1)} / {pad(srcs.length)}
          </span>
        </div>
      </div>
    </section>
  )
}
