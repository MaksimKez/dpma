// Starts the page and runs the maze while the game screen is open.

import { createGame } from "./game.js";
import { mountScreens } from "./screens.js";

const game = createGame({
  canvas: document.querySelector(".board"),
  timer: document.querySelector(".timer span"),
});

mountScreens(document.body, {
  onShow(name) {
    if (name === "game") game.start();
    else game.stop();
  },
});
