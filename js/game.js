// Draws one run and keeps the timer until the ball reaches the exit.

import { createMaze, findCell } from "./maze.js";
import { createBall, stepBall, touchesCell } from "./motion.js";
import { twoBestPaths } from "./path.js";
import { formatTime } from "./time.js";

const LEVELS = {
  easy: 11,
  hard: 21,
  "very-hard": 31,
};

export function createGame({ canvas, timer, hintButton, tiltNote, feedback, onFinish }) {
  const keys = { left: false, right: false, up: false, down: false };
  let maze = createMaze();
  let frame = 0;
  let running = false;
  let finished = false;
  let startedAt = 0;
  let ball = null;
  let route = [];
  let alternate = [];
  let level = "easy";

  function onKey(event, pressed) {
    const control = keyControl(event.key);
    if (!control || !running) return;
    keys[control] = pressed;
    event.preventDefault();
  }

  function onKeyDown(event) {
    onKey(event, true);
  }

  function onKeyUp(event) {
    onKey(event, false);
  }

  const held = new Map();

  function heldDirection(event) {
    const button = event.target.closest("[data-hold]");
    if (!button || !running) return "";
    return button.dataset.hold;
  }

  function onPointerDown(event) {
    const direction = heldDirection(event);
    if (!direction) return;
    held.set(event.pointerId, direction);
    keys[direction] = true;
    event.target.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  }

  function onPointerUp(event) {
    const direction = held.get(event.pointerId);
    if (!direction) return;
    held.delete(event.pointerId);
    keys[direction] = false;
  }

  function tick(now) {
    if (!running) return;
    const cellSize = canvas.width / maze.cols;
    if (!finished) {
      if (stepBall(ball, maze, cellSize, keys, 1 / 60)) feedback.hit();
      const elapsed = now - startedAt;
      timer.textContent = formatTime(elapsed);
      if (touchesCell(ball, findCell(maze, "E"), cellSize)) {
        finished = true;
        feedback.finish();
        onFinish?.(elapsed);
      }
    }
    draw(cellSize, maze, route, alternate);
    frame = requestAnimationFrame(tick);
  }

  function draw(cellSize, levelGrid, path, otherPath) {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCells(context, levelGrid, cellSize);
    drawRoute(context, otherPath, cellSize, "#7eb6d9");
    drawRoute(context, path, cellSize, "#e6c15a");
    context.beginPath();
    context.fillStyle = "#d7e2ea";
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();
  }

  return {
    start(nextLevel = level) {
      this.stop();
      level = LEVELS[nextLevel] ? nextLevel : "easy";
      maze = createMaze(LEVELS[level], LEVELS[level]);
      route = [];
      alternate = [];
      fitCanvas(canvas);
      const cellSize = canvas.width / maze.cols;
      ball = createBall(findCell(maze, "S"), cellSize, cellSize * 0.28);
      finished = false;
      startedAt = performance.now();
      timer.textContent = "0:00.0";
      hintButton.hidden = level !== "very-hard";
      hintButton.disabled = false;
      running = true;
      tiltNote.hidden = false;
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
      window.addEventListener("keyup", onKeyUp);
      frame = requestAnimationFrame(tick);
    },
    stop() {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      keys.left = keys.right = keys.up = keys.down = false;
    },
    revealPath() {
      if (!running || level !== "very-hard" || !ball) return;
      const cellSize = canvas.width / maze.cols;
      const here = {
        col: Math.min(maze.cols - 1, Math.max(0, Math.floor(ball.x / cellSize))),
        row: Math.min(maze.rows - 1, Math.max(0, Math.floor(ball.y / cellSize))),
      };
      const paths = twoBestPaths(maze, here, findCell(maze, "E"));
      route = paths.best;
      alternate = paths.second;
      hintButton.disabled = true;
    },
  };
}

function drawRoute(context, path, cellSize, color) {
  context.fillStyle = color;
  const pad = cellSize * 0.32;
  for (const cell of path) {
    context.fillRect(cell.col * cellSize + pad, cell.row * cellSize + pad, cellSize - pad * 2, cellSize - pad * 2);
  }
}

function drawCells(context, levelGrid, cellSize) {
  for (let row = 0; row < levelGrid.rows; row += 1) {
    for (let col = 0; col < levelGrid.cols; col += 1) {
      const mark = levelGrid.grid[row][col];
      context.fillStyle = mark === "#" ? "#d7e2ea" : mark === "E" ? "#7dcea0" : "#151b20";
      context.fillRect(col * cellSize, row * cellSize, cellSize + 0.5, cellSize + 0.5);
    }
  }
}

function fitCanvas(canvas) {
  const size = Math.floor(canvas.clientWidth * window.devicePixelRatio);
  canvas.width = size;
  canvas.height = size;
}

function keyControl(key) {
  if (key === "ArrowLeft" || key === "a" || key === "A") return "left";
  if (key === "ArrowRight" || key === "d" || key === "D") return "right";
  if (key === "ArrowUp" || key === "w" || key === "W") return "up";
  if (key === "ArrowDown" || key === "s" || key === "S") return "down";
  return "";
}
