import React from 'react';
import { EditMode } from '../../types';

interface EditModePanelProps {
  currentMode: EditMode;
  onModeChange: (mode: EditMode) => void;
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
  onModeChange,
}) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold mb-4 text-slate-700">
        Edit Mode
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {EDIT_MODES.map(({ mode, label }) => (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className={`p-3 rounded-lg font-medium transition-all duration-200 ${
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
  );
};