import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

import { selectTool, unselectTool } from "../../app/slices/toolSlice";
import { RootState } from "../../app/store";

import { ToolNames } from "../../types";

export const useActiveTool = () => {
  const activeTool = useSelector((state: RootState) => state.tool.activeTool);
  const dispatch = useDispatch();

  const setActiveTool = useCallback(
    (toolName: ToolNames | null) => {
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
