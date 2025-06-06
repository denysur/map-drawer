import { BrowserRouter, Route, Routes } from "react-router";
import { MapProvider } from "react-map-gl";

import Login from "./pages/Login";
import Map from "./pages/Map";

import NavigationWrapper from "./components/NavigationWrapper";

import { PAGES } from "./constants";

const App = () => (
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

export default App;
