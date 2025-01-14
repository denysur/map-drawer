import { configureStore } from "@reduxjs/toolkit";

import toolReducer from "./slices/toolSlice";
import markerReducer from "./slices/markerSlice";

export const store = configureStore({
  reducer: {
    tool: toolReducer,
    marker: markerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
