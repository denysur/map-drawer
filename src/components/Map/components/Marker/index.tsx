import { FC, memo } from "react";
import { Marker as MapMarker, MarkerDragEvent } from "react-map-gl";
import clsx from "clsx";

import DefaultIcon from "../../../Icons/Markers/DefaultIcon";

import { useMarkers } from "../../../../hooks/state/useMarkers";
import { useItemDefaultColor } from "../../../../hooks/useItemDefaultColor";

import { DEFAULT_MARKER_SIZE } from "../../../../constants";

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
  const [{ isAddNewMarkerMode }] = useMarkers();
  const defaultColor = useItemDefaultColor();

  const onMarkerClickHandler = (e: unknown) => {
    onClick(marker);
    if (isAddNewMarkerMode) {
      (e as Event).stopPropagation();
      (e as Event).preventDefault();
    }
  };

  const onPositionChangedHandler = (e: MarkerDragEvent) => {
    onPositionChanged({
      id: marker.id,
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    });
  };

  const markerSize = DEFAULT_MARKER_SIZE * marker.scale;

  const getMarkerAdditionalScaleByName = (value: number, name?: string) => {
    if (name === "rocket") {
      return value * 1.4;
    }
    if (name === "cruise-missile") {
      return value * 0.8;
    }
    if (name === "shahed") {
      return value * 0.8;
    }

    return value;
  };

  return (
    <MapMarker
      latitude={latitude}
      longitude={longitude}
      anchor={icon?.name ? "center" : "bottom"}
      draggable
      onDragEnd={onPositionChangedHandler}
      rotation={icon?.name ? marker.rotation : undefined}
    >
      <div
        onMouseDown={onMarkerClickHandler}
        onTouchStart={onMarkerClickHandler}
        className={clsx(
          "w-full h-full",
          icon?.name && "arrow",
          isAddNewMarkerMode && "pointer-events-none"
        )}
      >
        {icon && icon.type === "image" ? (
          <div
            className="flex items-end justify-center"
            style={{
              height: markerSize,
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
            width={getMarkerAdditionalScaleByName(markerSize, icon?.name)}
            height={getMarkerAdditionalScaleByName(
              markerSize * 1.25,
              icon?.name
            )}
            fill={marker.color || defaultColor}
            withArrow
          />
        )}
      </div>
    </MapMarker>
  );
});

export default Marker;
