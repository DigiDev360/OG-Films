import { CFG } from '../data.js'

export default function Header({ menuOpen, onMenu, onGo }) {
  return (
    <header className="hd wrap">
      <a
        className="logo"
        href="#top"
        onClick={(e) => {
          e.preventDefault()
          onGo('top')
        }}
      >
        {CFG.name}
      </a>
      <span className="mid mono">Photography / 2024–26</span>
      <button className="menu-btn mono" onClick={onMenu} aria-expanded={menuOpen} aria-controls="menu">
        <span>Menu</span>
        <i></i>
      </button>
    </header>
  )
}
