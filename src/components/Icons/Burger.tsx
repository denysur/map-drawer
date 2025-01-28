import { FC, SVGProps } from "react";

const Burger: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    focusable="false"
    aria-hidden="true"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"></path>
  </svg>
);

export default Burger;
