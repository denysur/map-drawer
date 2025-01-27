import { configureStore } from "@reduxjs/toolkit";

import toolReducer from "./slices/toolSlice";
import markerReducer from "./slices/markerSlice";
import drawReducer from "./slices/drawSlice";
import historyReducer from "./slices/historySlice";

export const store = configureStore({
  reducer: {
    tool: toolReducer,
    marker: markerReducer,
    draw: drawReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
