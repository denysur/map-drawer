import { FC } from "react";
import { Layer, Source } from "react-map-gl";
import * as turf from "@turf/turf";

import { useItemDefaultColor } from "../../../../hooks/useItemDefaultColor";

import { ARROWHEAD_ANGLE } from "../../../../constants";

import { Arrow as ArrowType } from "../../../../types";

type ArrowProps = {
  arrow: ArrowType;
};

// Function to create arrowhead
const createArrow = (vertices: [number, number][], scale: number) => {
  const start = turf.point(vertices[0]);
  const end = turf.point(vertices[1]);

  const bearing = turf.rhumbBearing(start, end);
  const distance = turf.rhumbDistance(start, end, { units: "kilometers" });

  const headLengthKm = Math.min((distance / 4) * scale, 200 * scale);

  const leftWing = turf.rhumbDestination(
    end,
    headLengthKm,
    bearing + 180 + ARROWHEAD_ANGLE,
    { units: "kilometers" }
  ).geometry.coordinates;

  const rightWing = turf.rhumbDestination(
    end,
    headLengthKm,
    bearing + 180 - ARROWHEAD_ANGLE,
    { units: "kilometers" }
  ).geometry.coordinates;

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
  const defaultColor = useItemDefaultColor();

  return (
    <Source id={id} type="geojson" data={createArrow(vertices, scale)}>
      <Layer
        id={id}
        type="line"
        paint={{
          "line-color": color || defaultColor,
          "line-width": 3 * weight,
        }}
      />
    </Source>
  );
};

export default Arrow;
