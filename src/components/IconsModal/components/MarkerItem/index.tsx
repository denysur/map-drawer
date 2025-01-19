import { FC } from "react";
import clsx from "clsx";

import { MarkerIcon } from "../../../../types";

export type MarkerItemProps = {
  icon: MarkerIcon;
  onClick?: (icon: MarkerIcon) => void;
  selected: boolean;
};

const MarkerItem: FC<MarkerItemProps> = ({ icon, onClick, selected }) => {
  const onMarkerClickHandler = () => onClick && onClick(icon);
  return (
    <div
      className={clsx(
        "py-2 px-1 w-full mx-auto rounded-lg flex justify-center ease duration-200",
        !selected &&
          "hover:bg-black/[.05] dark:hover:bg-white/[.05] cursor-pointer",
        selected && "bg-black/[.10] dark:bg-white/[.10]"
      )}
      onClick={onMarkerClickHandler}
    >
      <figure className="flex flex-col items-center truncate">
        <img
          className="w-12 h-12 object-contain"
          src={icon.url}
          alt={`marker-${icon.name}`}
        />
        <figcaption className="text-center text-xs">{icon.name}</figcaption>
      </figure>
    </div>
  );
};

export default MarkerItem;
