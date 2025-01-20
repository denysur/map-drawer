import { FC } from "react";
import { Layer, Source } from "react-map-gl";

import { DEFAULT_MARKER_COLOR } from "../../../../constants";
import { Draw } from "../../../../types";

type GeometryProps = {
  draw: Draw;
};

const Geometry: FC<GeometryProps> = ({ draw }) => {
  const { geometry, id, color } = draw;
  const { name } = geometry;

  if (name === "circle") {
    return (
      <Source
        id={id}
        type="geojson"
        data={{
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: geometry.center,
          },
        }}
      >
        <Layer
          id={id}
          type="circle"
          paint={{
            "circle-color": "transparent",
            "circle-radius": geometry.radius,
            "circle-stroke-width": 2,
            "circle-stroke-color": color || DEFAULT_MARKER_COLOR,
          }}
        />
      </Source>
    );
  }

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
            "line-color": color || DEFAULT_MARKER_COLOR,
            "line-width": 3,
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
          "line-color": color || DEFAULT_MARKER_COLOR,
          "line-width": 3,
        }}
      />
    </Source>
  );
};

export default Geometry;
