import { useMemo } from 'react'
import { PROJECTS, EDITORIAL_IMAGES, frameSrc } from '../data.js'

export default function Editorial() {
  const imgs = useMemo(() => {
    const fallback = [
      frameSrc(PROJECTS[0], 0, 900, 1100),
      frameSrc(PROJECTS[1], 0, 800, 1000),
      frameSrc(PROJECTS[2], 0, 900, 1100),
    ]
    if (EDITORIAL_IMAGES && EDITORIAL_IMAGES.length >= 3) return EDITORIAL_IMAGES
    return fallback.map((def, i) => (EDITORIAL_IMAGES && EDITORIAL_IMAGES[i]) || def)
  }, [])

  return (
    <section className="ed" id="editorial">
      <h2 className="ed-hl wrap">Editorial</h2>

      <div className="ed-collage wrap">
        <figure className="ed-fig ed-fig-a">
          <div className="ed-img"><img src={imgs[0]} alt="" draggable="false" /></div>
        </figure>
        <figure className="ed-fig ed-fig-b">
          <div className="ed-img"><img src={imgs[1]} alt="" draggable="false" /></div>
        </figure>
        <figure className="ed-fig ed-fig-c">
          <div className="ed-img"><img src={imgs[2]} alt="" draggable="false" /></div>
        </figure>
      </div>

      <p className="ed-caption mono wrap">Visual Storytelling · OG FILMS · 2024–26</p>
    </section>
  )
}
