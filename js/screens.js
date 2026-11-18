// Shows one screen at a time and follows the buttons between them.

export function mountScreens(root, hooks = {}) {
  const screens = [...root.querySelectorAll("[data-screen]")];

  function show(name, level) {
    for (const screen of screens) {
      screen.hidden = screen.dataset.screen !== name;
    }
    hooks.onShow?.(name, level);
  }

  root.addEventListener("click", (event) => {
    const button = event.target.closest("[data-go]");
    if (!button || !root.contains(button)) return;
    show(button.dataset.go, button.dataset.level);
  });

  show("menu");
}
