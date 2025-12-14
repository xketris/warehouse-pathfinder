import React from 'react';

interface NavigationControlsProps {
  currentSegmentIndex: number;
  segmentsLength: number;
  isAnimating: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onShowFullRoute: () => void;
  onReset: () => void;
  onResetAll: () => void;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentSegmentIndex,
  segmentsLength,
  isAnimating,
  onPrevious,
  onNext,
  onShowFullRoute,
  onReset,
  onResetAll,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <button
        onClick={onPrevious}
        disabled={currentSegmentIndex < 0 || isAnimating}
        className="px-5 py-2.5 bg-slate-100 rounded-xl font-medium border border-slate-300
                 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed 
                 transition-all duration-200"
      >
        ← Previous
      </button>

      <button
        onClick={onNext}
        disabled={currentSegmentIndex >= segmentsLength - 1 || isAnimating}
        className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold
                 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed 
                 transition-all duration-200 shadow-md"
      >
        Next Package →
      </button>

      <div className="h-8 w-px bg-slate-300 mx-2" />

      <button
        onClick={onShowFullRoute}
        disabled={isAnimating}
        className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold
                 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed 
                 transition-all duration-200 shadow-md"
      >
        ▶ Show Full Route
      </button>

      <button
        onClick={onReset}
        className="px-4 py-2.5 bg-slate-100 rounded-xl font-medium border border-slate-300
                 hover:bg-slate-200 transition-all duration-200"
      >
        ↺ Reset
      </button>

      <button
        onClick={onResetAll}
        className="px-4 py-2.5 bg-slate-100 rounded-xl font-medium border border-slate-300
                 hover:bg-red-50 hover:border-red-300 hover:text-red-600 
                 transition-all duration-200 ml-auto"
      >
        🔄 Reset All
      </button>
    </div>
  );
};