import { useEffect } from "react";

import Layout from "../../components/Layout";
import Map from "../../components/Map";
import Toolbar from "../../components/Toolbar";
import BurgerMenu from "../../components/BurgerMenu";

const MapPage = () => {
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      let parent = e.target as HTMLElement;
      while (parent) {
        parent = parent.parentElement as HTMLElement;
        if (!parent || parent.id === "modal") break;
      }
      if ((e.target as HTMLInputElement).type !== "range" && !parent) {
        e.preventDefault();
      }
    };
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
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
