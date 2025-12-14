import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-slate-800 mb-2">
        🏭 Warehouse Navigator
      </h1>
      <p className="text-slate-500">
        Navigate from package to package through the optimal route
      </p>
    </div>
  );
};