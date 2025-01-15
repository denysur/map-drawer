import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Marker, MarkerState } from "../../types";

const initialState: MarkerState = {
  markers: [],
  selectedMarkerId: null,
};

export const markerSlice = createSlice({
  name: "markerSlice",
  initialState,
  reducers: {
    addMarker: (state, action: PayloadAction<Marker>) => {
      state.selectedMarkerId = action.payload.id;
      state.markers = [...state.markers, action.payload];
    },
    removeMarker: (state, action: PayloadAction<Marker["id"]>) => {
      state.selectedMarkerId = null;
      state.markers = state.markers.filter(({ id }) => id !== action.payload);
    },
    setSelectedMarkerId: (
      state,
      action: PayloadAction<Marker["id"] | null>
    ) => {
      state.selectedMarkerId = action.payload;
    },
  },
});

export const { addMarker, removeMarker, setSelectedMarkerId } =
  markerSlice.actions;

export default markerSlice.reducer;