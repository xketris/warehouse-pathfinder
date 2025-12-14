import React from 'react';

interface PathVisualizationProps {
  fullRouteString: string;
  completedPathString: string;
  upcomingPathString: string;
  dashOffset: number;
}

export const PathVisualization: React.FC<PathVisualizationProps> = ({
  fullRouteString,
  completedPathString,
  upcomingPathString,
  dashOffset,
}) => {
  return (
    <>
      {/* Full route (very faint) */}
      {fullRouteString && (
        <path
          d={fullRouteString}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.5}
        />
      )}

      {/* Upcoming path (animated dotted) */}
      {upcomingPathString && (
        <path
          d={upcomingPathString}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8,8"
          strokeDashoffset={-dashOffset}
          opacity={0.6}
        />
      )}

      {/* Completed path (solid) */}
      {completedPathString && (
        <path
          d={completedPathString}
          fill="none"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </>
  );
};