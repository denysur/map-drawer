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
    addDraw: (state, action: PayloadAction<Draw>) => {
      state.selectedDrawId = action.payload.id;
      state.drawings = [...state.drawings, action.payload];
    },
    removeDraw: (state, action: PayloadAction<Draw["id"]>) => {
      state.selectedDrawId = null;
      state.drawings = state.drawings.filter(({ id }) => id !== action.payload);
    },
    setSelectedDrawId: (state, action: PayloadAction<Draw["id"] | null>) => {
      state.selectedDrawId = action.payload;
    },
    setDrawColor: (
      state,
      action: PayloadAction<{ id: string; color: string }>
    ) => {
      state.drawings = state.drawings.map((draw) =>
        draw.id === action.payload.id
          ? {
              ...draw,
              color: action.payload.color,
            }
          : draw
      );
    },
    setDrawSize: (
      state,
      action: PayloadAction<{ id: string; scale: number }>
    ) => {
      state.drawings = state.drawings.map((draw) =>
        draw.id === action.payload.id
          ? {
              ...draw,
              scale: action.payload.scale,
            }
          : draw
      );
    },
  },
});

export const {
  addDraw,
  removeDraw,
  setDrawColor,
  setDrawSize,
  setSelectedDrawId,
} = drawSlice.actions;

export default drawSlice.reducer;
