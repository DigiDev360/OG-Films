import { gen } from './gen.js'

// Your details. Change these first.
export const CFG = {
  name: 'OG FILMS',
  email: 'hello@ogfilms.com',
}

// Custom images for the top Hero slideshow.
// Add image paths here (e.g. ['/photos/hero-1.webp', '/photos/hero-2.webp']).
// If left empty, it will automatically use frames from your projects.
export const HERO_IMAGES = [
  '/photos/hero-1.webp',
]

// Custom images for the Editorial section (3 images).
// Add your photo paths here. If left empty, project frames are used as fallback.
export const EDITORIAL_IMAGES = [
  '/photos/editorial-1.webp',
  '/photos/editorial-2.webp',
  '/photos/editorial-3.webp',
]

// Press & editorial features (shown after Editorial section).
export const PRESS_ITEMS = [
  {
    id: '01',
    title: 'I&A, VILLA AURELIA, ROME',
    publication: 'FEATURED ON VOGUE',
    image: '/photos/editorial-1.webp',
  },
  {
    id: '02',
    title: 'K&A, CASTELLO RUSPOLI',
    publication: 'FEATURED ON VOGUE',
    image: '/photos/editorial-2.webp',
  },
  {
    id: '03',
    title: 'F&F, VILLA AURELIA, ROME',
    publication: "FEATURED ON HARPER'S BAZAAR",
    image: '/photos/editorial-3.webp',
  },
  {
    id: '04',
    title: 'T&P, CASTELLO RUSPOLI',
    publication: 'FEATURED ON VOGUE',
    image: '/photos/red-hour-1.webp',
  },
  {
    id: '05',
    title: 'E&C, VILLA AURELIA, ROME',
    publication: 'FEATURED ON ELLE',
    image: '/photos/monsoon-light-1.webp',
  },
]

// Custom image for the About section.
// Add your photo path here (e.g. '/photos/about.webp').
export const ABOUT_IMAGE = '/photos/about.webp'

// Your projects. `n` is the number of frames shown on the project page.
// To use real photos, add a `frames` array of image URLs (e.g. files in /public):
//   frames: ['/photos/dry-season-1.webp', '/photos/dry-season-2.webp', ...]
// The first frame is also the card thumbnail.
export const PROJECTS = [
  {
    id: 'dry-season',
    title: 'Dry Season',
    cat: 'Landscape',
    year: 2026,
    place: 'Open country',
    n: 3, // Set this to the number of photos in frames
    frames: [
      '/photos/dry-season-1.webp',
      '/photos/dry-season-2.webp',
      '/photos/dry-season-3.webp'
    ],
    blurb: 'Six weeks of walking a river...'
  },

  {
    id: 'low-tide',
    title: 'Low Tide',
    cat: 'Coast',
    year: 2026,
    place: 'Northern shoreline',
    n: 4,
    frames: [
      '/photos/low-tide-1.webp',
      '/photos/low-tide-2.webp',
      '/photos/low-tide-3.webp'
    ],
    kind: 'sea',
    pal: ['#efe0c4', '#e9b9a0', '#fff6e0', '#c2483a', '#7a1a18'],
    blurb:
      'The hour when the water pulls back and the shore becomes a flat mirror. Shot at dawn, always from the same fixed spot.',
  },
  {
    id: 'quiet-rooms',
    title: 'Quiet Rooms',
    cat: 'Interiors',
    year: 2025,
    place: 'Private homes',
    n: 4,
    frames: [
      '/photos/quiet-rooms-1.webp',
      '/photos/quiet-rooms-2.webp',
      '/photos/quiet-rooms-3.webp'
    ],
    kind: 'room',
    pal: ['#ecdcc0', '#d9bea0', '#fff3d2', '#8a2a22', '#5c1512'],
    blurb:
      'Single windows in ordinary rooms. Each picture waits for the moment the light lands on the floor and stays there for about ten minutes.',
  },
  {
    id: 'red-hour',
    title: 'Red Hour',
    cat: 'Landscape',
    year: 2025,
    place: 'High ridgelines',
    n: 3,
    frames: [
      '/photos/red-hour-1.webp',
      '/photos/red-hour-2.webp',
      '/photos/red-hour-3.webp'
    ],
    kind: 'ridge',
    pal: ['#7a1316', '#e7745a', '#ffe9c8', '#8f1f1d', '#3d0809'],
    blurb:
      'The short window after sunset when ridgelines separate into layers of deep red. Long exposures, no artificial light.',
  },
  {
    id: 'monsoon-light',
    title: 'Monsoon Light',
    cat: 'Coast',
    year: 2024,
    place: 'Southern coast',
    n: 4,
    frames: [
      '/photos/monsoon-light-1.webp',
      '/photos/monsoon-light-2.webp',
      '/photos/monsoon-light-3.webp'
    ],
    kind: 'sea',
    pal: ['#c8392c', '#f0c8a6', '#fff0d0', '#8e211c', '#4a0d0c'],
    blurb:
      'Storm weather breaking over a still sea. Pictures made in the gaps between rain, with the horizon held at the same height throughout.',
  },
  {
    id: 'field-notes',
    title: 'Field Notes',
    cat: 'Landscape',
    year: 2024,
    place: 'Farmland',
    n: 4,
    frames: [
      '/photos/field-notes-1.webp',
      '/photos/field-notes-2.webp',
      '/photos/field-notes-3.webp',
    ],
    kind: 'ridge',
    pal: ['#e8d3a8', '#f1b08a', '#fff4d4', '#c4452f', '#6a1612'],
    blurb:
      'A season of harvest fields photographed from the same road. Small changes in colour, week by week, kept in order.',
  },
]

// Returns the image for frame `i` of project `p`. Uses your own photo when `frames` is set,
// otherwise draws a sample picture.
export function frameSrc(p, i, w, h) {
  return p.frames && p.frames[i] ? p.frames[i] : gen(p, i, w, h)
}

export const pad = (n) => String(n).padStart(2, '0')
