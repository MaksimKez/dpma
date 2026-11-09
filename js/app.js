// Starts the page, runs the maze, and keeps the best times on this device.

import { createGame } from "./game.js";
import { showScores } from "./scoreList.js";
import { mountScreens } from "./screens.js";
import { createScoreStore } from "./storage.js";

const scores = createScoreStore();
const root = document.body;

const game = createGame({
  canvas: document.querySelector(".board"),
  timer: document.querySelector(".timer span"),
  onFinish(time) {
    scores.add(time);
    showScores(root, scores);
  },
});

document.querySelector("[data-action='clear']").addEventListener("click", () => {
  scores.clear();
  showScores(root, scores);
});

showScores(root, scores);

mountScreens(root, {
  onShow(name) {
    if (name === "game") game.start();
    else game.stop();
    showScores(root, scores);
  },
});
