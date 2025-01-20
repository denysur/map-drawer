import { FC } from "react";
import { Layer, Source } from "react-map-gl";

import { DEFAULT_MARKER_COLOR } from "../../../../constants";

type FreehandDrawingResultProps = {
  drawingCoordinates: number[][];
};

const FreehandDrawingResult: FC<FreehandDrawingResultProps> = ({
  drawingCoordinates,
}) => {
  return (
    drawingCoordinates.length > 1 && (
      <Source
        id="freehand"
        type="geojson"
        data={{
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: drawingCoordinates,
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
    )
  );
};

export default FreehandDrawingResult;
