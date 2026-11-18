// Shortest paths through open cells. Every step costs the same, so breadth-first search is enough.

const STEPS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

export function shortestPath(maze, start, goal, blocked = new Set()) {
  const previous = new Map();
  const startKey = key(start);
  const waiting = [start];
  previous.set(startKey, null);

  while (waiting.length) {
    const current = waiting.shift();
    if (current.col === goal.col && current.row === goal.row) break;

    for (const [colStep, rowStep] of STEPS) {
      const next = { col: current.col + colStep, row: current.row + rowStep };
      const mark = maze.grid[next.row]?.[next.col];
      const nextKey = key(next);
      if (!mark || mark === "#" || previous.has(nextKey)) continue;
      if (blocked.has(edgeKey(current, next))) continue;
      previous.set(nextKey, key(current));
      waiting.push(next);
    }
  }

  const goalKey = key(goal);
  if (!previous.has(goalKey)) return [];
  const path = [];
  let cursor = goalKey;
  while (cursor) {
    const [col, row] = cursor.split(",").map(Number);
    path.push({ col, row });
    cursor = previous.get(cursor);
  }
  path.reverse();
  return path;
}

export function twoBestPaths(maze, start, goal) {
  const best = shortestPath(maze, start, goal);
  let second = [];
  let secondCost = Infinity;
  for (let index = 0; index < best.length - 1; index += 1) {
    const blocked = new Set([edgeKey(best[index], best[index + 1])]);
    const candidate = shortestPath(maze, start, goal, blocked);
    if (candidate.length < 2) continue;
    const cost = candidate.length - 1;
    if (cost < secondCost) {
      secondCost = cost;
      second = candidate;
    }
  }
  return { best, second };
}

function edgeKey(from, to) {
  const first = key(from);
  const second = key(to);
  return first < second ? `${first}|${second}` : `${second}|${first}`;
}

function key(cell) {
  return `${cell.col},${cell.row}`;
}
