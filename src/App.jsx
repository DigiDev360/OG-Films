import { useEffect, useMemo, useState } from 'react'
import { PROJECTS, HERO_IMAGES, frameSrc } from './data.js'
import Preloader from './components/Preloader.jsx'
import Header from './components/Header.jsx'
import Menu from './components/Menu.jsx'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import Editorial from './components/Editorial.jsx'
import Press from './components/Press.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Project from './components/Project.jsx'
import Cursor from './components/Cursor.jsx'

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  const [ready, setReady] = useState(reduceMotion)
  const [menuOpen, setMenuOpen] = useState(false)
  const [open, setOpen] = useState(null) // { index, rect } while a project page is showing

  // Card thumbnails and hero frames are drawn once.
  const thumbs = useMemo(() => PROJECTS.map((p) => frameSrc(p, 0, 640, 800)), [])
  const heroSrcs = useMemo(() => {
    const defaults = [
      frameSrc(PROJECTS[0], 0, 1600, 900),
      frameSrc(PROJECTS[3], 1, 1600, 900),
      frameSrc(PROJECTS[1], 2, 1600, 900),
    ]
    if (HERO_IMAGES && HERO_IMAGES.length > 0) return HERO_IMAGES
    return defaults
  }, [])

  useEffect(() => {
    document.body.classList.toggle('loading', !ready)
    document.body.classList.toggle('ready', ready)
  }, [ready])

  useEffect(() => {
    document.body.classList.toggle('locked', open !== null)
  }, [open])

  useEffect(() => {
    const key = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [])

  const go = (id) => {
    setMenuOpen(false)
    const target = id === 'top' ? document.body : document.getElementById(id)
    setTimeout(() => target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }), 200)
  }

  return (
    <>
      {!reduceMotion && <Preloader thumbs={thumbs} onReveal={() => setReady(true)} />}
      <div className="grain" aria-hidden="true"></div>
      <Cursor thumbs={thumbs} projectOpen={open !== null} />

      <Header menuOpen={menuOpen} onMenu={() => setMenuOpen(true)} onGo={go} />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} onGo={go} />

      <main id="top">
        <Hero srcs={heroSrcs} />
        <Work thumbs={thumbs} onOpen={(index, rect) => setOpen({ index, rect })} />
        <Editorial />
        <Press />
        <About />
        <Contact />
      </main>

      {open && (
        <Project
          key={open.index}
          index={open.index}
          rect={open.rect}
          onClose={() => setOpen(null)}
          onGo={(index) => setOpen({ index, rect: null })}
        />
      )}
    </>
  )
}
