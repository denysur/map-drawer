import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

import { useActiveTool } from "./useActiveTool";
import { generateId } from "../../utils/common";
import { useItemDefaultColor } from "../useItemDefaultColor";
import {
  addArrow as addArrowAction,
  clearArrowsState,
  removeArrow as removeArrowAction,
  setArrowColor,
  setArrowSize,
  setArrowWeight,
  setSelectedArrowId,
} from "../../app/slices/arrowSlice";

import { DEFAULT_SCALE } from "../../constants";

import { RootState } from "../../app/store";
import { Arrow } from "../../types";

export const useArrows = () => {
  const [activeTool, setActiveTool] = useActiveTool();
  const defaultColor = useItemDefaultColor();

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

  const selectArrow = useCallback((id: Arrow["id"]) => {
    dispatch(setSelectedArrowId(id));

    setActiveTool("arrow");
  }, []);

  const unselectArrowing = useCallback(() => {
    dispatch(setSelectedArrowId(null));

    setActiveTool(null);
  }, []);

  const addArrow = useCallback(
    (vertices: [number, number][], scaleFactor: number) => {
      dispatch(
        addArrowAction({
          vertices: vertices,
          color: defaultColor,
          scale: DEFAULT_SCALE,
          weight: DEFAULT_SCALE,
          id: generateId(),
          scaleFactor,
        })
      );

      setActiveTool("arrow");
    },
    [defaultColor]
  );

  const removeArrow = useCallback((id: string) => {
    dispatch(removeArrowAction(id));

    setActiveTool(null);
  }, []);

  const updateArrowSize = useCallback((data: { id: string; scale: number }) => {
    dispatch(setArrowSize(data));
  }, []);

  const updateArrowWeight = useCallback(
    (data: { id: string; weight: number }) => {
      dispatch(setArrowWeight(data));
    },
    []
  );

  const updateArrowColor = useCallback(
    (data: { id: string; color: string }) => {
      dispatch(setArrowColor(data));
    },
    []
  );

  const flushArrowsState = useCallback(() => {
    dispatch(clearArrowsState());
  }, []);

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
          selectArrow,
          removeArrow,
          updateArrowSize,
          updateArrowWeight: updateArrowWeight,
          updateArrowColor,
          unselectArrowing,
          flushArrowsState,
        },
      ] as const,
    [selectedArrow, selectedArrowId, arrows, isAddNewArrowMode, isArrowMode]
  );
};
