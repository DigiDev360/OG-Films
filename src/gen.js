// Procedural sample photographs (ridgelines, sea, a lit room) drawn on a canvas.
// They are stand-ins. Replace them with real images in data.js (see frameSrc).

function rng(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hash(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

const hx = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))

function mix(a, b, t) {
  const A = hx(a)
  const B = hx(b)
  return 'rgb(' + A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',') + ')'
}

// One shared grain tile, used by the images and by the page-wide grain overlay.
const noise = document.createElement('canvas')
noise.width = noise.height = 200
{
  const x = noise.getContext('2d')
  const d = x.createImageData(200, 200)
  for (let i = 0; i < d.data.length; i += 4) {
    const v = Math.random() * 255
    d.data[i] = d.data[i + 1] = d.data[i + 2] = v
    d.data[i + 3] = 255
  }
  x.putImageData(d, 0, 0)
}
document.documentElement.style.setProperty('--noise', `url(${noise.toDataURL('image/png')})`)

const cache = {}

export function gen(p, i, w, h) {
  const key = `${p.id}|${i}|${w}`
  if (cache[key]) return cache[key]

  const R = rng(hash(p.id) + i * 7919)
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const x = c.getContext('2d')
  const [sT, sB, sun, rL, rD] = p.pal

  const g = x.createLinearGradient(0, 0, 0, h)
  g.addColorStop(0, sT)
  g.addColorStop(1, sB)
  x.fillStyle = g
  x.fillRect(0, 0, w, h)

  const sx = w * (0.2 + R() * 0.6)
  const sy = h * (0.18 + R() * 0.3)
  const sr = Math.min(w, h) * (0.05 + R() * 0.07)

  if (p.kind !== 'room') {
    const gl = x.createRadialGradient(sx, sy, 0, sx, sy, sr * 7)
    gl.addColorStop(0, sun + 'cc')
    gl.addColorStop(0.25, sun + '44')
    gl.addColorStop(1, sun + '00')
    x.fillStyle = gl
    x.fillRect(0, 0, w, h)
    x.fillStyle = sun
    x.beginPath()
    x.arc(sx, sy, sr, 0, 7)
    x.fill()
  }

  if (p.kind === 'ridge') {
    const L = 5
    for (let l = 0; l < L; l++) {
      const base = h * (0.5 + l * 0.09 + R() * 0.03)
      const amp = h * (0.11 - l * 0.012)
      const ph = [R() * 6, R() * 6, R() * 6]
      const k = 1000 / w
      const fr = [0.004 + R() * 0.003, 0.011 + R() * 0.006, 0.03 + R() * 0.01]
      x.beginPath()
      x.moveTo(0, h)
      for (let X = 0; X <= w; X += 6) {
        x.lineTo(
          X,
          base -
            amp *
              (0.55 * Math.sin(X * fr[0] * k + ph[0]) +
                0.3 * Math.sin(X * fr[1] * k + ph[1]) +
                0.15 * Math.sin(X * fr[2] * k + ph[2]))
        )
      }
      x.lineTo(w, h)
      x.closePath()
      x.fillStyle = mix(rL, rD, l / (L - 1))
      x.fill()
      const f = x.createLinearGradient(0, base - amp, 0, base + amp * 2.2)
      f.addColorStop(0, sB + '00')
      f.addColorStop(1, sB + '88')
      x.fillStyle = f
      x.fill()
    }
  } else if (p.kind === 'sea') {
    const hy = h * (0.52 + R() * 0.1)
    const sg = x.createLinearGradient(0, hy, 0, h)
    sg.addColorStop(0, rL)
    sg.addColorStop(1, rD)
    x.fillStyle = sg
    x.fillRect(0, hy, w, h - hy)
    for (let y = hy; y < h; y += 3) {
      const t = (y - hy) / (h - hy)
      const ww = sr * (1.5 + t * 5) * (0.4 + R())
      x.fillStyle = sun + Math.floor((1 - t) * 150 + 20).toString(16).padStart(2, '0')
      x.fillRect(sx - ww / 2 + (R() - 0.5) * sr * t * 3, y, ww, 1.6)
    }
    const hz = x.createLinearGradient(0, hy - h * 0.05, 0, hy + h * 0.02)
    hz.addColorStop(0, sB + '00')
    hz.addColorStop(1, sB + 'aa')
    x.fillStyle = hz
    x.fillRect(0, hy - h * 0.05, w, h * 0.07)
  } else {
    const wx = w * (0.16 + R() * 0.3)
    const ww2 = w * 0.26
    const wy = h * 0.12
    const wh = h * 0.42
    x.fillStyle = rD
    x.fillRect(0, h * 0.82, w, h * 0.18)
    x.fillStyle = sun
    x.fillRect(wx, wy, ww2, wh)
    x.beginPath()
    x.moveTo(wx, wy + wh)
    x.lineTo(wx + ww2, wy + wh)
    x.lineTo(wx + ww2 + w * 0.35, h * 0.98)
    x.lineTo(wx + w * 0.18, h * 0.98)
    x.closePath()
    x.fillStyle = sun + '55'
    x.fill()
    x.fillStyle = rD
    x.fillRect(wx + ww2 / 2 - 3, wy, 6, wh)
    x.fillRect(wx, wy + wh * 0.5 - 3, ww2, 6)
    const vx = w * (0.62 + R() * 0.2)
    const vb = h * 0.82
    x.beginPath()
    x.ellipse(vx, vb - h * 0.06, w * 0.035, h * 0.06, 0, 0, 7)
    x.fill()
    x.fillRect(vx - w * 0.012, vb - h * 0.16, w * 0.024, h * 0.06)
  }

  const v = x.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.8)
  v.addColorStop(0, 'rgba(0,0,0,0)')
  v.addColorStop(1, 'rgba(70,8,8,.5)')
  x.fillStyle = v
  x.fillRect(0, 0, w, h)

  x.globalCompositeOperation = 'overlay'
  x.globalAlpha = 0.35
  x.fillStyle = x.createPattern(noise, 'repeat')
  x.fillRect(0, 0, w, h)

  return (cache[key] = c.toDataURL('image/jpeg', 0.84))
}
