import { useMemo } from 'react';
import { Point, RouteSegment } from '../types';
import { findRouteSegments } from '../utils/pathfinding';

interface UsePathfindingProps {
  grid: number[][];
  start: Point;
  packages: Point[];
}

interface UsePathfindingReturn {
  segments: RouteSegment[];
}

export const usePathfinding = ({
  grid,
  start,
  packages,
}: UsePathfindingProps): UsePathfindingReturn => {
  // Use useMemo instead of useState + useEffect
  const segments = useMemo(() => {
    return findRouteSegments(grid, start, packages);
  }, [grid, start, packages]);

  return { segments };
};