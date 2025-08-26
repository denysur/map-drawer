import { FC, SVGProps } from "react";
import Arrow from "../Arrow";

const SurveillanceDroneMarker: FC<
  SVGProps<SVGSVGElement> & { withArrow?: boolean }
> = ({ withArrow, className, ...props }) => (
  <div className="relative size-full">
    <svg
      focusable="false"
      aria-hidden="true"
      width={24}
      height={24}
      viewBox="0 0 629 538"
      fill="currentColor"
      {...props}
    >
      <path d="M314.5 87H286C282 87 280 84 280 81V36C280 15.5 294 0 314.5 0C335 0 349 15.5 349 36V81C349 84 347 87 343 87H314.5ZM275 323H24C10.7452 323 0 312.255 0 299C0 264 18.5 225 158 225H275V146C275 140.5 280 95.4999 280 95.4999C280 95.4999 280 88.9999 286.5 88.9999H314.5H342.5C349 88.9999 349 95.4999 349 95.4999C349 95.4999 354 140.5 354 146V225H471C610.5 225 629 264 629 299C629 312.255 618.255 323 605 323H354V384.5C354 389.682 352.212 407.886 349.831 429.826L419 498C419.458 498.458 419.894 498.87 420.298 499.253C422.541 501.375 423.847 502.611 423 506L419 532.5C418.5 535 417 538.5 413 537C408.668 534.593 346.882 498.826 342.272 496.157C339.84 516.823 338 532 338 532C338 532 337.5 537 333 537H314.5H296C291.5 537 291 532 291 532C291 532 289.16 516.823 286.728 496.157C282.118 498.826 220.332 534.593 216 537C212 538.5 210.5 535 210 532.5L206 506C205.153 502.611 206.459 501.375 208.702 499.253C209.106 498.87 209.542 498.458 210 498L279.169 429.826C276.788 407.886 275 389.682 275 384.5V323Z" />
    </svg>
    {withArrow && (
      <Arrow
        className="absolute bottom-full left-1/2 -translate-x-1/2 scale-50 size-6 text-current -mb-1 -rotate-45"
        style={{ color: props.fill }}
      />
    )}
  </div>
);

export default SurveillanceDroneMarker;
