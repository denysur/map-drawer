import { FC } from "react";
import { Layer, Source } from "react-map-gl";

import { DEFAULT_MARKER_COLOR } from "../../../../constants";
import { Draw } from "../../../../types";

type GeometryProps = {
  draw: Draw;
};

const Geometry: FC<GeometryProps> = ({ draw }) => {
  const { geometry, id } = draw;
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
          id="line"
          type="circle"
          paint={{
            "circle-color": DEFAULT_MARKER_COLOR,
            "circle-radius": geometry.radius,
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
          id="line"
          type="line"
          paint={{
            "line-color": DEFAULT_MARKER_COLOR,
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
          coordinates: [...geometry.vertices, geometry.vertices[0]],
        },
      }}
    >
      <Layer
        id="line"
        type="line"
        paint={{
          "line-color": DEFAULT_MARKER_COLOR,
          "line-width": 3,
        }}
      />
    </Source>
  );
};

export default Geometry;
