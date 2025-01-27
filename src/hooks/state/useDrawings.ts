import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

import {
  addDraw as addDrawAction,
  removeDraw as removeDrawAction,
  setDrawColor,
  setDrawSize,
  setSelectedDrawId,
} from "../../app/slices/drawSlice";
import { useActiveTool } from "./useActiveTool";
import { generateId } from "../../utils/common";

import { DEFAULT_MARKER_COLOR, DEFAULT_MARKER_SCALE } from "../../constants";

import { RootState } from "../../app/store";
import { Geometry } from "../../types";
import { useHistory } from "./useHistory";

export const useDrawings = () => {
  const [activeTool, setActiveTool] = useActiveTool();
  const { addHistoryCommit } = useHistory();

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

  const unselectDrawing = useCallback(() => {
    dispatch(setSelectedDrawId(null));

    setActiveTool(null);
  }, []);

  const addDraw = useCallback((draw: Geometry) => {
    const drawing = {
      geometry: draw,
      color: DEFAULT_MARKER_COLOR,
      scale: DEFAULT_MARKER_SCALE,
      id: generateId(),
    };
    dispatch(addDrawAction(drawing));
    addHistoryCommit({
      tool: "freehand-draw",
      type: "add",
      drawing,
    });

    setActiveTool("freehand-draw");
  }, []);

  const removeDraw = useCallback(
    (id: string) => {
      addHistoryCommit({
        tool: "freehand-draw",
        type: "remove",
        drawing: drawings.find((draw) => draw.id === id),
      });
      dispatch(removeDrawAction(id));

      setActiveTool(null);
    },
    [drawings]
  );

  const updateDrawSize = useCallback((data: { id: string; scale: number }) => {
    dispatch(setDrawSize(data));
  }, []);

  const updateDrawColor = useCallback((data: { id: string; color: string }) => {
    dispatch(setDrawColor(data));
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
        {
          addDraw,
          removeDraw,
          updateDrawSize,
          updateDrawColor,
          unselectDrawing,
        },
      ] as const,
    [selectedDraw, selectedDrawId, drawings, isAddNewDrawingMode, isDrawingMode]
  );
};
