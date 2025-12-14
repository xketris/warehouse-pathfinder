import { useCallback } from 'react';
import { Point, EditMode } from '../types';

interface UseWarehouseEditorProps {
  warehouse: number[][];
  packages: Point[];
  start: Point;
  editMode: EditMode;
  setWarehouse: React.Dispatch<React.SetStateAction<number[][]>>;
  setPackages: React.Dispatch<React.SetStateAction<Point[]>>;
  setStart: React.Dispatch<React.SetStateAction<Point>>;
}

interface UseWarehouseEditorReturn {
  handleCellClick: (x: number, y: number) => void;
}

export const useWarehouseEditor = ({
  warehouse,
  packages,
  start,
  editMode,
  setWarehouse,
  setPackages,
  setStart,
}: UseWarehouseEditorProps): UseWarehouseEditorReturn => {
  const handleCellClick = useCallback(
    (x: number, y: number) => {
      if (editMode === 'none') return;

      switch (editMode) {
        case 'wall':
          if (warehouse[y][x] === 0) {
            // Don't place wall on start or packages
            if (start.x === x && start.y === y) return;
            if (packages.some((p) => p.x === x && p.y === y)) return;

            setWarehouse((prev) =>
              prev.map((row, ry) =>
                row.map((cell, cx) => (cx === x && ry === y ? 1 : cell))
              )
            );
          }
          break;

        case 'erase':
          if (warehouse[y][x] === 1) {
            setWarehouse((prev) =>
              prev.map((row, ry) =>
                row.map((cell, cx) => (cx === x && ry === y ? 0 : cell))
              )
            );
          }
          break;

        case 'package':
          if (warehouse[y][x] === 1) return;
          if (start.x === x && start.y === y) return;

          setPackages((prev) => {
            const existingIdx = prev.findIndex((p) => p.x === x && p.y === y);
            if (existingIdx >= 0) {
              return prev.filter((_, i) => i !== existingIdx);
            }
            return [...prev, { x, y }];
          });
          break;

        case 'start':
          if (warehouse[y][x] === 0) {
            setStart({ x, y });
          }
          break;
      }
    },
    [editMode, warehouse, packages, start, setWarehouse, setPackages, setStart]
  );

  return { handleCellClick };
};