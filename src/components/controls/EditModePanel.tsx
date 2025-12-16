import React, { useState, useEffect } from 'react';
import { EditMode } from '../../types';

interface EditModePanelProps {
  currentMode: EditMode;
  rows: number;
  cols: number;
  onModeChange: (mode: EditMode) => void;
  onResize: (newRows: number, newCols: number) => void;
}

const EDIT_MODES: { mode: EditMode; label: string }[] = [
  { mode: 'none', label: 'View' },
  { mode: 'wall', label: 'Add Wall' },
  { mode: 'erase', label: 'Erase' },
  { mode: 'package', label: 'Package' },
  { mode: 'start', label: 'Start' },
];

export const EditModePanel: React.FC<EditModePanelProps> = ({
  currentMode,
  rows,
  cols,
  onModeChange,
  onResize,
}) => {
  const [localRows, setLocalRows] = useState(rows);
  const [localCols, setLocalCols] = useState(cols);

  useEffect(() => {
    setLocalRows(rows);
    setLocalCols(cols);
  }, [rows, cols]);

  const handleApplyResize = () => {
    const r = Math.max(3, localRows);
    const c = Math.max(3, localCols);
    onResize(r, c);
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-slate-200 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-slate-700">
          Edit Mode
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {EDIT_MODES.map(({ mode, label }) => (
            <button
              key={mode}
              onClick={() => onModeChange(mode)}
              className={`p-3 rounded-lg font-medium transition-all duration-200 flex flex-col items-center justify-center ${
                currentMode === mode
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <div className="text-xs mt-1">{label}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <h3 className="text-sm font-semibold mb-3 text-slate-500 uppercase tracking-wider">
          Map Size
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs text-slate-500 mb-1">Rows</label>
            <input
              type="number"
              min="3"
              max="50"
              value={localRows}
              onChange={(e) => setLocalRows(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Cols</label>
            <input
              type="number"
              min="3"
              max="50"
              value={localCols}
              onChange={(e) => setLocalCols(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={handleApplyResize}
          className="w-full py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
        >
          Update Size
        </button>
      </div>
    </div>
  );
};