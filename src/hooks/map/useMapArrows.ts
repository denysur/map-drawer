import { useCallback, useEffect, useMemo, useState } from "react";
import { MapMouseEvent, MapTouchEvent, useMap } from "react-map-gl";

type UseMapArrowsProps = {
  isArrowMode: boolean;
  onArrowReady: (vertices: [number, number][], scaleFactor: number) => void;
};

export const useMapArrows = ({
  isArrowMode: isArrowsMode,
  onArrowReady,
}: UseMapArrowsProps) => {
  const { map } = useMap();

  const [isArrows, setIsArrows] = useState(isArrowsMode);
  const [coordinates, setCoordinates] = useState<[number, number][]>([]);

  const onMouseDownHandler = useCallback(
    (event: MapMouseEvent | MapTouchEvent) => {
      if (!isArrowsMode) return;

      setIsArrows(true);

      const { lng, lat } = event.lngLat;

      setCoordinates([[lng, lat]]);
    },
    [isArrowsMode]
  );

  const onMouseUpHandler = useCallback(() => {
    setIsArrows(false);
    if (coordinates.length <= 1) return;

    onArrowReady(coordinates, Math.pow(2, (map?.getZoom() || 5) - 1));

    setCoordinates([]);
  }, [coordinates, isArrows, onArrowReady]);

  useEffect(() => {
    if (!map) return;

    const onMouseMoveHandler = (event: MapMouseEvent | MapTouchEvent) => {
      if (!isArrows) return;

      const { lng, lat } = event.lngLat;

      setCoordinates((prev) => [prev[0], [lng, lat]]);
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
  }, [map, isArrowsMode, isArrows, onMouseDownHandler, onMouseUpHandler]);

  return useMemo(
    () => [
      {
        isArrows,
        coordinates,
      },
    ],
    [isArrows, coordinates]
  );
};
