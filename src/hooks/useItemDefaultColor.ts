import { useMemo } from "react";

import { useTheme } from "./useTheme";

import { DEFAULT_COLOR, DEFAULT_COLOR_DARK_MODE } from "../constants";

export const useItemDefaultColor = () => {
  const { isMapInDarkMode } = useTheme();

  return useMemo(
    () => (isMapInDarkMode ? DEFAULT_COLOR_DARK_MODE : DEFAULT_COLOR),
    [isMapInDarkMode]
  );
};
