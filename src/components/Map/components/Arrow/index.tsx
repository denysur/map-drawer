import { FC } from "react";
import { Layer, Source } from "react-map-gl";

import { ARROWHEAD_ANGLE, DEFAULT_COLOR } from "../../../../constants";
import { Arrow as ArrowType } from "../../../../types";
import * as turf from "@turf/turf";

type ArrowProps = {
  arrow: ArrowType;
};

// Function to create arrowhead
const createArrow = (vertices: [number, number][], scale: number) => {
  const bearing = turf.bearing(
    turf.point(vertices[0]),
    turf.point(vertices[1])
  );
  const length =
    (turf.distance(vertices[0], vertices[1], { units: "miles" }) / 4) * scale;

  // Two points for the arrowhead wings
  const leftWing = turf.destination(
    turf.point(vertices[1]),
    length,
    bearing + 180 + ARROWHEAD_ANGLE
  ).geometry.coordinates;
  const rightWing = turf.destination(
    turf.point(vertices[1]),
    length,
    bearing + 180 - ARROWHEAD_ANGLE
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
  const { vertices, id, color, scale, weight } = arrow;

  return (
    <Source id={id} type="geojson" data={createArrow(vertices, scale)}>
      <Layer
        id={id}
        type="line"
        paint={{
          "line-color": color || DEFAULT_COLOR,
          "line-width": 3 * weight,
        }}
      />
    </Source>
  );
};

export default Arrow;
