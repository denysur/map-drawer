import { FC, useEffect, useState } from "react";
import { Layer, Source, useMap } from "react-map-gl";

import { DEFAULT_MARKER_COLOR } from "../../../../constants";
import { Arrow as ArrowType } from "../../../../types";
import { calculateShiftedLines } from "../../../../utils/map";

type ArrowProps = {
  arrow: ArrowType;
};

const Arrow: FC<ArrowProps> = ({ arrow }) => {
  const { vertices, id, color } = arrow;
  const [arrowHeadVertices, setArrowHeadVertices] = useState<number[][]>([]);

  useEffect(() => {
    setArrowHeadVertices(calculateShiftedLines(vertices));
  }, [vertices]);

  return (
    <Source
      id={id}
      type="geojson"
      data={{
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            ...vertices,
            arrowHeadVertices[0],
            vertices[1],
            arrowHeadVertices[1],
          ],
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

export default Arrow;
