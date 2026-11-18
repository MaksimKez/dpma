// Moves the ball in canvas pixels. Origin is the top-left corner, x grows right, y grows down.

const ACCEL = 1400;
const DRAG = 2.4;
const MAX_SPEED = 320;

export function createBall(cell, cellSize, radius) {
  return {
    x: (cell.col + 0.5) * cellSize,
    y: (cell.row + 0.5) * cellSize,
    vx: 0,
    vy: 0,
    radius,
  };
}

export function stepBall(ball, maze, cellSize, input, dt) {
  const ax = (Number(input.right) - Number(input.left)) * ACCEL;
  const ay = (Number(input.down) - Number(input.up)) * ACCEL;
  ball.vx = clamp(ball.vx + ax * dt, -MAX_SPEED, MAX_SPEED);
  ball.vy = clamp(ball.vy + ay * dt, -MAX_SPEED, MAX_SPEED);
  const drag = Math.exp(-DRAG * dt);
  ball.vx *= drag;
  ball.vy *= drag;

  // Move one axis at a time. If the circle overlaps a wall, put it back and stop that axis.
  let hit = false;
  const speedX = ball.vx;
  ball.x += ball.vx * dt;
  if (overlapsWall(ball, maze, cellSize)) {
    if (Math.abs(speedX) > 40) hit = true;
    ball.x -= ball.vx * dt;
    ball.vx = 0;
  }
  const speedY = ball.vy;
  ball.y += ball.vy * dt;
  if (overlapsWall(ball, maze, cellSize)) {
    if (Math.abs(speedY) > 40) hit = true;
    ball.y -= ball.vy * dt;
    ball.vy = 0;
  }
  return hit;
}

function overlapsWall(ball, maze, cellSize) {
  const minCol = Math.max(0, Math.floor((ball.x - ball.radius) / cellSize));
  const maxCol = Math.min(maze.cols - 1, Math.floor((ball.x + ball.radius) / cellSize));
  const minRow = Math.max(0, Math.floor((ball.y - ball.radius) / cellSize));
  const maxRow = Math.min(maze.rows - 1, Math.floor((ball.y + ball.radius) / cellSize));

  for (let row = minRow; row <= maxRow; row += 1) {
    for (let col = minCol; col <= maxCol; col += 1) {
      if (maze.grid[row][col] !== "#") continue;
      if (circleHitsCell(ball, col, row, cellSize)) return true;
    }
  }
  return false;
}

function circleHitsCell(ball, col, row, cellSize) {
  const left = col * cellSize;
  const top = row * cellSize;
  const nearestX = clamp(ball.x, left, left + cellSize);
  const nearestY = clamp(ball.y, top, top + cellSize);
  const dx = ball.x - nearestX;
  const dy = ball.y - nearestY;
  return dx * dx + dy * dy < ball.radius * ball.radius;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function isInCell(ball, cell, cellSize) {
  const col = Math.floor(ball.x / cellSize);
  const row = Math.floor(ball.y / cellSize);
  return col === cell.col && row === cell.row;
}

export function touchesCell(ball, cell, cellSize) {
  return circleHitsCell(ball, cell.col, cell.row, cellSize);
}
