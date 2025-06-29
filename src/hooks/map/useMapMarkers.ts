import { useCallback, useEffect, useState } from "react";
import { MapMouseEvent, MapTouchEvent, useMap } from "react-map-gl";
import { useMarkers } from "../state/useMarkers";
import { radiansToDegrees } from "@turf/turf";

type UseMapMarkersProps = { isMarkerMode: boolean };

export const useMapMarkers = ({ isMarkerMode }: UseMapMarkersProps) => {
  const { map } = useMap();

  const [isMarker, setIsMarker] = useState(isMarkerMode);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number][]>([]);

  const [{}, { addMarker, updateMarkerRotation }] = useMarkers();

  const onMouseDownHandler = useCallback(
    (event: MapMouseEvent | MapTouchEvent) => {
      if (!isMarkerMode) return;

      setIsMarker(true);

      const { lng, lat } = event.lngLat;

      setCoordinates([[lng, lat]]);

      const id = addMarker({ latitude: lat, longitude: lng });

      setSelectedMarkerId(id);
    },
    [isMarkerMode, addMarker]
  );

  const onMouseUpHandler = useCallback(() => {
    setIsMarker(false);
    if (coordinates.length <= 1) return;

    setSelectedMarkerId(null);

    setCoordinates([]);
  }, [coordinates, isMarker]);

  useEffect(() => {
    if (!map) return;

    const onMouseMoveHandler = (event: MapMouseEvent | MapTouchEvent) => {
      if (!isMarker || !selectedMarkerId) return;

      const { lng, lat } = event.lngLat;

      setCoordinates((prev) => {
        const newCoordinates: [[number, number], [number, number]] = [
          prev[0],
          [lng, lat],
        ];

        const deltaY = newCoordinates[1][1] - newCoordinates[0][1];
        const deltaX = newCoordinates[1][0] - newCoordinates[0][0];

        const rotation = radiansToDegrees(Math.atan2(deltaX, deltaY));

        updateMarkerRotation({ id: selectedMarkerId, rotation });

        return newCoordinates;
      });
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
  }, [map, isMarkerMode, isMarker, onMouseDownHandler, onMouseUpHandler]);
};
