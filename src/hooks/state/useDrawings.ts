import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

import {
  addDraw as addDrawAction,
  clearDrawsState,
  removeDraw as removeDrawAction,
  setDrawColor,
  setDrawWeight,
  setSelectedDrawId,
} from "../../app/slices/drawSlice";
import { useActiveTool } from "./useActiveTool";
import { generateId } from "../../utils/common";
import { useItemDefaultColor } from "../useItemDefaultColor";

import { DEFAULT_SCALE } from "../../constants";

import { RootState } from "../../app/store";
import { Draw, Geometry } from "../../types";

export const useDrawings = () => {
  const [activeTool, setActiveTool] = useActiveTool();
  const defaultColor = useItemDefaultColor();

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

  const selectDraw = useCallback((id: Draw["id"]) => {
    dispatch(setSelectedDrawId(id));

    setActiveTool("freehand-draw");
  }, []);

  const unselectDrawing = useCallback(() => {
    dispatch(setSelectedDrawId(null));

    setActiveTool(null);
  }, []);

  const addDraw = useCallback(
    (draw: Geometry) => {
      dispatch(
        addDrawAction({
          geometry: draw,
          color: defaultColor,
          weight: DEFAULT_SCALE,
          id: generateId(),
        })
      );

      setActiveTool("freehand-draw");
    },
    [defaultColor]
  );

  const removeDraw = useCallback((id: string) => {
    dispatch(removeDrawAction(id));

    setActiveTool(null);
  }, []);

  const updateDrawWeight = useCallback(
    (data: { id: string; weight: number }) => {
      dispatch(setDrawWeight(data));
    },
    []
  );

  const updateDrawColor = useCallback((data: { id: string; color: string }) => {
    dispatch(setDrawColor(data));
  }, []);

  const flushDrawsState = useCallback(() => {
    dispatch(clearDrawsState());
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
          updateDrawWeight,
          updateDrawColor,
          unselectDrawing,
          selectDraw,
          flushDrawsState,
        },
      ] as const,
    [selectedDraw, selectedDrawId, drawings, isAddNewDrawingMode, isDrawingMode]
  );
};
