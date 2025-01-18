import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

import { addDrawing as addDrawingAction } from "../../app/slices/drawSlice";
import { useActiveTool } from "./useActiveTool";
import { generateId } from "../../utils/common";

import { DEFAULT_MARKER_COLOR, DEFAULT_MARKER_SCALE } from "../../constants";

import { RootState } from "../../app/store";
import { Geometry } from "../../types";

export const useDrawings = () => {
  const [activeTool, setActiveTool] = useActiveTool();

  const selectedDrawId = useSelector(
    (state: RootState) => state.draw.selectedDrawId
  );
  const selectedDraw = useSelector((state: RootState) =>
    state.draw.drawings.find(({ id }) => id === selectedDrawId)
  );
  const drawings = useSelector((state: RootState) => state.draw.drawings);

  const isDrawingMode = useMemo(
    () => activeTool === "freehand-draw",
    [activeTool]
  );
  const isAddNewDrawingMode = useMemo(
    () => isDrawingMode && !selectedDrawId,
    [isDrawingMode, selectedDrawId]
  );

  const dispatch = useDispatch();

  const addDrawing = useCallback((draw: Geometry) => {
    dispatch(
      addDrawingAction({
        ...draw,
        color: DEFAULT_MARKER_COLOR,
        scale: DEFAULT_MARKER_SCALE,
        id: generateId(),
      })
    );

    setActiveTool("freehand-draw");
  }, []);

  return useMemo(
    () =>
      [
        {
          selectedDraw,
          selectedDrawId,
          drawings,
          isAddNewDrawingMode,
          isDrawingMode,
        },
        { addDrawing },
      ] as const,
    [selectedDraw, selectedDrawId, drawings, isAddNewDrawingMode, isDrawingMode]
  );
};
