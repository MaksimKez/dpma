// Shows one screen at a time and follows the buttons between them.

export function mountScreens(root) {
  const screens = [...root.querySelectorAll("[data-screen]")];

  function show(name) {
    for (const screen of screens) {
      screen.hidden = screen.dataset.screen !== name;
    }
  }

  root.addEventListener("click", (event) => {
    const button = event.target.closest("[data-go]");
    if (!button || !root.contains(button)) return;
    show(button.dataset.go);
  });

  show("menu");
}
