import { FC, SVGProps } from "react";

const RocketMarker: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    focusable="false"
    aria-hidden="true"
    width={24}
    height={24}
    viewBox="0 0 145 478"
    fill="currentColor"
    {...props}
  >
    <path d="M72.5 0L108.996 173.56H35.9606L72.5 0Z" />
    <path d="M36.0131 173.56H108.987V458.083H36.0131V173.56Z" />
    <path d="M28.4314 460.929H116.569V478H28.4314V460.929Z" />
    <path d="M36.2817 395.488H108.917L145 460.929H0L36.2817 395.488Z" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M145 460.929L108.917 395.488H36.2817L0 460.929H145Z"
    />
  </svg>
);

export default RocketMarker;
