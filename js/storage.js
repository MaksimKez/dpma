// Reads and writes best times on the device.

const STORAGE_KEY = "tilt-maze-scores";

export function createScoreStore() {
  return {
    key: STORAGE_KEY,
    list() {
      return [];
    },
    add() {},
    clear() {},
  };
}
