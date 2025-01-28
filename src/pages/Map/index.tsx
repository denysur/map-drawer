import { useEffect } from "react";

import Layout from "../../components/Layout";
import Map from "../../components/Map";
import Toolbar from "../../components/Toolbar";
import BurgerMenu from "../../components/BurgerMenu";

const MapPage = () => {
  useEffect(() => {
    document.addEventListener(
      "touchmove",
      function (e) {
        // @ts-ignore
        if (e.target.type !== "range") {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }, []);

  return (
    <Layout>
      <BurgerMenu />
      <Map />
      <Toolbar />
    </Layout>
  );
};

export default MapPage;
