import { useState } from 'react'
import { PRESS_ITEMS } from '../data.js'

export default function Press() {
  const [active, setActive] = useState(0)

  if (!PRESS_ITEMS || PRESS_ITEMS.length === 0) return null

  return (
    <section className="press wrap" id="press">
      <div className="press-g">
        {/* Left: List of press & publication features */}
        <div className="press-list" role="list">
          {PRESS_ITEMS.map((item, index) => {
            const isActive = index === active
            return (
              <div
                key={item.id || index}
                className={`press-item${isActive ? ' active' : ''}`}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActive(index)
                  }
                }}
              >
                <span className="press-num">{item.id || String(index + 1).padStart(2, '0')}</span>
                <div className="press-info">
                  <b>{item.title}</b>
                  <span className="press-pub mono">{item.publication}</span>
                </div>
                <div className="press-arrow" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="7" y1="7" x2="17" y2="17" />
                    <polyline points="17 7 17 17 7 17" />
                  </svg>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: Magazine/Editorial image preview */}
        <div className="press-visual">
          <div className="press-img-wrap">
            {PRESS_ITEMS.map((item, index) => (
              <img
                key={item.id || index}
                src={item.image}
                alt={item.title}
                className={`press-img${index === active ? ' active' : ''}`}
                draggable="false"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
