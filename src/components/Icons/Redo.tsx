import { FC, SVGProps } from "react";

const Redo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    focusable="false"
    aria-hidden="true"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7z"></path>
  </svg>
);

export default Redo;
