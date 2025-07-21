import { BrowserRouter, Route, Routes } from "react-router";
import { MapProvider } from "react-map-gl";

import Login from "./pages/Login";
import Map from "./pages/Map";

import NavigationWrapper from "./components/NavigationWrapper";

import { PAGES } from "./constants";
import { useTheme } from "./hooks/useTheme";
import { useEffect } from "react";

const App = () => {
  const { theme } = useTheme();

  const updateTheme = () => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark" ||
        (theme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (event: MediaQueryListEvent) => {
      console.log(event);
      updateTheme();
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(updateTheme, [theme]);

  return (
    <MapProvider>
      <BrowserRouter>
        <NavigationWrapper>
          <Routes>
            <Route path={PAGES.HOME} element={<Login />} />
            <Route path={PAGES.DASHBOARD} element={<Map />} />
          </Routes>
        </NavigationWrapper>
      </BrowserRouter>
    </MapProvider>
  );
};

export default App;
