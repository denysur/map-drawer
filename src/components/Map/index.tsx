import { default as MapboxMap } from "react-map-gl";

import Marker from "./components/Marker";

import { useMarkers } from "../../hooks/state/useMarkers";

import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const [{ isAddNewMarkerMode, markers }, { addMarker }] = useMarkers();

  return (
    <MapboxMap
      mapboxAccessToken={import.meta.env.VITE_MAP_API_KEY}
      initialViewState={{
        latitude: 48.829021655585166,
        longitude: 31.753199308325947,
        zoom: 5,
      }}
      mapStyle="https://api.maptiler.com/maps/bcca4c4a-53a2-4f35-a54f-1d8288722cb1/style.json?key=5adXclVMBOvAgEYziUJG"
      attributionControl={false}
      onClick={(e) => {
        if (isAddNewMarkerMode) {
          addMarker({
            latitude: e.lngLat.lat,
            longitude: e.lngLat.lng,
          });
        }
      }}
    >
      {markers.map((marker) => (
        <Marker key={marker.id} marker={marker} />
      ))}
    </MapboxMap>
  );
};

export default Map;
