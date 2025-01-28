import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Arrow, ArrowState } from "../../types";

const initialState: ArrowState = {
  arrows: [],
  selectedArrowId: null,
};

export const arrowSlice = createSlice({
  name: "arrowSlice",
  initialState,
  reducers: {
    addArrow: (state, action: PayloadAction<Arrow>) => {
      state.selectedArrowId = action.payload.id;
      state.arrows = [...state.arrows, action.payload];
    },
    removeArrow: (state, action: PayloadAction<Arrow["id"]>) => {
      state.selectedArrowId = null;
      state.arrows = state.arrows.filter(({ id }) => id !== action.payload);
    },
    setSelectedArrowId: (state, action: PayloadAction<Arrow["id"] | null>) => {
      state.selectedArrowId = action.payload;
    },
    setArrowColor: (
      state,
      action: PayloadAction<{ id: string; color: string }>
    ) => {
      state.arrows = state.arrows.map((arrow) =>
        arrow.id === action.payload.id
          ? {
              ...arrow,
              color: action.payload.color,
            }
          : arrow
      );
    },
    setArrowSize: (
      state,
      action: PayloadAction<{ id: string; scale: number }>
    ) => {
      state.arrows = state.arrows.map((arrow) =>
        arrow.id === action.payload.id
          ? {
              ...arrow,
              scale: action.payload.scale,
            }
          : arrow
      );
    },
    setArrowWeight: (
      state,
      action: PayloadAction<{ id: string; weight: number }>
    ) => {
      state.arrows = state.arrows.map((arrow) =>
        arrow.id === action.payload.id
          ? {
              ...arrow,
              weight: action.payload.weight,
            }
          : arrow
      );
    },
    setArrowProps: (state, action: PayloadAction<Partial<Arrow>>) => {
      state.arrows = state.arrows.map((arrow) =>
        arrow.id === action.payload.id
          ? {
              ...arrow,
              ...action.payload,
            }
          : arrow
      );
    },
  },
});

export const {
  addArrow,
  removeArrow,
  setArrowColor,
  setArrowSize,
  setArrowWeight,
  setSelectedArrowId,
  setArrowProps,
} = arrowSlice.actions;

export default arrowSlice.reducer;
