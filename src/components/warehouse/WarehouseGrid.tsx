import React from 'react';
import type { Point, RouteSegment, EditMode } from '../../types';
import { CELL_SIZE } from '../../constants';
import { GridCell } from './GridCell';
import { Robot } from './Robot';
import { Package } from './Package';
import { StartPoint } from './StartPoint';
import { PathVisualization } from './PathVisualization';

interface WarehouseGridProps {
  warehouse: number[][];
  packages: Point[];
  start: Point;
  segments: RouteSegment[];
  currentPosition: Point;
  collectedPackages: Set<number>;
  currentSegmentIndex: number;
  isAnimating: boolean;
  editMode: EditMode;
  fullRouteString: string;
  completedPathString: string;
  upcomingPathString: string;
  dashOffset: number;
  onCellClick: (x: number, y: number) => void;
}

export const WarehouseGrid: React.FC<WarehouseGridProps> = ({
  warehouse,
  packages,
  start,
  segments,
  currentPosition,
  collectedPackages,
  currentSegmentIndex,
  isAnimating,
  editMode,
  fullRouteString,
  completedPathString,
  upcomingPathString,
  dashOffset,
  onCellClick,
}) => {
  const rows = warehouse.length;
  const cols = warehouse[0].length;

  return (
    <div className="overflow-auto rounded-xl border border-slate-200">
      <svg
        width={cols * CELL_SIZE}
        height={rows * CELL_SIZE}
        className="mx-auto"
        style={{ background: '#f8fafc' }}
      >
        {warehouse.map((row, y) =>
          row.map((cell, x) => (
            <GridCell
              key={`${x}-${y}`}
              x={x}
              y={y}
              isWall={cell === 1}
              isEditable={editMode !== 'none'}
              onClick={onCellClick}
            />
          ))
        )}

        <PathVisualization
          fullRouteString={fullRouteString}
          completedPathString={completedPathString}
          upcomingPathString={upcomingPathString}
          dashOffset={dashOffset}
        />

        {packages.map((pkg, i) => (
          <Package
            key={`pkg-${i}`}
            position={pkg}
            index={i}
            isCollected={collectedPackages.has(i)}
            isNext={segments[currentSegmentIndex + 1]?.packageIndex === i}
          />
        ))}

        <StartPoint position={start} />

        <Robot position={currentPosition} isAnimating={isAnimating} />
      </svg>
    </div>
  );
};