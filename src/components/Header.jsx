import { useEffect, useRef, useState } from 'react'
import { CFG } from '../data.js'

export default function Header({ menuOpen, onMenu, onGo }) {
  const [solid, setSolid] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('.hero')
      if (!hero) return
      const heroBottom = hero.getBoundingClientRect().bottom
      const headerH = headerRef.current ? headerRef.current.offsetHeight : 60
      setSolid(heroBottom <= headerH)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <header ref={headerRef} className={`hd wrap${solid ? ' solid' : ''}`}>
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
