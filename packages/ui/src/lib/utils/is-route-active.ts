// Simple path matcher used by sidebar to highlight active routes.
export function isRouteActive(
  path: string,
  currentPath: string,
  end: boolean = false,
): boolean {
  if (!path) return false;

  if (end) {
    return currentPath === path;
  }

  return currentPath === path || currentPath.startsWith(`${path}/`);
}
