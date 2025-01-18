import { createSlice } from "@reduxjs/toolkit";

import { DrawState } from "../../types";

const initialState: DrawState = {
  draws: [],
  selectedDrawId: null,
};

export const drawSlice = createSlice({
  name: "drawSlice",
  initialState,
  reducers: {},
});

export const {} = drawSlice.actions;

export default drawSlice.reducer;
