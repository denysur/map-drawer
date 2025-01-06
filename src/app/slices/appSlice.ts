import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { AppState, ToolsNames } from "../../types";

const initialState: AppState = {
  activeTool: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    selectTool: (state, action: PayloadAction<ToolsNames>) => {
      state.activeTool = action.payload;
    },
    unselectTool: (state) => {
      state.activeTool = null;
    },
  },
});

export const { selectTool, unselectTool } = appSlice.actions;

export default appSlice.reducer;
