import { Point, RouteSegment } from '../types';
import { CELL_SIZE } from '../constants';

export const getPositionAtProgress = (
  path: Point[],
  progress: number,
  defaultPoint: Point
): Point => {
  if (!path || path.length === 0) return defaultPoint;

  const safeProgress = Math.max(0, Math.min(1, progress));

  if (safeProgress >= 1) {
    return path[path.length - 1];
  }

  const exactIndex = safeProgress * (path.length - 1);
  const idx = Math.floor(exactIndex);
  const fraction = exactIndex - idx;

  if (idx >= path.length - 1) {
    return path[path.length - 1];
  }

  const current = path[idx];
  const next = path[idx + 1];

  if (!current || !next) {
    return current || path[path.length - 1] || defaultPoint;
  }

  return {
    x: current.x + (next.x - current.x) * fraction,
    y: current.y + (next.y - current.y) * fraction,
  };
};

export const createPathString = (points: Point[]): string => {
  if (!points || points.length < 2) return '';
  return points
    .map(
      (p, i) =>
        `${i === 0 ? 'M' : 'L'} ${p.x * CELL_SIZE + CELL_SIZE / 2} ${
          p.y * CELL_SIZE + CELL_SIZE / 2
        }`
    )
    .join(' ');
};

export const getCompletedPath = (
  segments: RouteSegment[],
  currentSegmentIndex: number,
  animationProgress: number
): Point[] => {
  const completedPath: Point[] = [];

  for (let i = 0; i < currentSegmentIndex; i++) {
    const segment = segments[i];
    if (segment && segment.path) {
       if (i === 0) {
         completedPath.push(...segment.path);
       } else {
         completedPath.push(...segment.path.slice(1));
       }
    }
  }

  if (currentSegmentIndex >= 0 && segments[currentSegmentIndex]) {
    const segment = segments[currentSegmentIndex];
    const path = segment.path;
    
    const safeProgress = Math.max(0, Math.min(1, animationProgress));
    
    const exactIndex = safeProgress * (path.length - 1);
    const idx = Math.floor(exactIndex);
    const fraction = exactIndex - idx;

    const partialPath = path.slice(0, idx + 1);

    if (fraction > 0 && idx < path.length - 1) {
      const current = path[idx];
      const next = path[idx + 1];
      if (current && next) {
        partialPath.push({
          x: current.x + (next.x - current.x) * fraction,
          y: current.y + (next.y - current.y) * fraction,
        });
      }
    }

    if (completedPath.length === 0) {
      completedPath.push(...partialPath);
    } else {
      completedPath.push(...partialPath.slice(1));
    }
  }

  return completedPath;
};

export const getUpcomingPath = (
  segments: RouteSegment[],
  currentSegmentIndex: number,
  animationProgress: number,
  currentPosition: Point
): Point[] => {
  if (currentSegmentIndex < 0) {
    if (segments.length > 0) {
      return segments[0].path;
    }
    return [];
  }

  const upcomingPath: Point[] = [];

  if (currentSegmentIndex >= 0 && segments[currentSegmentIndex]) {
    const segment = segments[currentSegmentIndex];
    const path = segment.path;
    
    const safeProgress = Math.max(0, Math.min(1, animationProgress));
    const exactIndex = safeProgress * (path.length - 1);
    const idx = Math.ceil(exactIndex);

    if (safeProgress < 1) {
      upcomingPath.push(currentPosition);
      if (idx < path.length) {
         upcomingPath.push(...path.slice(idx));
      }
    }
  }

  for (let i = currentSegmentIndex + 1; i < segments.length; i++) {
      const seg = segments[i];
      if (upcomingPath.length === 0) {
        upcomingPath.push(...seg.path);
      } else {
        upcomingPath.push(...seg.path.slice(1));
      }
  }

  return upcomingPath;
};

export const getFullRoute = (segments: RouteSegment[]): Point[] => {
  const fullRoute: Point[] = [];
  segments.forEach((segment, i) => {
    if (i === 0) {
      fullRoute.push(...segment.path);
    } else {
      fullRoute.push(...segment.path.slice(1));
    }
  });
  return fullRoute;
};