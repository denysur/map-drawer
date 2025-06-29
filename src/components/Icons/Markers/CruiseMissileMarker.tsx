import { FC, SVGProps } from "react";

const CruiseMissileMarker: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    focusable="false"
    aria-hidden="true"
    width={24}
    height={24}
    viewBox="0 0 273 532"
    fill="currentColor"
    {...props}
  >
    <path d="M99.1135 68.2781H170.129V435.273H99.1135V68.2781Z" />
    <path d="M134.621 0L170.129 68.2781H99.1135L134.621 0Z" />
    <path d="M121.839 502.128L99.1135 435.273H170.129L145.984 502.128H121.839Z" />
    <path d="M120.418 431.005H148.825L170.129 492.171H99.1134L120.418 431.005Z" />
    <path d="M99.1134 492.171H170.129L170.129 532H99.1135L99.1134 492.171Z" />
    <path d="M133.201 200.567L4.23895e-07 264.578L0 305.618L148.524 248.131L133.201 200.567Z" />
    <path d="M139.799 201.989L273 266V307.04L124.476 249.553L139.799 201.989Z" />
  </svg>
);

export default CruiseMissileMarker;
