import { useCallback, useState } from "react";
import { default as MapboxMap, ViewStateChangeEvent } from "react-map-gl";
import { MapMouseEvent } from "mapbox-gl";

import Logo from "../Logo";
import Marker from "./components/Marker";
import FreehandDrawingResult from "./components/FreehandDrawingResult";
import Geometry from "./components/Geometry";

import { useMarkers } from "../../hooks/state/useMarkers";
import { useDrawings } from "../../hooks/state/useDrawings";
import { useMapDrawing } from "../../hooks/map/useMapDrawing";

import { Marker as MarkerType, Geometry as GeometryType } from "../../types";

import "mapbox-gl/dist/mapbox-gl.css";
import { useHistory } from "../../hooks/state/useHistory";

const Map = () => {
  const [zoom, setZoom] = useState(5);
  const [
    { isAddNewMarkerMode, markers },
    { addMarker, selectMarker, updateMarkerPosition },
  ] = useMarkers();
  const [{ isDrawingMode, isAddNewDrawingMode, drawings }, { addDraw }] =
    useDrawings();
  const { addHistoryCommit } = useHistory();

  const onGeometryCreate = useCallback(
    (geometry: GeometryType) => addDraw(geometry),
    []
  );

  const onMarkerClickHandler = useCallback(({ id }: MarkerType) => {
    selectMarker(id);
  }, []);

  const onMarkerPositionChanged = useCallback(
    (data: { id: string; latitude: number; longitude: number }) => {
      const oldState = markers.find((marker) => marker.id === data.id);
      updateMarkerPosition(data);
      addHistoryCommit({
        tool: "marker",
        type: "edit",
        oldState: {
          id: oldState?.id ?? "",
          latitude: oldState?.latitude,
          longitude: oldState?.longitude,
        },
        newState: data,
      });
    },
    [markers]
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
    isDrawingMode: isAddNewDrawingMode,
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
        preserveDrawingBuffer={true}
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
        {drawings.map((draw) => (
          <Geometry key={draw.id} draw={draw} />
        ))}

        <FreehandDrawingResult drawingCoordinates={drawingCoordinates} />
      </MapboxMap>
    </div>
  );
};

export default Map;
