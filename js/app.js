// Starts the page, runs the chosen maze, and keeps the best times on this device.

import { createGame } from "./game.js";
import { showScores } from "./scoreList.js";
import { mountScreens } from "./screens.js";
import { createScoreStore } from "./storage.js";

const scores = createScoreStore();
const root = document.body;
let level = "easy";

const game = createGame({
  canvas: document.querySelector(".board"),
  timer: document.querySelector(".timer span"),
  hintButton: document.querySelector("[data-action='hint']"),
  onFinish(time) {
    scores.add(time);
    showScores(root, scores);
  },
});

document.querySelector("[data-action='hint']").addEventListener("click", () => {
  game.revealPath();
});

document.querySelector("[data-action='clear']").addEventListener("click", () => {
  scores.clear();
  showScores(root, scores);
});

showScores(root, scores);

mountScreens(root, {
  onShow(name, chosen) {
    if (name === "game") {
      if (chosen) level = chosen;
      game.start(level);
    } else game.stop();
    showScores(root, scores);
  },
});
