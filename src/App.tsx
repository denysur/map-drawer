import { BrowserRouter, Route, Routes } from "react-router";

import Login from "./pages/Login";
import Map from "./pages/Map";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="dashboard" element={<Map />} />
    </Routes>
  </BrowserRouter>
);

export default App;
