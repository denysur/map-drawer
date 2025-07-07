import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { RootState } from "../app/store";
import { Theme } from "../types";

import {
  setTheme as setThemeFunc,
  setMapTheme as setMapThemeFunc,
} from "../app/slices/themeSlice";

export const useTheme = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const mapTheme = useSelector((state: RootState) => state.theme.mapTheme);

  const dispatch = useDispatch();

  const setTheme = useCallback(
    (theme: Theme) => {
      dispatch(setThemeFunc(theme));
    },
    [dispatch]
  );

  const setMapTheme = useCallback(
    (mapTheme: Theme) => {
      dispatch(setMapThemeFunc(mapTheme));
    },
    [dispatch]
  );

  return useMemo(
    () =>
      ({
        theme,
        mapTheme,
        setTheme,
        setMapTheme,
      }) as const,
    [theme, mapTheme, setTheme, setMapTheme]
  );
};
