import clsx from "clsx";
import { FC, SVGProps } from "react";
import Arrow from "../Arrow";

const RocketMarker: FC<SVGProps<SVGSVGElement> & { withArrow?: boolean }> = ({
  withArrow,
  className,
  ...props
}) => (
  <div className="relative size-full">
    <svg
      focusable="false"
      aria-hidden="true"
      width={24}
      height={24}
      viewBox="0 0 155 488"
      fill="currentColor"
      className={clsx("arrow", className)}
      {...props}
    >
      <path
        d="M72.5 0L108.996 173.56L108.989 395.619L145 460.929H116.569V478H28.4314V460.929H0L36.0131 395.973L35.9606 173.56L72.5 0Z"
        stroke="#1278E6"
        strokeWidth={20}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    {withArrow && (
      <Arrow
        className="absolute bottom-full left-0 scale-50 size-full text-current -mb-2 -rotate-45"
        style={{ color: "#ee5522" }}
      />
    )}
  </div>
);

export default RocketMarker;
