import { FC, SVGProps } from "react";

const Arrow: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    focusable="false"
    aria-hidden="true"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z"></path>
  </svg>
);

export default Arrow;
