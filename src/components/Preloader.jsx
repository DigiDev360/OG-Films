import { useEffect, useState } from 'react'
import { CFG } from '../data.js'

// Counts 000 to 100 over flashing frames, then lifts like a curtain.
export default function Preloader({ thumbs, onReveal }) {
  const [n, setN] = useState(0)
  const [k, setK] = useState(0)
  const [done, setDone] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const t0 = performance.now()
    const dur = 2300
    let raf
    let t1
    let t2
    const iv = setInterval(() => setK((x) => (x + 1) % thumbs.length), 170)

    const tick = (now) => {
      const t = Math.min(1, (now - t0) / dur)
      setN(Math.round((1 - Math.pow(1 - t, 2.2)) * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        clearInterval(iv)
        t1 = setTimeout(() => {
          setDone(true)
          onReveal()
          t2 = setTimeout(() => setGone(true), 1300)
        }, 250)
      }
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      clearInterval(iv)
      clearTimeout(t1)
      clearTimeout(t2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (gone) return null

  return (
    <div className={'pre' + (done ? ' done' : '')} aria-hidden="true">
      <div className="pre-name">{CFG.name}</div>
      <div className="pre-note mono">Selected work 2024–26</div>
      <div className="pre-frame">
        <img src={thumbs[k]} alt="" />
      </div>
      <div className="pre-cnt">{String(n).padStart(3, '0')}</div>
    </div>
  )
}
