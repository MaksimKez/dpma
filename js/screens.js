// Shows and hides the app screens. Navigation is filled in later.

export function mountScreens(root, session) {
  root.dataset.ready = "true";
  root.dataset.session = session.game ? "linked" : "missing";
}
