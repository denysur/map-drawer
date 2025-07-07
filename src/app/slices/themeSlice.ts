import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "../../types";

const getInitialState = (option: string, defaultValue?: Theme): Theme => {
  const saved = localStorage.getItem(option);
  return saved === "light" || saved === "dark" || saved === "system"
    ? saved
    : defaultValue || "system";
};

const initialState: { theme: Theme; mapTheme: Theme } = {
  theme: getInitialState("theme"),
  mapTheme: getInitialState("mapTheme", "light"),
};

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setMapTheme: (state, action: PayloadAction<Theme>) => {
      state.mapTheme = action.payload;
    },
  },
});

export const { setTheme, setMapTheme } = themeSlice.actions;

export default themeSlice.reducer;
