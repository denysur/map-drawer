import React from "react";
import { MarkerIcon } from "../../../types";
import clsx from "clsx";

export type MarkerItemProps = {
  icon: MarkerIcon;
  onClick?: (name: string) => void;
  selected: boolean;
};

const MarkerItem: React.FC<MarkerItemProps> = ({ icon, onClick, selected }) => {
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
