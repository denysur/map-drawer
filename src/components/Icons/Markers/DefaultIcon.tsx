import { FC, SVGProps } from "react";
import MapMarker from "./MapMarker";
import RocketMarker from "./RocketMarker";
import ShahedMarker from "./ShahedMarker";
import CruiseMissileMarker from "./CruiseMissileMarker";

type DefaultIconProps = {
  name?: string;
  withArrow?: boolean;
} & SVGProps<SVGSVGElement>;

const DefaultIcon: FC<DefaultIconProps> = ({ name, withArrow, ...props }) => {
  if (name === "rocket") {
    return <RocketMarker {...props} withArrow={withArrow} />;
  }
  if (name === "shahed") {
    return <ShahedMarker {...props} withArrow={withArrow} />;
  }
  if (name === "cruise-missile") {
    return <CruiseMissileMarker {...props} withArrow={withArrow} />;
  }
  return <MapMarker {...props} style={{ ...props.style, transform: "none" }} />;
};

export default DefaultIcon;
