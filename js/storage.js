// Reads and writes the shortest times on this device.

const STORAGE_KEY = "tilt-maze-scores";
const LIMIT = 8;

export function createScoreStore(storage = localStorage) {
  return {
    list() {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) return [];
      try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter((time) => Number.isFinite(time)).slice(0, LIMIT);
      } catch {
        return [];
      }
    },
    add(time) {
      const next = [...this.list(), time].sort((a, b) => a - b).slice(0, LIMIT);
      storage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    },
    best() {
      const times = this.list();
      return times.length ? times[0] : null;
    },
    clear() {
      storage.removeItem(STORAGE_KEY);
    },
  };
}
