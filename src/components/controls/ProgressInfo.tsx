import React from 'react';
import type { RouteSegment } from '../../types';

interface ProgressInfoProps {
  currentSegmentIndex: number;
  animationProgress: number;
  segments: RouteSegment[];
  collectedPackages: Set<number>;
  totalPackages: number;
}

export const ProgressInfo: React.FC<ProgressInfoProps> = ({
  currentSegmentIndex,
  animationProgress,
  segments,
  collectedPackages,
  totalPackages,
}) => {
  const currentStopLabel =
    currentSegmentIndex < 0
      ? 'Start'
      : currentSegmentIndex >= segments.length - 1 && animationProgress >= 1
      ? 'Complete'
      : `Package ${
          segments[currentSegmentIndex]?.packageIndex !== null
            ? segments[currentSegmentIndex].packageIndex! + 1
            : 'Return'
        }`;

  const nextStopLabel =
    currentSegmentIndex < segments.length - 1
      ? segments[currentSegmentIndex + 1]?.packageIndex !== null
        ? `Package ${segments[currentSegmentIndex + 1].packageIndex! + 1}`
        : 'Return to Start'
      : 'Complete';

  return (
    <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-slate-500">Current Location</span>
          <div className="text-lg font-semibold text-slate-800">
            {currentStopLabel}
          </div>
        </div>

        <div className="text-center">
          <span className="text-sm text-slate-500">Packages Collected</span>
          <div className="text-2xl font-bold text-emerald-600">
            {collectedPackages.size} / {totalPackages}
          </div>
        </div>

        <div className="text-right">
          <span className="text-sm text-slate-500">Next Stop</span>
          <div className="text-lg font-semibold text-blue-600">
            {currentSegmentIndex < segments.length - 1 ? nextStopLabel : '—'}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex gap-1">
          {segments.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-2 rounded-full overflow-hidden bg-slate-200"
            >
              <div
                className={`h-full transition-all duration-300 ${
                  i < currentSegmentIndex
                    ? 'bg-emerald-500'
                    : i === currentSegmentIndex
                    ? 'bg-blue-500'
                    : 'bg-transparent'
                }`}
                style={{
                  width:
                    i === currentSegmentIndex
                      ? `${animationProgress * 100}%`
                      : i < currentSegmentIndex
                      ? '100%'
                      : '0%',
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1 text-xs text-slate-400">
          <span>Start</span>
          {segments.map((seg, i) => (
            <span key={i}>
              {seg.packageIndex !== null ? `P${seg.packageIndex + 1}` : 'End'}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};