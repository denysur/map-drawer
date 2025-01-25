import { FC, useEffect, useMemo, useState } from "react";
import { Layer, Source, useMap } from "react-map-gl";

import {
  ARROWHEAD_ANGLE,
  ARROWHEAD_SIZE,
  DEFAULT_MARKER_COLOR,
} from "../../../../constants";
import { Arrow as ArrowType } from "../../../../types";
import * as turf from "@turf/turf";

type ArrowProps = {
  arrow: ArrowType;
};

// Function to create arrowhead
const createArrow = (vertices: number[][], scaleFactor: number) => {
  const bearing = turf.bearing(
    turf.point(vertices[0]),
    turf.point(vertices[1])
  );
  const length = ARROWHEAD_SIZE / (scaleFactor / 50); // Arrowhead size
  const maxLength = turf.distance(vertices[0], vertices[1], "miles") / 4;
  console.log(length, maxLength);

  // Two points for the arrowhead wings
  const leftWing = turf.destination(
    turf.point(vertices[1]),
    length > maxLength ? maxLength : length,
    bearing - (180 - ARROWHEAD_ANGLE)
  ).geometry.coordinates;
  const rightWing = turf.destination(
    turf.point(vertices[1]),
    length > maxLength ? maxLength : length,
    bearing + (180 - ARROWHEAD_ANGLE)
  ).geometry.coordinates;

  // Combine line and arrowhead into GeoJSON
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: vertices,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [rightWing, vertices[1]],
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [leftWing, vertices[1]],
        },
      },
    ],
  };
};

const Arrow: FC<ArrowProps> = ({ arrow }) => {
  const { vertices, id, color } = arrow;

  const { map } = useMap();

  const [zoom, setZoom] = useState(map?.getZoom() || 5);

  const scaleFactor = useMemo(() => Math.pow(2, zoom - 1), [zoom]);

  const [geoJSON, setGeoJSON] = useState(createArrow(vertices, scaleFactor));

  useEffect(() => {
    const handleZoom = () => setZoom(map?.getZoom() || 5);
    map?.on("zoom", handleZoom);
    return () => {
      map?.off("zoom", handleZoom);
    };
  }, [map]);

  useEffect(() => {
    setGeoJSON(createArrow(vertices, scaleFactor));
  }, [scaleFactor, vertices]);

  return (
    <Source id={id} type="geojson" data={geoJSON}>
      <Layer
        id={id}
        type="line"
        paint={{
          "line-color": color || DEFAULT_MARKER_COLOR,
          "line-width": 3,
        }}
      />
    </Source>
  );
};

export default Arrow;
