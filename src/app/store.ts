import { configureStore } from "@reduxjs/toolkit";

import toolReducer from "./slices/toolSlice";
import markerReducer from "./slices/markerSlice";
import drawReducer from "./slices/drawSlice";
import arrowReducer from "./slices/arrowSlice";
import historyReducer from "./slices/historySlice";
import screenshotReducer from "./slices/screenshotSlice";

export const store = configureStore({
  reducer: {
    tool: toolReducer,
    marker: markerReducer,
    draw: drawReducer,
    arrow: arrowReducer,
    history: historyReducer,
    screenshot: screenshotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
