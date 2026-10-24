import { useRef, useState } from 'react'
import { CFG } from '../data.js'

export default function Contact() {
  const [label, setLabel] = useState('Copy email')
  const mail = useRef(null)

  const reset = () => setTimeout(() => setLabel('Copy email'), 2200)

  const selectText = () => {
    const r = document.createRange()
    r.selectNodeContents(mail.current)
    const s = window.getSelection()
    s.removeAllRanges()
    s.addRange(r)
    setLabel('Press copy')
  }

  const copy = () => {
    try {
      navigator.clipboard.writeText(CFG.email).then(() => setLabel('Copied'), selectText)
    } catch {
      selectText()
    }
    reset()
  }

  return (
    <section className="contact" id="contact">
      <div className="marq" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span key={i}>
            Available for commissions <em>/</em>
          </span>
        ))}
      </div>
      <div className="mail wrap">
        <code ref={mail}>{CFG.email}</code>
        <button className="copy mono" onClick={copy}>
          {label}
        </button>
      </div>
      <div className="foot wrap mono">
        <span>© {new Date().getFullYear()} {CFG.name}</span>
        <span>Photography</span>
      </div>
    </section>
  )
}
