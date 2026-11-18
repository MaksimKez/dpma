# Tilt Maze

A maze game that will roll a ball when the phone is tilted.

## Layout

- `index.html` — page shell
- `css/styles.css` — page styles
- `js/app.js` — wires modules together
- `js/screens.js` — which screen is visible
- `js/game.js` — maze, ball, and timer
- `js/path.js` — shortest paths for the hint
- `js/storage.js` — saved times
- `js/orientation.js` — tilt input
- `js/feedback.js` — vibration
- `sw.js` — offline cache
- `manifest.webmanifest` — install metadata
- `icons/` — home screen icons, 192 and 512

The page has three screens: menu, game, and scores. Easy, Hard, and Very hard each build a new maze. Arrow keys or WASD roll the ball. The timer stops at the green exit, and that time is stored on the device. On Very hard, Hint uses breadth-first search: yellow is the shortest path, blue is the next shortest different path. A wall hit vibrates once. The exit vibrates in a short pattern. Buttons on the game screen move the ball when tilt is not available.

Open the folder with any static server, then open the site root. A `file://` address blocks the module script.
