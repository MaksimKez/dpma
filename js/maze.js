// Builds a new maze for each run. "#" is a wall, "." is open, "S" is the start, "E" is the exit.

export function createMaze(cols = 21, rows = 21) {
  const width = cols % 2 === 0 ? cols + 1 : cols;
  const height = rows % 2 === 0 ? rows + 1 : rows;
  const grid = Array.from({ length: height }, () => Array(width).fill("#"));
  carve(grid, 1, 1);
  grid[1][1] = "S";
  grid[height - 2][width - 2] = "E";
  return { grid, cols: width, rows: height };
}

export function findCell(maze, mark) {
  for (let row = 0; row < maze.rows; row += 1) {
    for (let col = 0; col < maze.cols; col += 1) {
      if (maze.grid[row][col] === mark) return { col, row };
    }
  }
  return null;
}

function carve(grid, col, row) {
  grid[row][col] = ".";
  const directions = shuffle([
    [0, -2],
    [0, 2],
    [-2, 0],
    [2, 0],
  ]);
  for (const [colStep, rowStep] of directions) {
    const nextCol = col + colStep;
    const nextRow = row + rowStep;
    if (!grid[nextRow] || grid[nextRow][nextCol] !== "#") continue;
    grid[row + rowStep / 2][col + colStep / 2] = ".";
    carve(grid, nextCol, nextRow);
  }
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}
