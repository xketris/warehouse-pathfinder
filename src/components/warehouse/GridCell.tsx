import React from 'react';
import { CELL_SIZE } from '../../constants';

interface GridCellProps {
  x: number;
  y: number;
  isWall: boolean;
  isEditable: boolean;
  onClick: (x: number, y: number) => void;
}

export const GridCell: React.FC<GridCellProps> = ({
  x,
  y,
  isWall,
  isEditable,
  onClick,
}) => {
  return (
    <g>
      <rect
        x={x * CELL_SIZE}
        y={y * CELL_SIZE}
        width={CELL_SIZE}
        height={CELL_SIZE}
        fill={isWall ? '#64748b' : '#ffffff'}
        stroke="#e2e8f0"
        strokeWidth="1"
        onClick={() => onClick(x, y)}
        className={`${
          isEditable ? 'cursor-pointer hover:opacity-80' : ''
        } transition-opacity`}
      />
      {isWall && (
        <>
          <line
            x1={x * CELL_SIZE + 6}
            y1={y * CELL_SIZE + CELL_SIZE / 3}
            x2={x * CELL_SIZE + CELL_SIZE - 6}
            y2={y * CELL_SIZE + CELL_SIZE / 3}
            stroke="#94a3b8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1={x * CELL_SIZE + 6}
            y1={y * CELL_SIZE + (2 * CELL_SIZE) / 3}
            x2={x * CELL_SIZE + CELL_SIZE - 6}
            y2={y * CELL_SIZE + (2 * CELL_SIZE) / 3}
            stroke="#94a3b8"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
    </g>
  );
};