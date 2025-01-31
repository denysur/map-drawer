import clsx from "clsx";
import { FC, useEffect, useState } from "react";

const ThemeSettings: FC = () => {
  const [colorScheme, setColorScheme] = useState<"light" | "dark" | null>(
    localStorage.theme
  );
  const buttonClass =
    "ease duration-200 w-full bg-white border-2 border-gray-100 text-black font-bold py-2 px-1 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white first:rounded-l-xl last:rounded-r-xl [&:has(+.selected):not(:first-child)]:border-l-0 [&:has(+.selected)]:border-r-0 [&.selected+&:not(:last-child)]:border-r-0 [&.selected+&]:border-l-0";
  const selectedClasses =
    "peer !bg-blue-100 dark:!bg-blue-900 selected !border-blue-700 dark:!border-blue-500";

  useEffect(() => {
    if (colorScheme) {
      localStorage.theme = colorScheme;
    } else {
      localStorage.removeItem("theme");
    }
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, [colorScheme]);

  const onLightThemeSelected = () => {
    setColorScheme("light");
  };
  const onDarkThemeSelected = () => {
    setColorScheme("dark");
  };
  const onSystemThemeSelected = () => {
    setColorScheme(null);
  };

  return (
    <div>
      <h2 className="text-sm font-bold px-2 text-gray-500  capitalize">
        Тема{" "}
      </h2>
      <div className="flex">
        <button
          className={clsx(
            buttonClass,
            colorScheme === "light" && selectedClasses
          )}
          onClick={onLightThemeSelected}
        >
          Світла
        </button>
        <button
          className={clsx(buttonClass, !colorScheme && selectedClasses)}
          onClick={onSystemThemeSelected}
        >
          Системна
        </button>
        <button
          className={clsx(
            buttonClass,
            colorScheme === "dark" && selectedClasses
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
