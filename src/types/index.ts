export interface Point {
  x: number;
  y: number;
}

export interface PathNode extends Point {
  g: number;
  h: number;
  f: number;
  parent: PathNode | null;
}

export interface RouteSegment {
  from: Point;
  to: Point;
  path: Point[];
  packageIndex: number | null;
}

export type EditMode = 'none' | 'wall' | 'package' | 'start' | 'erase';

export interface WarehouseState {
  grid: number[][];
  packages: Point[];
  start: Point;
}

export interface NavigationState {
  currentSegmentIndex: number;
  animationProgress: number;
  isAnimating: boolean;
  isShowingFullRoute: boolean;
  collectedPackages: Set<number>;
}