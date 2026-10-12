# Tilt Maze — development tasks

Progressive web game: a ball rolls through a fixed maze when the phone is tilted. Wall hits vibrate. Best times stay on the device and the app works offline.

Stack: HTML, CSS, JavaScript. Screens may use a UI framework. Game rules, physics, storage, device APIs, and the service worker stay in plain JavaScript. Hosting: Cloudflare Pages (HTTPS).

## Branches and pull requests

- `main` — only merged, reviewable increments.
- `dev` — integration branch. Each task is a short-lived branch cut from `dev`, opened as a pull request into `dev`.
- When a task is accepted, merge it into `dev`. Promote `dev` to `main` when a milestone is stable (after tasks 1–3, 4–6, and 7–9).

Suggested branch names: `task-1-scaffold`, `task-2-screens`, and so on.

Each pull request should stay small, leave the app runnable, and say in the description which course criterion it covers.

## Tasks

### 1. Project scaffold

Create the folder layout and an empty page that loads in a browser.

- `index.html`, `css/styles.css`, `js/app.js`
- Page title and a single visible heading so the file is obviously the app shell
- Comment at the top of each file stating its role

Done when the page opens locally (any static server or the browser) and shows that heading.

### 2. Three screens and navigation

Add three views in `index.html` with a shared layout. No game logic yet.

- Menu: title, short rules, buttons to play and to open scores
- Game: placeholder area for the canvas, timer text, button back to the menu
- Scores: empty list, button back to the menu, button to play again
- Show one view at a time; buttons switch views
- Layout stacks cleanly on a narrow phone and on a desktop window

Done when every button reaches the screen it names and the purpose of each screen is obvious without reading the code.

### 3. Web app manifest and icons

Make the site installable.

- `manifest.webmanifest` with `name`, `short_name`, `start_url`, `display: standalone`, `theme_color`, `background_color`, and icons
- PNG icons at 192 and 512 in `icons/`
- Link the manifest and the theme color from `index.html`

Done when the browser lists the manifest and an install / “Add to Home Screen” action is available over HTTPS (or localhost).

### 4. Maze, ball, and keyboard controls

Implement the game on a canvas. Motion comes from the keyboard first so it can be tested on a laptop.

- `js/game.js` draws a fixed maze (not a random one), a ball, and the exit
- Arrow keys or WASD accelerate the ball; the ball stops on walls
- A timer runs from the start of a run until the ball reaches the exit
- Reaching the exit shows the time on the game screen
- Comments explain the coordinate system and the collision check

Done when a full run can be finished with the keyboard and the ball cannot pass through walls.

### 5. Device orientation and vibration

Connect the phone sensors. Both APIs must change how the game plays, not sit unused.

- While a run is active, `deviceorientation` (`beta` / `gamma`) accelerates the ball the same way the keys do
- On iOS, request orientation permission from the Play button (a user gesture)
- `navigator.vibrate` on a wall hit (short) and on the finish (different pattern)
- If sensors are missing, keyboard and on-screen buttons still work; the UI says tilt is unavailable

Done when tilting a phone moves the ball, hits and the finish vibrate, and a desktop can still finish a level.

### 6. Saved scores

Keep the user’s results on the device.

- `js/storage.js` reads and writes a short list of best times in `localStorage`
- Finishing a run adds a result; the scores screen renders them
- A control clears the list
- The menu shows the best time when one exists

Done when times survive a reload and are still there with the network disabled.

### 7. Service worker and caching

Cache the app shell so every screen opens offline.

- `sw.js` precaches HTML, CSS, JavaScript, the manifest, and icons
- HTML: network-first, then the cache
- CSS, JavaScript, and icons: cache-first
- Cache name includes a version (`tilt-maze-v1`) so a later deploy can drop the old cache
- Register the worker from `js/app.js`
- Comments in `sw.js` state why each resource type uses that strategy

Done when, after one online load, every screen still opens with the network offline (DevTools or airplane mode).

### 8. Offline notice

Tell the user the network is gone and what still works.

- A banner when `navigator.onLine` is false, updated on `online` and `offline`
- Copy states that the maze, controls, and saved scores stay available
- The banner does not block play

Done when going offline shows the banner and coming back online hides it, without losing the current screen or saved times.

### 9. README and deployment notes

Document the project for review and for running it.

- What the app is, technologies, and features
- Dependencies: none
- How to run it locally
- Link to the deployed HTTPS URL (fill in after Cloudflare Pages is connected)
- Which native features are used and how (orientation permission, vibration on hit and finish, keyboard fallback)
- A short justification of the cache strategy for each resource type
- How the three screens connect

Done when a reader can install nothing extra, open the app, and see why the manifest, the two device APIs, and the service worker are there.

## Course criteria map

| Criterion | Tasks |
| --- | --- |
| Installable (manifest, icons, theme, `start_url`) | 3 |
| Two native features with a real role | 5 |
| Offline app and saved data | 6, 7, 8 |
| User is told what works offline | 8 |
| At least three connected views | 2 |
| Responsive layout | 2 |
| Caching strategy per resource type, justified in the README | 7, 9 |
| Readable, commented code | all |
| README: live link, run steps, dependencies, stack, features | 9 |
| Hosted over HTTPS | after 9, Cloudflare Pages from `main` |

## Suggested review order

1. Tasks 1–3: shell, navigation, installability.
2. Tasks 4–6: playable game, sensors, saved times.
3. Tasks 7–9: offline behavior, notice, documentation, then the public URL.
