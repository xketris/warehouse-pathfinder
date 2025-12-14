import React from 'react';
import { EditMode } from '../../types';

interface EditModePanelProps {
  currentMode: EditMode;
  onModeChange: (mode: EditMode) => void;
}

const EDIT_MODES: { mode: EditMode; icon: string; label: string }[] = [
  { mode: 'none', icon: '👁️', label: 'View' },
  { mode: 'wall', icon: '🧱', label: 'Add Wall' },
  { mode: 'erase', icon: '🗑️', label: 'Erase' },
  { mode: 'package', icon: '📦', label: 'Package' },
  { mode: 'start', icon: '🚩', label: 'Start' },
];

export const EditModePanel: React.FC<EditModePanelProps> = ({
  currentMode,
  onModeChange,
}) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold mb-4 text-slate-700">
        ✏️ Edit Mode
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {EDIT_MODES.map(({ mode, icon, label }) => (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className={`p-3 rounded-lg font-medium transition-all duration-200 ${
              currentMode === mode
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <span className="text-xl">{icon}</span>
            <div className="text-xs mt-1">{label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};