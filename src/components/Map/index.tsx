import { useCallback } from "react";
import { default as MapboxMap } from "react-map-gl";
import { MapMouseEvent } from "mapbox-gl";

import Logo from "../Logo";
import Marker from "./components/Marker";
import FreehandDrawingResult from "./components/FreehandDrawingResult";
import Geometry from "./components/Geometry";

import { useMarkers } from "../../hooks/state/useMarkers";
import { useDrawings } from "../../hooks/state/useDrawings";
import { useMapDrawing } from "../../hooks/map/useMapDrawing";
import { findClickedArrow, findClickedDraw } from "../../utils/map";

import {
  Marker as MarkerType,
  Geometry as GeometryType,
  Arrow as ArrowType,
} from "../../types";

import "mapbox-gl/dist/mapbox-gl.css";
import { useMapArrows } from "../../hooks/map/useMapArrows";
import { useArrows } from "../../hooks/state/useArrows";
import Arrow from "./components/Arrow";

const Map = () => {
  const [
    { isAddNewMarkerMode, markers },
    { addMarker, selectMarker, updateMarkerPosition },
  ] = useMarkers();
  const [
    { isDrawingMode, isAddNewDrawingMode, drawings },
    { addDraw: addDrawGeometry, selectDraw },
  ] = useDrawings();
  const [
    { isArrowMode, isAddNewArrowMode, arrows },
    { addArrow, selectArrow },
  ] = useArrows();

  const onGeometryCreate = useCallback(
    (geometry: GeometryType) => addDrawGeometry(geometry),
    []
  );
  const onArrowCreate = useCallback(
    (arrow: ArrowType["vertices"], scaleFactor: number) =>
      addArrow(arrow, scaleFactor),
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

  const handleGeometryClick = useCallback(
    (event: MapMouseEvent) => {
      if (drawings.length) {
        const { lngLat, target } = event;
        const clickPoint = [lngLat.lng, lngLat.lat] as [number, number];
        const zoom = target.getZoom();
        const scaleFactor = Math.pow(2, zoom);
        const threshold = 200000 / scaleFactor;

        const draw = findClickedDraw(clickPoint, drawings, threshold);

        if (draw) {
          selectDraw(draw.id);
        }
      }
    },
    [drawings]
  );

  const handleArrowClick = useCallback(
    (event: MapMouseEvent) => {
      if (arrows.length) {
        const { lngLat, target } = event;
        const clickPoint = [lngLat.lng, lngLat.lat] as [number, number];
        const zoom = target.getZoom();
        const scaleFactor = Math.pow(2, zoom);
        const threshold = 200000 / scaleFactor;

        const arrow = findClickedArrow(clickPoint, arrows, threshold);

        if (arrow) {
          selectArrow(arrow.id);
        }
      }
    },
    [arrows]
  );

  const onMapClickHandler = useCallback(
    (e: MapMouseEvent) => {
      if (isAddNewMarkerMode) {
        addMarker({
          latitude: e.lngLat.lat,
          longitude: e.lngLat.lng,
        });
      }

      handleGeometryClick(e);
      handleArrowClick(e);
    },
    [isAddNewMarkerMode, handleGeometryClick, handleArrowClick]
  );

  const [{ coordinates: drawingCoordinates }] = useMapDrawing({
    isDrawingMode: isAddNewDrawingMode,
    onGeometryReady: onGeometryCreate,
  });

  const [{ coordinates: arrowCoordinates }] = useMapArrows({
    isArrowMode: isAddNewArrowMode,
    onArrowReady: onArrowCreate,
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
          zoom: 5,
        }}
        minZoom={1}
        cursor={
          isAddNewMarkerMode || isDrawingMode || isArrowMode
            ? "pointer"
            : "grab"
        }
        mapStyle="https://api.maptiler.com/maps/bcca4c4a-53a2-4f35-a54f-1d8288722cb1/style.json?key=5adXclVMBOvAgEYziUJG"
        attributionControl={false}
        onClick={onMapClickHandler}
        preserveDrawingBuffer={true}
        dragPan={!isDrawingMode && !isArrowMode}
        dragRotate={false}
        touchZoomRotate={false}
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
        {arrows.map((arrow) => (
          <Arrow key={arrow.id} arrow={arrow} />
        ))}

        <FreehandDrawingResult drawingCoordinates={arrowCoordinates} />
        <FreehandDrawingResult drawingCoordinates={drawingCoordinates} />
      </MapboxMap>
    </div>
  );
};

export default Map;
