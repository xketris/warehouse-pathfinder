import React from 'react';
import type { Point } from '../../types';
import { CELL_SIZE } from '../../constants';

interface PackageProps {
  position: Point;
  index: number;
  isCollected: boolean;
  isNext: boolean;
}

export const Package: React.FC<PackageProps> = ({
  position,
  index,
  isCollected,
  isNext,
}) => {
  return (
    <g
      transform={`translate(${position.x * CELL_SIZE + CELL_SIZE / 2}, ${
        position.y * CELL_SIZE + CELL_SIZE / 2
      })`}
    >
      {/* Highlight ring for next package */}
      {isNext && !isCollected && (
        <circle
          r={20}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="4,4"
          opacity={0.6}
        >
          <animate
            attributeName="r"
            values="18;22;18"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0.3;0.6"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Package box */}
      <rect
        x={-14}
        y={-14}
        width={28}
        height={28}
        fill={isCollected ? '#d1d5db' : '#f59e0b'}
        stroke={isCollected ? '#9ca3af' : '#d97706'}
        strokeWidth="2"
        rx="4"
        className="transition-all duration-300"
        style={{
          transform: isCollected ? 'scale(0.85)' : 'scale(1)',
        }}
      />

      {/* Package content */}
      {isCollected ? (
        <text
          textAnchor="middle"
          dy="5"
          fontSize="16"
          fontWeight="bold"
          fill="#22c55e"
        >
          ✓
        </text>
      ) : (
        <text
          textAnchor="middle"
          dy="5"
          fontSize="13"
          fontWeight="bold"
          fill="#1f2937"
        >
          {index + 1}
        </text>
      )}
    </g>
  );
};