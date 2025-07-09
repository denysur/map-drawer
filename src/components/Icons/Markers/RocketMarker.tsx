import clsx from "clsx";
import { FC, SVGProps } from "react";
import Arrow from "../Arrow";

const RocketMarker: FC<SVGProps<SVGSVGElement> & { withArrow?: boolean }> = ({
  withArrow,
  className,
  ...props
}) => {
  return (
    <div className="relative size-full">
      <svg
        focusable="false"
        aria-hidden="true"
        width={24}
        height={24}
        viewBox="0 0 155 488"
        className={clsx(
          "arrow transition-all duration-200 ease-out",
          className
        )}
        style={{
          filter: `drop-shadow(0px 1px 0 #ee8800) drop-shadow(0px -1px 0 #ee8800) drop-shadow(1px 0 0 #ee8800) drop-shadow(-1px 0 0 #ee8800)`,
        }}
        fill="currentColor"
        {...props}
      >
        <path d="M72.5 0L108.996 173.56L108.989 395.619L145 460.929H116.569V478H28.4314V460.929H0L36.0131 395.973L35.9606 173.56L72.5 0Z" />
      </svg>
      {withArrow && (
        <Arrow
          className="absolute bottom-full left-1/2 -translate-x-1/2 scale-50 size-6 text-current -mb-1 -rotate-45"
          style={{ color: "#ee8800" }}
        />
      )}
    </div>
  );
};

export default RocketMarker;
