import React, { useState, useCallback, useMemo } from 'react';
import { Point, EditMode } from './types';
import {
  DEFAULT_WAREHOUSE,
  DEFAULT_PACKAGES,
  DEFAULT_START,
} from './constants';
import {
  createPathString,
  getCompletedPath,
  getUpcomingPath,
  getFullRoute,
  getPositionAtProgress,
} from './utils/geometry';

// Hooks
import { usePathfinding } from './hooks/usePathfinding';
import { useAnimation } from './hooks/useAnimation';
import { useDashAnimation } from './hooks/useDashAnimation';
import { useWarehouseEditor } from './hooks/useWarehouseEditor';

// Components
import { Header } from './components/layout/Header';
import { WarehouseGrid } from './components/warehouse/WarehouseGrid';
import { NavigationControls } from './components/controls/NavigationControls';
import { ProgressInfo } from './components/controls/ProgressInfo';
import { EditModePanel } from './components/controls/EditModePanel';
import { RouteOverview } from './components/sidebar/RouteOverview';
import { Legend } from './components/sidebar/Legend';
import { Instructions } from './components/sidebar/Instructions';

// Helper to create a fresh copy of the default warehouse
const createDefaultWarehouse = () => DEFAULT_WAREHOUSE.map((row) => [...row]);
const createDefaultPackages = () => DEFAULT_PACKAGES.map((p) => ({ ...p }));

const App: React.FC = () => {
  // Warehouse state
  const [warehouse, setWarehouse] = useState<number[][]>(createDefaultWarehouse);
  const [packages, setPackages] = useState<Point[]>(createDefaultPackages);
  const [start, setStart] = useState<Point>({ ...DEFAULT_START });
  const [editMode, setEditMode] = useState<EditMode>('none');

  // Pathfinding
  const { segments } = usePathfinding({
    grid: warehouse,
    start,
    packages,
  });

  // Animation
  const {
    currentSegmentIndex,
    animationProgress,
    isAnimating,
    collectedPackages,
    goToNextPackage,
    goToPrevPackage,
    showFullRoute,
    resetNavigation,
  } = useAnimation({
    segments,
  });

  // Dash animation for dotted line
  const dashOffset = useDashAnimation();

  // Warehouse editor
  const { handleCellClick } = useWarehouseEditor({
    warehouse,
    packages,
    start,
    editMode,
    setWarehouse,
    setPackages,
    setStart,
  });

  // Calculate current position
  const currentPosition = useMemo((): Point => {
    if (currentSegmentIndex < 0) {
      return start;
    }

    const segment = segments[currentSegmentIndex];
    if (!segment) return start;

    return getPositionAtProgress(segment.path, animationProgress, start);
  }, [currentSegmentIndex, segments, animationProgress, start]);

  // Memoized path calculations
  const fullRoute = useMemo(() => getFullRoute(segments), [segments]);

  const completedPath = useMemo(
    () => getCompletedPath(segments, currentSegmentIndex, animationProgress),
    [segments, currentSegmentIndex, animationProgress]
  );

  const upcomingPath = useMemo(
    () => getUpcomingPath(segments, currentSegmentIndex, animationProgress, currentPosition),
    [segments, currentSegmentIndex, animationProgress, currentPosition]
  );

  // Path strings for visualization
  const fullRouteString = useMemo(
    () => createPathString(fullRoute),
    [fullRoute]
  );

  const completedPathString = useMemo(
    () => createPathString(completedPath),
    [completedPath]
  );

  const upcomingPathString = useMemo(
    () => createPathString(upcomingPath),
    [upcomingPath]
  );

  // Reset handlers
  const handleReset = useCallback(() => {
    resetNavigation();
  }, [resetNavigation]);

  const handleResetAll = useCallback(() => {
    setWarehouse(createDefaultWarehouse());
    setPackages(createDefaultPackages());
    setStart({ ...DEFAULT_START });
    resetNavigation();
  }, [resetNavigation]);

  const handleEditModeChange = useCallback((mode: EditMode) => {
    setEditMode(mode);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Visualization */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <NavigationControls
                currentSegmentIndex={currentSegmentIndex}
                segmentsLength={segments.length}
                isAnimating={isAnimating}
                onPrevious={goToPrevPackage}
                onNext={goToNextPackage}
                onShowFullRoute={showFullRoute}
                onReset={handleReset}
                onResetAll={handleResetAll}
              />

              <ProgressInfo
                currentSegmentIndex={currentSegmentIndex}
                animationProgress={animationProgress}
                segments={segments}
                collectedPackages={collectedPackages}
                totalPackages={packages.length}
              />

              <WarehouseGrid
                warehouse={warehouse}
                packages={packages}
                start={start}
                segments={segments}
                currentPosition={currentPosition}
                collectedPackages={collectedPackages}
                currentSegmentIndex={currentSegmentIndex}
                isAnimating={isAnimating}
                editMode={editMode}
                fullRouteString={fullRouteString}
                completedPathString={completedPathString}
                upcomingPathString={upcomingPathString}
                dashOffset={dashOffset}
                onCellClick={handleCellClick}
              />
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            <RouteOverview
              segments={segments}
              currentSegmentIndex={currentSegmentIndex}
              animationProgress={animationProgress}
            />

            <EditModePanel
              currentMode={editMode}
              onModeChange={handleEditModeChange}
            />

            <Legend />

            <Instructions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;