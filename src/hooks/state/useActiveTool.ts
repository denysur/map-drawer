import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

import { selectTool, unselectTool } from "../../app/slices/appSlice";
import { RootState } from "../../app/store";

import { ToolsNames } from "../../types";

export const useActiveTool = () => {
  const activeTool = useSelector((state: RootState) => state.app.activeTool);
  const dispatch = useDispatch();

  const setActiveTool = useCallback(
    (toolName: ToolsNames | null) => {
      if (toolName === null) {
        dispatch(unselectTool());
      } else {
        dispatch(selectTool(toolName));
      }
    },
    [selectTool, dispatch]
  );

  return useMemo(
    () => [activeTool, setActiveTool] as const,
    [activeTool, setActiveTool]
  );
};
