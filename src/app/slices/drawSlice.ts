import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Draw, DrawState } from "../../types";

const initialState: DrawState = {
  drawings: [],
  selectedDrawId: null,
};

export const drawSlice = createSlice({
  name: "drawSlice",
  initialState,
  reducers: {
    addDrawing: (state, action: PayloadAction<Draw>) => {
      state.selectedDrawId = action.payload.id;
      state.drawings = [...state.drawings, action.payload];
    },
  },
});

export const { addDrawing } = drawSlice.actions;

export default drawSlice.reducer;
