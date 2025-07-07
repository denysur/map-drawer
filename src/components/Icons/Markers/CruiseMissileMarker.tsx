import { FC, SVGProps } from "react";
import Arrow from "../Arrow";

const CruiseMissileMarker: FC<
  SVGProps<SVGSVGElement> & { withArrow?: boolean }
> = ({ withArrow, className, ...props }) => (
  <div className="relative size-full">
    <svg
      focusable="false"
      aria-hidden="true"
      width={24}
      height={24}
      viewBox="0 0 321 580"
      style={{
        filter: `drop-shadow(0px 1px 0 #ee8800) drop-shadow(0px -1px 0 #ee8800) drop-shadow(1px 0 0 #ee8800) drop-shadow(-1px 0 0 #ee8800)`,
      }}
      fill="currentColor"
      {...props}
    >
      <path d="M206.13 233.018L302.197 279.184C306.355 281.182 309 285.387 309 290V331.04C309 334.998 307.048 338.702 303.783 340.939C300.518 343.177 296.359 343.66 292.668 342.231L206.13 308.735V459.272C206.13 460.662 205.888 462.042 205.416 463.349L196.772 487.279L205.462 512.224C205.904 513.493 206.129 514.827 206.129 516.171L206.13 556C206.13 559.182 204.866 562.235 202.615 564.485C200.365 566.736 197.312 568 194.13 568H123.113C116.486 568 111.113 562.627 111.113 556V516.171C111.113 514.827 111.339 513.493 111.781 512.224L120.211 488.021L111.752 463.135C111.329 461.891 111.113 460.586 111.113 459.272V308.768L28.332 340.809C24.6408 342.237 20.4819 341.754 17.2168 339.517C13.9519 337.279 12 333.576 12 329.618V288.577C12.0002 283.964 14.6449 279.76 18.8027 277.762L111.113 233.4V92.2783C111.113 90.3508 111.577 88.4513 112.467 86.7412L147.975 18.4629L148.175 18.0957C150.297 14.3388 154.285 12.0001 158.621 12C163.097 12 167.202 14.4916 169.268 18.4629L204.775 86.7412C205.665 88.4513 206.13 90.3508 206.13 92.2783V233.018Z" />
    </svg>
    {withArrow && (
      <Arrow
        className="absolute bottom-full left-1/2 -translate-x-1/2 scale-50 size-8 text-current -mb-2 -rotate-45"
        style={{ color: "#ee8800" }}
      />
    )}
  </div>
);

export default CruiseMissileMarker;
