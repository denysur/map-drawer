import { FC, memo } from "react";
import { Marker as MapMarker, MarkerDragEvent } from "react-map-gl";

import { MapMarker as MapMarkerIcon } from "../../../Icons";

import { DEFAULT_MARKER_COLOR } from "../../../../constants";

import { Marker as MarkerType } from "../../../../types";

type MarkerProps = {
  marker: MarkerType;
  onClick?: (marker: MarkerType) => void;
  onPositionChanged?: (data: {
    id: string;
    latitude: number;
    longitude: number;
  }) => void;
};

const Marker: FC<MarkerProps> = memo((props) => {
  const { marker, onClick = () => {}, onPositionChanged = () => {} } = props;
  const { latitude, longitude } = marker;

  const onMarkerClickHandler = () => onClick(marker);
  const onPositionChangedHandler = (e: MarkerDragEvent) => {
    onPositionChanged({
      id: marker.id,
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    });
  };

  return (
    <MapMarker
      latitude={latitude}
      longitude={longitude}
      anchor="bottom"
      draggable
      onClick={onMarkerClickHandler}
      onDragEnd={onPositionChangedHandler}
    >
      <MapMarkerIcon
        width={24 * marker.scale}
        height={24 * marker.scale}
        fill={marker.color || DEFAULT_MARKER_COLOR}
      />
    </MapMarker>
  );
});

export default Marker;
