import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: { isScreenshoting: boolean } = { isScreenshoting: false };

export const screenshotSlice = createSlice({
  name: "screenshotSlice",
  initialState,
  reducers: {
    setIsScreenshoting: (state, action: PayloadAction<boolean>) => {
      state.isScreenshoting = action.payload;
    },
  },
});

export const { setIsScreenshoting } = screenshotSlice.actions;

export default screenshotSlice.reducer;
