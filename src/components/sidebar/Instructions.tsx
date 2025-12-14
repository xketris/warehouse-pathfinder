import React from 'react';

export const Instructions: React.FC = () => {
  return (
    <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
      <h3 className="text-lg font-semibold mb-3 text-blue-800">
        💡 How to Use
      </h3>
      <ul className="space-y-2 text-sm text-blue-700">
        <li>
          • Click <strong>Next Package</strong> to move to the next stop
        </li>
        <li>• Blue dotted line shows the upcoming path</li>
        <li>
          • Click <strong>Show Full Route</strong> to watch the complete
          animation
        </li>
        <li>• Use edit mode to modify the warehouse layout</li>
      </ul>
    </div>
  );
};