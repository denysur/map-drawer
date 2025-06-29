import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  DefaultMarkerIcon,
  Marker,
  MarkerIcon,
  MarkerState,
} from "../../types";

const initialState: MarkerState = {
  markers: [],
  selectedMarkerId: null,
  iconOnCreating: null,
};

export const markerSlice = createSlice({
  name: "markerSlice",
  initialState,
  reducers: {
    addMarker: (state, action: PayloadAction<Marker>) => {
      // state.selectedMarkerId = action.payload.id;
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
    setMarkerPosition: (
      state,
      action: PayloadAction<{ latitude: number; longitude: number; id: string }>
    ) => {
      state.markers = state.markers.map((marker) =>
        marker.id === action.payload.id
          ? {
              ...marker,
              latitude: action.payload.latitude,
              longitude: action.payload.longitude,
            }
          : marker
      );
    },
    setMarkerColor: (
      state,
      action: PayloadAction<{ id: string; color: string }>
    ) => {
      state.markers = state.markers.map((marker) =>
        marker.id === action.payload.id
          ? { ...marker, color: action.payload.color }
          : marker
      );
    },
    setMarkerIcon: (
      state,
      action: PayloadAction<{
        id: string;
        icon: MarkerIcon | DefaultMarkerIcon | null;
      }>
    ) => {
      state.markers = state.markers.map((marker) =>
        marker.id === action.payload.id
          ? { ...marker, icon: action.payload.icon }
          : marker
      );
    },
    setMarkerSize: (
      state,
      action: PayloadAction<{ id: string; scale: number }>
    ) => {
      state.markers = state.markers.map((marker) =>
        marker.id === action.payload.id
          ? { ...marker, scale: action.payload.scale }
          : marker
      );
    },
    setMarkerRotation: (
      state,
      action: PayloadAction<{ id: string; rotation: number }>
    ) => {
      state.markers = state.markers.map((marker) =>
        marker.id === action.payload.id
          ? { ...marker, rotation: action.payload.rotation }
          : marker
      );
    },

    setMarkerProps: (state, action: PayloadAction<Partial<Marker>>) => {
      state.markers = state.markers.map((marker) =>
        marker.id === action.payload.id
          ? { ...marker, ...action.payload }
          : marker
      );
    },
    setIconOnCreating: (
      state,
      action: PayloadAction<DefaultMarkerIcon | null>
    ) => {
      state.iconOnCreating = action.payload;
    },
    clearMarkersState: (state) => {
      state.markers = [];
      state.selectedMarkerId = null;
    },
  },
});

export const {
  addMarker,
  removeMarker,
  setSelectedMarkerId,
  setMarkerPosition,
  setMarkerColor,
  setMarkerSize,
  setMarkerIcon,
  setMarkerRotation,
  setMarkerProps,
  setIconOnCreating,
  clearMarkersState,
} = markerSlice.actions;

export default markerSlice.reducer;
