import React from 'react';
import type{ Point } from '../../types';
import { CELL_SIZE } from '../../constants';

interface StartPointProps {
  position: Point;
}

export const StartPoint: React.FC<StartPointProps> = ({ position }) => {
  return (
    <g
      transform={`translate(${position.x * CELL_SIZE + CELL_SIZE / 2}, ${
        position.y * CELL_SIZE + CELL_SIZE / 2
      })`}
    >
      <circle r={14} fill="#22c55e" stroke="#16a34a" strokeWidth="3" />
      <text
        textAnchor="middle"
        dy="4"
        fontSize="10"
        fontWeight="bold"
        fill="white"
      >
        START
      </text>
    </g>
  );
};