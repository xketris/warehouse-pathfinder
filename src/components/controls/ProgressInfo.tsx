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
  const currentSegment = segments[currentSegmentIndex];
  const nextSegment = segments[currentSegmentIndex + 1];

  const currentStopLabel = (() => {
    if (currentSegmentIndex < 0) return 'Start';
    if (currentSegmentIndex >= segments.length - 1 && animationProgress >= 1) return 'Complete';
    
    if (!currentSegment) return 'Unknown';

    return currentSegment.packageIndex != null
      ? `Package ${currentSegment.packageIndex + 1}`
      : 'Return';
  })();

  const nextStopLabel = (() => {
    if (currentSegmentIndex >= segments.length - 1) return 'Complete';
    
    if (!nextSegment) return '—';

    return nextSegment.packageIndex != null
      ? `Package ${nextSegment.packageIndex + 1}`
      : 'Return to Start';
  })();

  return (
    <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-slate-500 font-medium">Current Location</span>
          <div className="text-lg font-semibold text-slate-800">
            {currentStopLabel}
          </div>
        </div>

        <div className="text-center">
          <span className="text-sm text-slate-500 font-medium">Packages Collected</span>
          <div className="text-2xl font-bold text-emerald-600">
            {collectedPackages.size} / {totalPackages}
          </div>
        </div>

        <div className="text-right">
          <span className="text-sm text-slate-500 font-medium">Next Stop</span>
          <div className="text-lg font-semibold text-blue-600">
            {nextStopLabel}
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
        <div className="flex justify-between mt-1 text-xs text-slate-400 font-medium px-1">
          <span>Start</span>
          {segments.map((seg, i) => (
            <span key={i}>
              {seg.packageIndex != null ? `P${seg.packageIndex + 1}` : 'End'}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};