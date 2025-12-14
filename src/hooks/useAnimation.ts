import { useReducer, useEffect, useRef, useCallback } from 'react';
import { RouteSegment } from '../types';
import { ANIMATION_SPEED } from '../constants';

interface AnimationState {
  currentSegmentIndex: number;
  animationProgress: number;
  isAnimating: boolean;
  isShowingFullRoute: boolean;
  collectedPackages: Set<number>;
}

type AnimationAction =
  | { type: 'RESET' }
  | { type: 'START_NEXT_SEGMENT'; nextIndex: number }
  | { type: 'START_PREV_SEGMENT'; prevIndex: number; uncollectPackageIndex: number | null }
  | { type: 'START_FULL_ROUTE' }
  | { type: 'UPDATE_PROGRESS'; progress: number }
  | { type: 'COMPLETE_SEGMENT'; packageIndex: number | null }
  | { type: 'MOVE_TO_NEXT_SEGMENT_IN_FULL_ROUTE'; nextIndex: number; collectedPackageIndex: number | null }
  | { type: 'COMPLETE_FULL_ROUTE'; finalIndex: number; allPackageIndices: number[] }
  | { type: 'STOP_ANIMATION' };

const animationReducer = (
  state: AnimationState,
  action: AnimationAction
): AnimationState => {
  switch (action.type) {
    case 'RESET':
      return {
        currentSegmentIndex: -1,
        animationProgress: 0,
        isAnimating: false,
        isShowingFullRoute: false,
        collectedPackages: new Set(),
      };

    case 'START_NEXT_SEGMENT':
      return {
        ...state,
        currentSegmentIndex: action.nextIndex,
        animationProgress: 0,
        isAnimating: true,
        isShowingFullRoute: false,
      };

    case 'START_PREV_SEGMENT': {
      const newCollected = new Set(state.collectedPackages);
      if (action.uncollectPackageIndex !== null) {
        newCollected.delete(action.uncollectPackageIndex);
      }
      return {
        ...state,
        currentSegmentIndex: action.prevIndex,
        animationProgress: action.prevIndex >= 0 ? 1 : 0,
        isAnimating: false,
        collectedPackages: newCollected,
      };
    }

    case 'START_FULL_ROUTE':
      return {
        ...state,
        currentSegmentIndex: 0,
        animationProgress: 0,
        isAnimating: true,
        isShowingFullRoute: true,
        collectedPackages: new Set(),
      };

    case 'UPDATE_PROGRESS':
      return {
        ...state,
        animationProgress: action.progress,
      };

    case 'COMPLETE_SEGMENT': {
      const newCollected = new Set(state.collectedPackages);
      if (action.packageIndex !== null) {
        newCollected.add(action.packageIndex);
      }
      return {
        ...state,
        animationProgress: 1,
        isAnimating: false,
        collectedPackages: newCollected,
      };
    }

    case 'MOVE_TO_NEXT_SEGMENT_IN_FULL_ROUTE': {
      const newCollected = new Set(state.collectedPackages);
      if (action.collectedPackageIndex !== null) {
        newCollected.add(action.collectedPackageIndex);
      }
      return {
        ...state,
        currentSegmentIndex: action.nextIndex,
        animationProgress: 0,
        collectedPackages: newCollected,
      };
    }

    case 'COMPLETE_FULL_ROUTE': {
      const allCollected = new Set(action.allPackageIndices);
      return {
        ...state,
        currentSegmentIndex: action.finalIndex,
        animationProgress: 1,
        isAnimating: false,
        isShowingFullRoute: false,
        collectedPackages: allCollected,
      };
    }

    case 'STOP_ANIMATION':
      return {
        ...state,
        isAnimating: false,
      };

    default:
      return state;
  }
};

const createInitialState = (): AnimationState => ({
  currentSegmentIndex: -1,
  animationProgress: 0,
  isAnimating: false,
  isShowingFullRoute: false,
  collectedPackages: new Set(),
});

interface UseAnimationProps {
  segments: RouteSegment[];
}

export const useAnimation = ({
  segments,
}: UseAnimationProps) => {
  const [state, dispatch] = useReducer(animationReducer, null, createInitialState);
  
  const animationFrameRef = useRef<number | null>(null);
  const segmentsRef = useRef<RouteSegment[]>(segments);
  const progressRef = useRef(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    segmentsRef.current = segments;
  }, [segments]);

  const segmentsLengthRef = useRef(segments.length);
  useEffect(() => {
    if (segments.length !== segmentsLengthRef.current) {
      segmentsLengthRef.current = segments.length;
      dispatch({ type: 'RESET' });
    }
  }, [segments.length]);

  useEffect(() => {
    progressRef.current = state.animationProgress;
  }, [state.isAnimating, state.currentSegmentIndex]);

  useEffect(() => {
    if (!state.isAnimating) {
      return;
    }

    const speed = state.isShowingFullRoute
      ? ANIMATION_SPEED.FAST
      : ANIMATION_SPEED.NORMAL;

    lastTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      if (currentTime < lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      const normalizedSpeed = speed * (deltaTime / 16.67);
      progressRef.current += normalizedSpeed;

      if (progressRef.current >= 1) {
        if (state.isShowingFullRoute) {
          const nextIdx = state.currentSegmentIndex + 1;
          const currentSegment = segmentsRef.current[state.currentSegmentIndex];
          const packageIndex = currentSegment?.packageIndex ?? null;

          if (nextIdx >= segmentsRef.current.length) {
            const allPackageIndices = segmentsRef.current
              .filter((seg) => seg.packageIndex !== null)
              .map((seg) => seg.packageIndex!);

            dispatch({
              type: 'COMPLETE_FULL_ROUTE',
              finalIndex: segmentsRef.current.length - 1,
              allPackageIndices,
            });
          } else {
            progressRef.current = 0;
            dispatch({
              type: 'MOVE_TO_NEXT_SEGMENT_IN_FULL_ROUTE',
              nextIndex: nextIdx,
              collectedPackageIndex: packageIndex,
            });
            animationFrameRef.current = requestAnimationFrame(animate);
          }
        } else {
          const currentSegment = segmentsRef.current[state.currentSegmentIndex];
          const packageIndex = currentSegment?.packageIndex ?? null;
          dispatch({ type: 'COMPLETE_SEGMENT', packageIndex });
        }
      } else {
        dispatch({ type: 'UPDATE_PROGRESS', progress: progressRef.current });
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [state.isAnimating, state.isShowingFullRoute, state.currentSegmentIndex]);

  const goToNextPackage = useCallback(() => {
    if (state.currentSegmentIndex < segmentsRef.current.length - 1 && !state.isAnimating) {
      progressRef.current = 0;
      dispatch({
        type: 'START_NEXT_SEGMENT',
        nextIndex: state.currentSegmentIndex + 1,
      });
    }
  }, [state.currentSegmentIndex, state.isAnimating]);

  const goToPrevPackage = useCallback(() => {
    if (state.currentSegmentIndex >= 0 && !state.isAnimating) {
      const currentSegment = segmentsRef.current[state.currentSegmentIndex];
      const packageIndex = currentSegment?.packageIndex ?? null;

      dispatch({
        type: 'START_PREV_SEGMENT',
        prevIndex: state.currentSegmentIndex - 1,
        uncollectPackageIndex: packageIndex,
      });
    }
  }, [state.currentSegmentIndex, state.isAnimating]);

  const showFullRoute = useCallback(() => {
    if (segmentsRef.current.length > 0) {
      progressRef.current = 0;
      dispatch({ type: 'START_FULL_ROUTE' });
    }
  }, []);

  const resetNavigation = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    ...state,
    goToNextPackage,
    goToPrevPackage,
    showFullRoute,
    resetNavigation,
  };
};