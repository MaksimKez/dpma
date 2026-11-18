// Short buzz for a wall, a longer pattern when the ball reaches the exit.

export function createFeedback() {
  return {
    hit() {
      navigator.vibrate?.(12);
    },
    finish() {
      navigator.vibrate?.([28, 36, 64]);
    },
  };
}
