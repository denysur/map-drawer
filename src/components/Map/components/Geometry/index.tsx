import { FC, memo } from "react";
import { Layer, Source } from "react-map-gl";

import { DEFAULT_COLOR } from "../../../../constants";
import { Draw } from "../../../../types";

type GeometryProps = {
  draw: Draw;
};

const Geometry: FC<GeometryProps> = memo(({ draw }) => {
  const { geometry, id, color, weight } = draw;
  const { name } = geometry;

  if (name === "vector" || name === "open polygon") {
    return (
      <Source
        id={id}
        type="geojson"
        data={{
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: geometry.vertices,
          },
        }}
      >
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
  }

  return (
    <Source
      id={id}
      type="geojson"
      data={{
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[...geometry.vertices, geometry.vertices[0]]],
        },
      }}
    >
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
});

export default Geometry;
