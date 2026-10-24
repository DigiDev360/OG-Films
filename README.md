# Ira Kapoor Photography

A red and cream photography portfolio built with React and Vite.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in /dist
npm run preview  # preview the build
```

Needs Node 18 or newer.

## Make it yours

1. **Name and email**: edit `CFG` at the top of `src/data.js`. Also update the name in `index.html`
   (the `<title>`) and the text in `src/components/Hero.jsx` and `src/components/About.jsx`.
2. **Projects**: edit the `PROJECTS` array in `src/data.js`. Each project has a title, category, year,
   place, a short blurb and `n` (how many frames appear on its page).
3. **Real photos**: the images you see are drawn by `src/gen.js` as stand-ins. To use your own, put
   files in `public/photos/` and add a `frames` list to the project:

   ```js
   {
     id: 'dry-season',
     title: 'Dry Season',
     // ...
     frames: ['/photos/dry-season-1.jpg', '/photos/dry-season-2.jpg', '/photos/dry-season-3.jpg'],
   }
   ```

   Frame 1 is the card thumbnail. Frames are laid out wide, then tall left, then tall right, repeating.
   Set `n` to the number of photos you add. Landscape images look best at roughly 3:2, tall ones at 4:5.
4. **Colours and fonts**: the tokens are at the top of `src/styles.css` (`--bg`, `--fg`, `--sand`, `--cream`).

## Structure

```
src/
  App.jsx              page assembly, preloader state, open project state
  data.js              your details, projects, image source helper
  gen.js               sample image generator (delete once you use real photos)
  styles.css           all styling
  components/
    Preloader.jsx      counter and curtain
    Header.jsx  Menu.jsx
    Hero.jsx           slow slideshow
    Work.jsx           draggable slider and list view
    Project.jsx        project page that expands from the clicked card
    Cursor.jsx         custom cursor and list preview
    About.jsx  Contact.jsx
```
