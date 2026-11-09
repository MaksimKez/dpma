# Tilt Maze

A maze game that will roll a ball when the phone is tilted.

## Layout

- `index.html` — page shell
- `css/styles.css` — page styles
- `js/app.js` — wires modules together
- `js/screens.js` — which screen is visible
- `js/maze.js` — maze layout
- `js/motion.js` — ball movement
- `js/time.js` — run timer text
- `js/scoreList.js` — scores screen text
- `js/storage.js` — saved times
- `js/orientation.js` — tilt input
- `js/feedback.js` — vibration
- `sw.js` — offline cache
- `manifest.webmanifest` — install metadata
- `icons/` — home screen icons, 192 and 512

The page has three screens: menu, game, and scores. Play builds a maze. Arrow keys or WASD roll the ball to the green exit. The timer stops when it arrives, and that time is stored on the device.

Open the folder with any static server, then open the site root. A `file://` address blocks the module script.
