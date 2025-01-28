import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { HistoryCommit, HistoryState } from "../../types";

const initialState: HistoryState = {
  timestamp: null,
  history: [],
};

export const historySlice = createSlice({
  name: "historySlice",
  initialState,
  reducers: {
    addCommit: (state, action: PayloadAction<HistoryCommit>) => {
      state.history = [
        ...state.history.filter(
          (commit) => commit.timestamp <= (state.timestamp || 0)
        ),
        { ...action.payload, timestamp: new Date().getTime() },
      ];
      state.timestamp = new Date().getTime();
    },
    undo: (state) => {
      const lastCommit = state.history
        .filter((c) => (state.timestamp || 0) >= c.timestamp)
        .sort((a, b) => b.timestamp - a.timestamp);
      state.timestamp = lastCommit[1]?.timestamp;
    },
    redo: (state) => {
      const nextCommit = state.history.find(
        (c) => c.timestamp > (state.timestamp || 0)
      );
      if (nextCommit) {
        state.timestamp = nextCommit.timestamp;
      }
    },
    setTimestamp: (state, action: PayloadAction<number>) => {
      state.timestamp = action.payload;
    },
  },
});

export const { addCommit, setTimestamp, undo, redo } = historySlice.actions;

export default historySlice.reducer;
