import { useSelector } from "react-redux";
import { useMemo } from "react";

import { useActiveTool } from "./useActiveTool";

import { RootState } from "../../app/store";

export const useDrawings = () => {
  const [activeTool] = useActiveTool();

  const selectedDrawId = useSelector(
    (state: RootState) => state.draw.selectedDrawId
  );
  const selectedDraw = useSelector((state: RootState) =>
    state.draw.draws.find(({ id }) => id === selectedDrawId)
  );
  const draws = useSelector((state: RootState) => state.draw.draws);
  const isAddNewDrawingMode = activeTool === "freehand-draw" && !selectedDrawId;

  return useMemo(
    () =>
      [
        { selectedDraw, selectedDrawId, draws, isAddNewDrawingMode },
        {},
      ] as const,
    [selectedDraw, selectedDrawId, draws, isAddNewDrawingMode]
  );
};
