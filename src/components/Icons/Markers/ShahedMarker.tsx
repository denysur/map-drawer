import { FC, SVGProps } from "react";

const ShahedMarker: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    focusable="false"
    aria-hidden="true"
    width={24}
    height={24}
    viewBox="0 0 473 492"
    fill="currentColor"
    {...props}
  >
    <path d="M204.279 68.2543H275.472V435.121H204.279V68.2543Z" />
    <path d="M236.007 0H246.484L275.504 68.2543H204.279L236.007 0Z" />
    <path d="M240.55 130.484L473.007 416.636V462H286.007L290.624 430.855H286.352L282.08 455.029H195.225L189.53 430.855H185.258L192.007 461.981H3.47108e-06L2.00676 416.636L240.55 130.484Z" />
    <path d="M195.225 455.029H282.08L276.385 492H202.344L195.225 455.029Z" />
  </svg>
);

export default ShahedMarker;
