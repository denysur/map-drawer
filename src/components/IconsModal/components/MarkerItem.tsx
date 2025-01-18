import { FC } from "react";
import clsx from "clsx";

import { MarkerIcon } from "../../../types";

export type MarkerItemProps = {
  icon: MarkerIcon;
  onClick?: (name: string) => void;
  selected: boolean;
};

const MarkerItem: FC<MarkerItemProps> = ({ icon, onClick, selected }) => {
  return (
    <div
      className={clsx(
        "p-4 w-full mx-auto rounded-lg flex justify-center ease duration-200",
        !selected && "hover:bg-black/[.05] cursor-pointer",
        selected && "bg-black/[.15]"
      )}
      onClick={() => onClick && onClick(icon.name)}
    >
      <figure>
        <img className="w-24 h-24" src={icon.url} alt={`marker-${icon.name}`} />
        <figcaption className="text-center text-sm">{icon.name}</figcaption>
      </figure>
    </div>
  );
};

export default MarkerItem;
