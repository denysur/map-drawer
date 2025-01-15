import { useCallback } from "react";
import { default as MapboxMap } from "react-map-gl";
import { MapMouseEvent } from "mapbox-gl";

import Marker from "./components/Marker";

import { useMarkers } from "../../hooks/state/useMarkers";

import { Marker as MarkerType } from "../../types";

import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const [{ isAddNewMarkerMode, markers }, { addMarker, setSelectedMarkerId }] =
    useMarkers();

  const onMarkerClickHandler = useCallback(({ id }: MarkerType) => {
    setSelectedMarkerId(id);
  }, []);

  const onMapClickHandler = useCallback(
    (e: MapMouseEvent) => {
      if (isAddNewMarkerMode) {
        addMarker({
          latitude: e.lngLat.lat,
          longitude: e.lngLat.lng,
        });
      }
    },
    [isAddNewMarkerMode]
  );

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
      onClick={onMapClickHandler}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          marker={marker}
          onClick={onMarkerClickHandler}
        />
      ))}
    </MapboxMap>
  );
};

export default Map;
