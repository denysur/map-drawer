import { FC } from "react";
import { Layer, Source } from "react-map-gl";

import { useItemDefaultColor } from "../../../../hooks/useItemDefaultColor";

type FreehandDrawingResultProps = {
  drawingCoordinates: [number, number][];
};

const FreehandDrawingResult: FC<FreehandDrawingResultProps> = ({
  drawingCoordinates,
}) => {
  const defaultColor = useItemDefaultColor();

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
            "line-color": defaultColor,
            "line-width": 3,
          }}
        />
      </Source>
    )
  );
};

export default FreehandDrawingResult;
