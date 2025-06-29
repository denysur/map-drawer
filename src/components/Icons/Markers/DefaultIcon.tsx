import { FC, SVGProps } from "react";
import MapMarker from "./MapMarker";
import RocketMarker from "./RocketMarker";
import ShahedMarker from "./ShahedMarker";
import CruiseMissileMarker from "./CruiseMissileMarker";

type DefaultIconProps = { name?: string } & SVGProps<SVGSVGElement>;

const DefaultIcon: FC<DefaultIconProps> = ({ name, ...props }) => {
  if (name === "rocket") {
    return <RocketMarker {...props} />;
  }
  if (name === "shahed") {
    return <ShahedMarker {...props} />;
  }
  if (name === "cruise-missile") {
    return <CruiseMissileMarker {...props} />;
  }
  return <MapMarker {...props} style={{ ...props.style, transform: "none" }} />;
};

export default DefaultIcon;
