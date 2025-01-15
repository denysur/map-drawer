import { FC, memo } from "react";
import { Marker as MapMarker } from "react-map-gl";

import { MapMarker as MapMarkerIcon } from "../../../Icons";

import { Marker as MarkerType } from "../../../../types";

type MarkerProps = {
  marker: MarkerType;
  onClick?: (marker: MarkerType) => void;
};

const Marker: FC<MarkerProps> = memo((props) => {
  const { marker, onClick = () => {} } = props;
  const { latitude, longitude } = marker;

  const onMarkerClickHandler = () => onClick(marker);

  return (
    <MapMarker
      latitude={latitude}
      longitude={longitude}
      anchor="bottom"
      draggable
      onClick={onMarkerClickHandler}
    >
      <MapMarkerIcon className="w-8 text-red-700" />
    </MapMarker>
  );
});

export default Marker;
