import { FC, SVGProps } from "react";

import MapMarker from "./MapMarker";
import RocketMarker from "./RocketMarker";
import ShahedMarker from "./ShahedMarker";
import CruiseMissileMarker from "./CruiseMissileMarker";
import FriendlyDroneMarker from "./FriendlyDroneMarker";
import SurveillanceDroneMarker from "./SurveillanceDroneMarker";
import { MarkerIconTypes } from "../../../types";

type DefaultIconProps = {
  type?: MarkerIconTypes;
  withArrow?: boolean;
} & SVGProps<SVGSVGElement>;

const DefaultIcon: FC<DefaultIconProps> = ({ type, withArrow, ...props }) => {
  if (type === MarkerIconTypes.rocket) {
    return <RocketMarker {...props} withArrow={withArrow} />;
  }
  if (type === MarkerIconTypes.shahed) {
    return <ShahedMarker {...props} withArrow={withArrow} />;
  }
  if (type === MarkerIconTypes.cruiseMissile) {
    return <CruiseMissileMarker {...props} withArrow={withArrow} />;
  }
  if (type === MarkerIconTypes.friendlyDrone) {
    return <FriendlyDroneMarker {...props} withArrow={withArrow} />;
  }
  if (type === MarkerIconTypes.surveillance) {
    return <SurveillanceDroneMarker {...props} withArrow={withArrow} />;
  }
  return <MapMarker {...props} style={{ ...props.style, transform: "none" }} />;
};

export default DefaultIcon;
