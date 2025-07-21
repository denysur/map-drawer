import clsx from "clsx";
import { FC, useMemo } from "react";
import { Theme } from "../../types";
import { useTheme } from "../../hooks/useTheme";

type ThemeSettingsProps = {
  value?: Theme;
  onChange?: (theme: Theme) => void;
  label?: string;
};

const ThemeSettings: FC<ThemeSettingsProps> = ({
  label = "Тема",
  value,
  onChange,
}) => {
  const { theme, setTheme } = useTheme();
  const buttonClass =
    "ease duration-200 w-full bg-white border-2 border-gray-100 text-black font-bold py-2 px-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white first:rounded-l-xl last:rounded-r-xl [&:has(+.selected):not(:first-child)]:border-l-0 [&:has(+.selected)]:border-r-0 [&.selected+&:not(:last-child)]:border-r-0 [&.selected+&]:border-l-0";
  const selectedClasses =
    "peer !bg-blue-100 dark:!bg-blue-900 selected !border-blue-700 dark:!border-blue-500";

  const onLightThemeSelected = () => {
    (onChange || setTheme)?.("light");
  };
  const onDarkThemeSelected = () => {
    (onChange || setTheme)?.("dark");
  };
  const onSystemThemeSelected = () => {
    (onChange || setTheme)?.("system");
  };

  const themeValue = useMemo(() => value || theme, [value, theme]);

  return (
    <div>
      <h2 className="text-sm font-bold px-2 text-gray-500">{label}</h2>
      <div className="flex">
        <button
          className={clsx(
            buttonClass,
            themeValue === "light" && selectedClasses
          )}
          onClick={onLightThemeSelected}
        >
          Світла
        </button>
        <button
          className={clsx(
            buttonClass,
            !themeValue || (themeValue === "system" && selectedClasses)
          )}
          onClick={onSystemThemeSelected}
        >
          Системна
        </button>
        <button
          className={clsx(
            buttonClass,
            themeValue === "dark" && selectedClasses
          )}
          onClick={onDarkThemeSelected}
        >
          Темна
        </button>
      </div>
    </div>
  );
};

export default ThemeSettings;
