// Paints saved times into the menu and the scores screen.

import { formatTime } from "./time.js";

export function showScores(root, store) {
  const times = store.list();
  const list = root.querySelector(".score-list");
  const empty = root.querySelector(".score-empty");
  list.replaceChildren(
    ...times.map((time) => {
      const item = document.createElement("li");
      item.textContent = formatTime(time);
      return item;
    }),
  );
  empty.hidden = times.length > 0;

  const best = root.querySelector(".best");
  const fastest = store.best();
  best.hidden = fastest === null;
  best.textContent = fastest === null ? "" : `Best ${formatTime(fastest)}`;
}
