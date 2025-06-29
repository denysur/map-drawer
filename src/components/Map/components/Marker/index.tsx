import { FC, memo, MouseEventHandler } from "react";
import { Marker as MapMarker, MarkerDragEvent } from "react-map-gl";

import { DEFAULT_COLOR, DEFAULT_MARKER_SIZE } from "../../../../constants";

import { Marker as MarkerType } from "../../../../types";
import { useMarkers } from "../../../../hooks/state/useMarkers";
import DefaultIcon from "../../../Icons/Markers/DefaultIcon";

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
  const [{ isAddNewMarkerMode }] = useMarkers();

  const onMarkerClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    onClick(marker);
    if (isAddNewMarkerMode) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

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
      onDragEnd={onPositionChangedHandler}
    >
      <div onMouseDown={onMarkerClickHandler} className="w-full h-full">
        {icon && icon.type === "image" ? (
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
          <DefaultIcon
            name={icon?.name || "default"}
            width={DEFAULT_MARKER_SIZE * marker.scale}
            height={DEFAULT_MARKER_SIZE * marker.scale * 1.25}
            style={{ transform: `rotate(${marker.rotation}deg)` }}
            fill={marker.color || DEFAULT_COLOR}
          />
        )}
      </div>
    </MapMarker>
  );
});

export default Marker;
