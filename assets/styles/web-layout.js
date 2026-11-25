export function getMenuLayoutForWidth(width) {
  return width >= 760 ? "horizontal" : "compact";
}

export function getGameActionsLayout(platform) {
  return platform === "web" ? "compact" : "directional";
}