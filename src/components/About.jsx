import { ABOUT_IMAGE } from '../data.js'

export default function About() {
  const imgSrc = ABOUT_IMAGE || '/photos/about.webp'

  return (
    <section className="about wrap" id="about">
      <div className="about-g">
        <div className="about-left">
          <h2>Slow pictures of places that don't ask for attention.</h2>
          <div className="about-img">
            {imgSrc ? (
              <img src={imgSrc} alt="About" draggable="false" />
            ) : (
              <div className="about-ph mono">
                <span>Add Image Here</span>
              </div>
            )}
          </div>
        </div>
        <div>
          <p>
            I make photographs of open country, weathered buildings and rooms with one good window. Most projects
            start with a long walk and no brief, and end as a small set of frames that belong together.
          </p>
          <p>
            Work is shot on medium format and 35mm, printed in short editions, and available for editorial,
            architecture and brand commissions.
          </p>
          <dl className="kit mono">
            <div>
              <dt>Focus</dt>
              <dd>Landscape, interiors</dd>
            </div>
            <div>
              <dt>Formats</dt>
              <dd>120, 35mm, digital</dd>
            </div>
            <div>
              <dt>Prints</dt>
              <dd>Editions of 12</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
