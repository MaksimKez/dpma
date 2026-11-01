// Formats a run length as m:ss.t.

export function formatTime(ms) {
  const tenths = Math.floor(ms / 100);
  const minutes = Math.floor(tenths / 600);
  const seconds = Math.floor(tenths / 10) % 60;
  const fraction = tenths % 10;
  return `${minutes}:${String(seconds).padStart(2, "0")}.${fraction}`;
}
