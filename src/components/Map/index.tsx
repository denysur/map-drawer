import { useCallback, useState } from "react";
import {
  Layer,
  default as MapboxMap,
  Source,
  ViewStateChangeEvent,
} from "react-map-gl";
import { MapMouseEvent } from "mapbox-gl";

import Marker from "./components/Marker";
import Logo from "../Logo";

import { useMarkers } from "../../hooks/state/useMarkers";
import { useDrawings } from "../../hooks/state/useDrawings";
import { useMapDrawing } from "../../hooks/map/useMapDrawing";

import { DEFAULT_MARKER_COLOR } from "../../constants";
import { Marker as MarkerType, Geometry } from "../../types";

import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const [zoom, setZoom] = useState(5);
  const [
    { isAddNewMarkerMode, markers },
    { addMarker, selectMarker, updateMarkerPosition },
  ] = useMarkers();
  const [{ isDrawingMode }, { addDrawing }] = useDrawings();

  const onGeometryCreate = useCallback(
    (geometry: Geometry) => addDrawing(geometry),
    []
  );

  const onMarkerClickHandler = useCallback(({ id }: MarkerType) => {
    selectMarker(id);
  }, []);

  const onMarkerPositionChanged = useCallback(
    (data: { id: string; latitude: number; longitude: number }) => {
      updateMarkerPosition(data);
    },
    []
  );

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

  const onMapZoomChangeHandler = useCallback(
    (e: ViewStateChangeEvent) => {
      setZoom(e.viewState.zoom);
    },
    [isAddNewMarkerMode]
  );

  const [{ coordinates: drawingCoordinates }] = useMapDrawing({
    isDrawingMode,
    onGeometryReady: onGeometryCreate,
  });

  return (
    <div className="mapboxgl-wrapper w-full h-full">
      <Logo />
      <MapboxMap
        id="map"
        mapboxAccessToken={import.meta.env.VITE_MAP_API_KEY}
        initialViewState={{
          latitude: 48.829021655585166,
          longitude: 31.753199308325947,
          zoom,
        }}
        minZoom={1}
        cursor={isAddNewMarkerMode || isDrawingMode ? "pointer" : "grab"}
        mapStyle="https://api.maptiler.com/maps/bcca4c4a-53a2-4f35-a54f-1d8288722cb1/style.json?key=5adXclVMBOvAgEYziUJG"
        attributionControl={false}
        onClick={onMapClickHandler}
        dragPan={!isDrawingMode}
        onZoom={onMapZoomChangeHandler}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            marker={marker}
            onClick={onMarkerClickHandler}
            onPositionChanged={onMarkerPositionChanged}
          />
        ))}

        {drawingCoordinates.length > 1 && (
          <Source
            id="freehand"
            type="geojson"
            data={{
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: drawingCoordinates,
              },
            }}
          >
            <Layer
              id="line"
              type="line"
              paint={{
                "line-color": DEFAULT_MARKER_COLOR,
                "line-width": 3,
              }}
            />
          </Source>
        )}
      </MapboxMap>
    </div>
  );
};

export default Map;
