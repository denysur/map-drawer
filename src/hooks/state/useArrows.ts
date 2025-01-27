import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

import { useActiveTool } from "./useActiveTool";
import { generateId } from "../../utils/common";

import { DEFAULT_MARKER_COLOR, DEFAULT_MARKER_SCALE } from "../../constants";

import { RootState } from "../../app/store";
import {
  addArrow as addArrowAction,
  removeArrow as removeArrowAction,
  setArrowColor,
  setArrowSize,
  setSelectedArrowId,
} from "../../app/slices/arrowSlice";

export const useArrows = () => {
  const [activeTool, setActiveTool] = useActiveTool();

  const selectedArrowId = useSelector(
    (state: RootState) => state.arrow.selectedArrowId
  );
  const selectedArrow = useSelector((state: RootState) =>
    state.arrow.arrows.find(({ id }) => id === selectedArrowId)
  );
  const arrows = useSelector((state: RootState) => state.arrow.arrows);

  const isArrowMode = useMemo(() => activeTool === "arrow", [activeTool]);
  const isAddNewArrowMode = useMemo(
    () => isArrowMode && !selectedArrowId,
    [isArrowMode, selectedArrowId]
  );

  const dispatch = useDispatch();

  const unselectArrowing = useCallback(() => {
    dispatch(setSelectedArrowId(null));

    setActiveTool(null);
  }, []);

  const addArrow = useCallback((vertices: number[][], scaleFactor: number) => {
    dispatch(
      addArrowAction({
        vertices: vertices,
        color: DEFAULT_MARKER_COLOR,
        scale: DEFAULT_MARKER_SCALE,
        id: generateId(),
        scaleFactor,
      })
    );

    setActiveTool("arrow");
  }, []);

  const removeArrow = useCallback((id: string) => {
    dispatch(removeArrowAction(id));

    setActiveTool(null);
  }, []);

  const updateArrowSize = useCallback((data: { id: string; scale: number }) => {
    dispatch(setArrowSize(data));
  }, []);

  const updateArrowColor = useCallback(
    (data: { id: string; color: string }) => {
      dispatch(setArrowColor(data));
    },
    []
  );

  return useMemo(
    () =>
      [
        {
          selectedArrow,
          selectedArrowId,
          arrows,
          isAddNewArrowMode,
          isArrowMode,
        },
        {
          addArrow,
          removeArrow,
          updateArrowSize,
          updateArrowColor,
          unselectArrowing,
        },
      ] as const,
    [selectedArrow, selectedArrowId, arrows, isAddNewArrowMode, isArrowMode]
  );
};
