import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import Logo from "../../components/Logo";

import { useAuthorization } from "../../hooks/useAuthorization";

mapboxgl.accessToken = import.meta.env.VITE_MAP_API_KEY;

const Map = () => {
  const mapContainerRef = useRef(null);

  const { logout } = useAuthorization();

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/durla/cm4o2p5e0005901qvhs6x4bcd",
        attributionControl: false,
        language: "uk-UA",
      });

      return () => map.remove();
    }

    return () => {};
  }, []);

  return (
    <>
      <button
        type="button"
        className="focus:outline-none fixed z-10 left-10 top-10 text-white bg-red-700 hover:bg-red-900 font-medium rounded-lg text-sm px-5 py-2.5"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
      <Logo />
      <div ref={mapContainerRef} className="map-container" />
    </>
  );
};

export default Map;
