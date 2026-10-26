# Tilt Maze

A maze game that will roll a ball when the phone is tilted.

## Layout

- `index.html` — page shell
- `css/styles.css` — page styles
- `js/app.js` — wires modules together
- `js/screens.js` — which screen is visible
- `js/game.js` — maze, ball, and timer
- `js/storage.js` — saved times
- `js/orientation.js` — tilt input
- `js/feedback.js` — vibration
- `sw.js` — offline cache
- `manifest.webmanifest` — install metadata

The page has three screens: menu, game, and scores. Buttons move between them. The maze itself is not drawn yet.

Open the folder with any static server, then open the site root. A `file://` address blocks the module script.
