import { BrowserRouter, Route, Routes } from "react-router";

import Login from "./pages/Login";
import Map from "./pages/Map";

import NavigationWrapper from "./components/NavigationWrapper";

import { PAGES } from "./constants";

const App = () => (
  <BrowserRouter>
    <NavigationWrapper>
      <Routes>
        <Route path={PAGES.HOME} element={<Login />} />
        <Route path={PAGES.DASHBOARD} element={<Map />} />
      </Routes>
    </NavigationWrapper>
  </BrowserRouter>
);

export default App;
