import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAP_API_KEY;

const Map = () => {
  const mapContainerRef = useRef(null);

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

  return <div ref={mapContainerRef} className="map-container" />;
};

export default Map;
