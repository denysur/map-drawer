import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ToolState, ToolNames } from "../../types";

const initialState: ToolState = {
  activeTool: null,
};

export const toolSlice = createSlice({
  name: "toolSlice",
  initialState,
  reducers: {
    selectTool: (state, action: PayloadAction<ToolNames>) => {
      state.activeTool = action.payload;
    },
    unselectTool: (state) => {
      state.activeTool = null;
    },
  },
});

export const { selectTool, unselectTool } = toolSlice.actions;

export default toolSlice.reducer;
