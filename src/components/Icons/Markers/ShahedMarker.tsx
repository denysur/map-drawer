import { FC, SVGProps } from "react";
import Arrow from "../Arrow";

const ShahedMarker: FC<SVGProps<SVGSVGElement> & { withArrow?: boolean }> = ({
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
      viewBox="-20 0 513 512"
      style={{
        filter: `drop-shadow(0px 1px 0 #ee8800) drop-shadow(0px -1px 0 #ee8800) drop-shadow(1px 0 0 #ee8800) drop-shadow(-1px 0 0 #ee8800)`,
      }}
      fill="currentColor"
      {...props}
    >
      <path d="M275.472 68.2543V173.473L473.007 416.636V462H286.007L290.624 430.855H286.352L276.385 492H202.344L189.53 430.855H185.258L192.007 461.981H3.47108e-06V417L204.279 173.994V68.2543L236.007 0H246.484L275.472 68.2543Z" />
    </svg>
    {withArrow && (
      <Arrow className="absolute bottom-full left-1/2 -translate-x-1/2 scale-50 size-8 text-current -mb-2 -rotate-45 text-[#ee8800]" />
    )}
  </div>
);

export default ShahedMarker;
