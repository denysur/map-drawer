import { Marker as MapMarker, MarkerProps } from "react-map-gl";

import { MapMarker as MapMarkerIcon } from "../../../Icons";
import { FC } from "react";
import { Marker as MapboxMarker } from "mapbox-gl";

const Marker: FC<MarkerProps & React.RefAttributes<MapboxMarker>> = (props) => {
  return (
    <MapMarker {...props} anchor="bottom" draggable>
      <MapMarkerIcon className="w-8 text-red-700" />
    </MapMarker>
  );
};

export default Marker;
