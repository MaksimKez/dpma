// Turns device tilt into movement for the ball.

export function createTiltInput() {
  return {
    read() {
      return { x: 0, y: 0 };
    },
  };
}
