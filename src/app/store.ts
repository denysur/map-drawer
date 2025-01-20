import { configureStore } from "@reduxjs/toolkit";

import toolReducer from "./slices/toolSlice";
import markerReducer from "./slices/markerSlice";
import drawReducer from "./slices/drawSlice";

export const store = configureStore({
  reducer: {
    tool: toolReducer,
    marker: markerReducer,
    draw: drawReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
