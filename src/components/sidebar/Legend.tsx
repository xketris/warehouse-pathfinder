import React from 'react';

export const Legend: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold mb-4 text-slate-700">📋 Legend</h3>
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-slate-500 rounded" />
          <span className="text-slate-600">Shelf / Wall</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center text-xs font-bold text-white">
            1
          </div>
          <span className="text-slate-600">Package</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-emerald-500 rounded-full" />
          <span className="text-slate-600">Start Point</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-500 rounded-full" />
          <span className="text-slate-600">Robot</span>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-1 rounded"
            style={{
              background:
                'repeating-linear-gradient(90deg, #3b82f6 0, #3b82f6 8px, transparent 8px, transparent 16px)',
            }}
          />
          <span className="text-slate-600">Upcoming Path</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-1 bg-emerald-500 rounded" />
          <span className="text-slate-600">Completed Path</span>
        </div>
      </div>
    </div>
  );
};