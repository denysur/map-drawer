import { useMemo } from "react";

import { useTheme } from "./useTheme";

import {
  DEFAULT_COLOR,
  DEFAULT_COLOR_DARK_MODE,
  FRIENDLY_COLOR,
  FRIENDLY_COLOR_DARK_MODE,
} from "../constants";

export const useItemDefaultColor = (friendly?: boolean) => {
  const { isMapInDarkMode } = useTheme();

  return useMemo(() => {
    if (friendly) {
      return isMapInDarkMode ? FRIENDLY_COLOR_DARK_MODE : FRIENDLY_COLOR;
    }
    return isMapInDarkMode ? DEFAULT_COLOR_DARK_MODE : DEFAULT_COLOR;
  }, [isMapInDarkMode, friendly]);
};
