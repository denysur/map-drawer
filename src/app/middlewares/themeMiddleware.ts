import { Middleware } from "@reduxjs/toolkit";
import { setTheme, setMapTheme } from "../slices/themeSlice";

export const themeMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (setTheme.match(action) || setMapTheme.match(action)) {
    const { theme, mapTheme } = store.getState().theme;
    localStorage.setItem("theme", theme);
    localStorage.setItem("mapTheme", mapTheme);
  }

  return result;
};
