import type { Point, PathNode, RouteSegment } from '../types';

const heuristic = (a: Point, b: Point): number => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

export const findPath = (
  grid: number[][],
  start: Point,
  end: Point
): Point[] | null => {
  const rows = grid.length;
  const cols = grid[0].length;

  const openSet: PathNode[] = [];
  const closedSet = new Set<string>();

  const startNode: PathNode = {
    ...start,
    g: 0,
    h: heuristic(start, end),
    f: heuristic(start, end),
    parent: null,
  };

  openSet.push(startNode);

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift()!;

    if (current.x === end.x && current.y === end.y) {
      const path: Point[] = [];
      let node: PathNode | null = current;
      while (node) {
        path.unshift({ x: node.x, y: node.y });
        node = node.parent;
      }
      return path;
    }

    closedSet.add(`${current.x},${current.y}`);

    const neighbors = [
      { x: current.x - 1, y: current.y },
      { x: current.x + 1, y: current.y },
      { x: current.x, y: current.y - 1 },
      { x: current.x, y: current.y + 1 },
    ];

    for (const neighbor of neighbors) {
      if (
        neighbor.x < 0 ||
        neighbor.x >= cols ||
        neighbor.y < 0 ||
        neighbor.y >= rows
      ) {
        continue;
      }

      if (grid[neighbor.y][neighbor.x] === 1) {
        continue;
      }

      if (closedSet.has(`${neighbor.x},${neighbor.y}`)) {
        continue;
      }

      const g = current.g + 1;
      const h = heuristic(neighbor, end);
      const f = g + h;

      const existingIdx = openSet.findIndex(
        (n) => n.x === neighbor.x && n.y === neighbor.y
      );

      if (existingIdx >= 0) {
        if (openSet[existingIdx].g <= g) {
          continue;
        }
        openSet.splice(existingIdx, 1);
      }

      openSet.push({
        ...neighbor,
        g,
        h,
        f,
        parent: current,
      });
    }
  }

  return null;
};

export const findRouteSegments = (
  grid: number[][],
  start: Point,
  packages: Point[]
): RouteSegment[] => {
  if (packages.length === 0) {
    return [];
  }

  const segments: RouteSegment[] = [];
  const remaining = packages.map((p, i) => ({ ...p, originalIndex: i }));
  let current = start;

  while (remaining.length > 0) {
    let nearestIdx = 0;
    let nearestPath: Point[] | null = null;
    let nearestDist = Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const path = findPath(grid, current, remaining[i]);
      if (path && path.length < nearestDist) {
        nearestDist = path.length;
        nearestPath = path;
        nearestIdx = i;
      }
    }

    if (nearestPath) {
      segments.push({
        from: current,
        to: remaining[nearestIdx],
        path: nearestPath,
        packageIndex: remaining[nearestIdx].originalIndex,
      });
      current = remaining[nearestIdx];
      remaining.splice(nearestIdx, 1);
    } else {
      break;
    }
  }

  const returnPath = findPath(grid, current, start);
  if (returnPath) {
    segments.push({
      from: current,
      to: start,
      path: returnPath,
      packageIndex: null,
    });
  }

  return segments;
};