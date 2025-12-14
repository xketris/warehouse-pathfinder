import React from 'react';
import type { Point } from '../../types';
import { CELL_SIZE } from '../../constants';

interface RobotProps {
  position: Point;
  isAnimating: boolean;
}

export const Robot: React.FC<RobotProps> = ({ position, isAnimating }) => {
  return (
    <g
      style={{
        transform: `translate(${position.x * CELL_SIZE + CELL_SIZE / 2}px, ${
          position.y * CELL_SIZE + CELL_SIZE / 2
        }px)`,
        transition: isAnimating ? 'none' : 'transform 0.15s ease-out',
      }}
    >
      <ellipse rx={12} ry={4} cy={14} fill="#00000020" />

      <circle r={16} fill="#3b82f6" stroke="#2563eb" strokeWidth="3" />

      <circle r={3} fill="white" cx="-5" cy="-2" />
      <circle r={3} fill="white" cx="5" cy="-2" />
      <circle r={1.5} fill="#1e3a8a" cx="-5" cy="-2" />
      <circle r={1.5} fill="#1e3a8a" cx="5" cy="-2" />
      <path
        d="M -5 5 Q 0 9 5 5"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  );
};