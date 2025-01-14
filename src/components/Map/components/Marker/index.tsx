import { FC } from "react";
import { Marker as MapMarker } from "react-map-gl";

import { MapMarker as MapMarkerIcon } from "../../../Icons";

import { Marker as MarkerType } from "../../../../types";

const Marker: FC<{ marker: MarkerType }> = (props) => {
  const { marker } = props;
  const { latitude, longitude } = marker;

  return (
    <MapMarker
      latitude={latitude}
      longitude={longitude}
      anchor="bottom"
      draggable
    >
      <MapMarkerIcon className="w-8 text-red-700" />
    </MapMarker>
  );
};

export default Marker;
