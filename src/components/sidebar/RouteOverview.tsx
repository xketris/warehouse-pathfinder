import React from 'react';
import type { RouteSegment } from '../../types';

interface RouteOverviewProps {
  segments: RouteSegment[];
  currentSegmentIndex: number;
  animationProgress: number;
}

export const RouteOverview: React.FC<RouteOverviewProps> = ({
  segments,
  currentSegmentIndex,
  animationProgress,
}) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold mb-4 text-slate-700">
        📍 Route Overview
      </h3>
      <div className="space-y-2">
        {/* Start */}
        <div
          className={`flex items-center gap-3 p-2 rounded-lg ${
            currentSegmentIndex < 0
              ? 'bg-blue-50 border border-blue-200'
              : 'bg-slate-50'
          }`}
        >
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            S
          </div>
          <span className="text-slate-700">Start</span>
          {currentSegmentIndex < 0 && (
            <span className="ml-auto text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
              Here
            </span>
          )}
        </div>

        {/* Segments */}
        {segments.map((segment, i) => {
          const isCurrent = i === currentSegmentIndex && animationProgress < 1;
          const isCompleted =
            i < currentSegmentIndex ||
            (i === currentSegmentIndex && animationProgress >= 1);
          const isAtThisStop =
            i === currentSegmentIndex && animationProgress >= 1;

          return (
            <div
              key={i}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                isAtThisStop
                  ? 'bg-blue-50 border border-blue-200'
                  : isCurrent
                  ? 'bg-amber-50 border border-amber-200'
                  : isCompleted
                  ? 'bg-emerald-50'
                  : 'bg-slate-50'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  isCompleted
                    ? 'bg-emerald-500 text-white'
                    : segment.packageIndex !== null
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-400 text-white'
                }`}
              >
                {isCompleted
                  ? '✓'
                  : segment.packageIndex !== null
                  ? segment.packageIndex + 1
                  : '⌂'}
              </div>
              <span className="text-slate-700">
                {segment.packageIndex !== null
                  ? `Package ${segment.packageIndex + 1}`
                  : 'Return to Start'}
              </span>
              {isCurrent && (
                <span className="ml-auto text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">
                  Moving...
                </span>
              )}
              {isAtThisStop && (
                <span className="ml-auto text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                  Here
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};