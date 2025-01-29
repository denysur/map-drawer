import clsx from "clsx";
import { FC, useEffect, useState } from "react";

const ThemeModal: FC = () => {
  const [systemColorScheme, setSystemColorScheme] = useState<"light" | "dark">(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );
  const [colorScheme, setColorScheme] = useState<"light" | "dark" | null>(
    localStorage.theme
  );
  const lightClasses =
    "ease duration-200 outline outline-0 outline-offset-0 w-full bg-white rounded-xl border-2 border-gray-100 shadow-xl text-black font-bold text-xl p-4";
  const darkClasses =
    "ease duration-200 outline outline-0 outline-offset-0 w-full bg-zinc-800 rounded-xl border-2 border-zinc-700 shadow-xl text-white font-bold text-xl p-4";
  const selectedClasses =
    "!outline-2 !outline-offset-2 outline-blue-700 dark:outline-blue-500";

  useEffect(() => {
    const handleColorSchemeChange = (event: MediaQueryListEvent) => {
      setSystemColorScheme(event.matches ? "dark" : "light");
    };
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleColorSchemeChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleColorSchemeChange);
    };
  }, []);
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
    <div className="flex flex-col overflow-hidden">
      <div className="p-4 flex flex-col sm:flex-row gap-2 align-center justify-around overflow-auto">
        <button
          className={clsx(
            lightClasses,
            colorScheme === "light" && selectedClasses
          )}
          onClick={onLightThemeSelected}
        >
          Світла
        </button>
        <button
          className={clsx(
            darkClasses,
            colorScheme === "dark" && selectedClasses
          )}
          onClick={onDarkThemeSelected}
        >
          Темна
        </button>
        <button
          className={clsx(
            systemColorScheme === "light" ? lightClasses : darkClasses,
            !colorScheme && selectedClasses
          )}
          onClick={onSystemThemeSelected}
        >
          Як в системі
        </button>
      </div>
    </div>
  );
};

export default ThemeModal;
