import { useEffect, useRef } from 'react'

// Custom cursor (grows and shows a label over [data-cursor] elements)
// and the image preview that follows the pointer over list rows.
export default function Cursor({ thumbs, projectOpen }) {
  const dot = useRef(null)
  const label = useRef(null)
  const peek = useRef(null)
  const peekImg = useRef(null)
  const blocked = useRef(false)
  blocked.current = projectOpen

  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return
    let tx = 0
    let ty = 0
    let x = 0
    let y = 0
    let px = 0
    let py = 0
    let raf

    const move = (e) => {
      tx = e.clientX
      ty = e.clientY
      dot.current.classList.add('show')
      const t = e.target.closest && e.target.closest('[data-cursor]')
      const text = t ? t.getAttribute('data-cursor') : ''
      if (text) {
        label.current.textContent = text
        dot.current.classList.add('big')
      } else {
        dot.current.classList.remove('big')
      }
      const row = e.target.closest && e.target.closest('.row')
      if (row && !blocked.current) {
        peekImg.current.src = thumbs[+row.getAttribute('data-i')]
        peek.current.classList.add('on')
      } else {
        peek.current.classList.remove('on')
      }
    }
    const leave = () => {
      dot.current.classList.remove('show')
      peek.current.classList.remove('on')
    }
    const loop = () => {
      x += (tx - x) * 0.22
      y += (ty - y) * 0.22
      px += (tx - px) * 0.1
      py += (ty - py) * 0.1
      dot.current.style.transform = `translate3d(${x}px,${y}px,0)`
      peek.current.style.left = px + 24 + 'px'
      peek.current.style.top = py - 110 + 'px'
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [thumbs])

  return (
    <>
      <div className="cur" ref={dot} aria-hidden="true">
        <span ref={label}></span>
      </div>
      <div className="peek" ref={peek} aria-hidden="true">
        <img ref={peekImg} alt="" />
      </div>
    </>
  )
}
