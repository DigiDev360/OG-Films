import { useEffect, useState } from 'react'
import { pad } from '../data.js'

export default function Hero({ srcs }) {
  const [cur, setCur] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCur((c) => (c + 1) % srcs.length), 5200)
    return () => clearInterval(id)
  }, [srcs.length])

  return (
    <section className="hero" aria-label="Introduction">
      <div>
        {srcs.map((s, i) => (
          <div key={i} className={'slide' + (i === cur ? ' on' : '')}>
            <img alt="" src={s} />
          </div>
        ))}
      </div>
      <div className="hero-in wrap">
        <h1>
          <span className="ln">
            <span>Quiet light,</span>
          </span>
          <span className="ln">
            <span>held a little</span>
          </span>
          <span className="ln">
            <span>longer.</span>
          </span>
        </h1>
        <div className="hero-side">
          <p>Photographer working in landscape, architecture and the rooms in between.</p>
          <div className="dots">
            {srcs.map((_, i) => (
              // The active dot gets a fresh key each slide so its fill animation restarts.
              <i key={i === cur ? `${i}-${cur}` : i} className={i === cur ? 'on' : ''}></i>
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
