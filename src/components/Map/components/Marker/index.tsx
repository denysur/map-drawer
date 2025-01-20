import { FC, memo } from "react";
import { Marker as MapMarker, MarkerDragEvent } from "react-map-gl";

import { MapMarker as MapMarkerIcon } from "../../../Icons";

import {
  DEFAULT_MARKER_COLOR,
  DEFAULT_MARKER_SIZE,
} from "../../../../constants";

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
  const { latitude, longitude, icon } = marker;

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
      {icon ? (
        <div
          className="flex items-end justify-center"
          style={{
            height: DEFAULT_MARKER_SIZE * marker.scale,
            transform: `rotate(${marker.rotation}deg)`,
          }}
        >
          <img
            src={icon.url}
            className="object-contain object-center-bottom h-full"
          />
        </div>
      ) : (
        <MapMarkerIcon
          width={DEFAULT_MARKER_SIZE * marker.scale}
          height={DEFAULT_MARKER_SIZE * marker.scale}
          fill={marker.color || DEFAULT_MARKER_COLOR}
        />
      )}
    </MapMarker>
  );
});

export default Marker;
