import { CFG, PROJECTS, pad } from '../data.js'

const LINKS = [
  { id: 'work', label: 'Work', small: pad(PROJECTS.length) },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function Menu({ open, onClose, onGo }) {
  return (
    <div className={'menu wrap' + (open ? ' open' : '')} id="menu">
      <div className="top">
        <span className="logo" style={{ fontFamily: 'var(--display)', fontWeight: 600 }}>
          {CFG.name}
        </span>
        <button className="mono" onClick={onClose}>
          Close
        </button>
      </div>
      <nav>
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={'#' + l.id}
            onClick={(e) => {
              e.preventDefault()
              onGo(l.id)
            }}
          >
            <span>{l.label}</span>
            {l.small && <small>{l.small}</small>}
          </a>
        ))}
      </nav>
      <div className="bot mono">
        <span>Landscape · Architecture · Quiet interiors</span>
        <span>Open for commissions</span>
      </div>
    </div>
  )
}
