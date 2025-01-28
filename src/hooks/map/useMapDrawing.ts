import { useEffect, useMemo, useState } from "react";
import { MapMouseEvent, MapTouchEvent, useMap } from "react-map-gl";

import { shapeDetector } from "../../utils/map";

import { Geometry } from "../../types";

type UseMapDrawingProps = {
  isDrawingMode: boolean;
  onGeometryReady: (geometry: Geometry) => void;
};

export const useMapDrawing = ({
  isDrawingMode,
  onGeometryReady,
}: UseMapDrawingProps) => {
  const { map } = useMap();

  const [isDrawing, setIsDrawing] = useState(isDrawingMode);
  const [coordinates, setCoordinates] = useState<number[][]>([]);

  useEffect(() => {
    if (!map) return;

    // TODO: hotfix for disabling phone users rotation
    map.getMap().touchZoomRotate.disableRotation();

    const onMouseMoveHandler = (event: MapMouseEvent | MapTouchEvent) => {
      if (!isDrawing) return;

      const { lng, lat } = event.lngLat;

      setCoordinates((prev) => [...prev, [lng, lat]]);
    };

    const onMouseDownHandler = (event: MapMouseEvent | MapTouchEvent) => {
      if (!isDrawingMode) return;

      setIsDrawing(true);

      const { lng, lat } = event.lngLat;

      setCoordinates([[lng, lat]]);
    };

    const onMouseUpHandler = () => {
      setIsDrawing(false);
      if (coordinates.length <= 1) return;

      const zoom = map.getZoom();
      const scaleFactor = Math.pow(2, zoom) / 2;

      const shape = shapeDetector(coordinates, scaleFactor);

      onGeometryReady(shape);

      setCoordinates([]);
    };

    map.on("mousedown", onMouseDownHandler);
    map.on("mouseup", onMouseUpHandler);
    map.on("mousemove", onMouseMoveHandler);

    map.on("touchstart", onMouseDownHandler);
    map.on("touchend", onMouseUpHandler);
    map.on("touchcancel", onMouseUpHandler);
    map.on("touchmove", onMouseMoveHandler);

    return () => {
      map.off("mousedown", onMouseDownHandler);
      map.off("mouseup", onMouseUpHandler);
      map.off("mousemove", onMouseMoveHandler);

      map.off("touchstart", onMouseDownHandler);
      map.off("touchend", onMouseUpHandler);
      map.off("touchcancel", onMouseUpHandler);
      map.off("touchmove", onMouseMoveHandler);
    };
  }, [map, isDrawingMode, isDrawing, coordinates, onGeometryReady]);

  return useMemo(
    () => [
      {
        isDrawing,
        coordinates,
      },
    ],
    [isDrawing, coordinates]
  );
};
