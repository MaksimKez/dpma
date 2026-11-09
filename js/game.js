// Draws one run and keeps the timer until the ball reaches the exit.

import { createMaze, findCell } from "./maze.js";
import { createBall, stepBall, touchesCell } from "./motion.js";
import { formatTime } from "./time.js";

export function createGame({ canvas, timer, onFinish }) {
  const keys = { left: false, right: false, up: false, down: false };
  let maze = createMaze();
  let frame = 0;
  let running = false;
  let finished = false;
  let startedAt = 0;
  let ball = null;

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

  function tick(now) {
    if (!running) return;
    const cellSize = canvas.width / maze.cols;
    if (!finished) {
      stepBall(ball, maze, cellSize, keys, 1 / 60);
      const elapsed = now - startedAt;
      timer.textContent = formatTime(elapsed);
      if (touchesCell(ball, findCell(maze, "E"), cellSize)) {
        finished = true;
        onFinish?.(elapsed);
      }
    }
    draw(cellSize);
    frame = requestAnimationFrame(tick);
  }

  function draw(cellSize) {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < maze.rows; row += 1) {
      for (let col = 0; col < maze.cols; col += 1) {
        const mark = maze.grid[row][col];
        context.fillStyle = mark === "#" ? "#d7e2ea" : mark === "E" ? "#7dcea0" : "#151b20";
        context.fillRect(col * cellSize, row * cellSize, cellSize + 0.5, cellSize + 0.5);
      }
    }
    context.beginPath();
    context.fillStyle = "#d7e2ea";
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();
  }

  return {
    start() {
      this.stop();
      maze = createMaze();
      const size = Math.floor(canvas.clientWidth * window.devicePixelRatio);
      canvas.width = size;
      canvas.height = size;
      const cellSize = canvas.width / maze.cols;
      ball = createBall(findCell(maze, "S"), cellSize, cellSize * 0.28);
      finished = false;
      startedAt = performance.now();
      timer.textContent = "0:00.0";
      running = true;
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
      frame = requestAnimationFrame(tick);
    },
    stop() {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      keys.left = keys.right = keys.up = keys.down = false;
    },
  };
}

function keyControl(key) {
  if (key === "ArrowLeft" || key === "a" || key === "A") return "left";
  if (key === "ArrowRight" || key === "d" || key === "D") return "right";
  if (key === "ArrowUp" || key === "w" || key === "W") return "up";
  if (key === "ArrowDown" || key === "s" || key === "S") return "down";
  return "";
}
