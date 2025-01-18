import React, { useEffect, useState } from "react";
import clsx from "clsx";

import MarkerItem from "./components/MarkerItem";
import MapMarker from "../Icons/MapMarker";
import Loader from "../Common/Loader";

import { useMarkerImages } from "../../hooks/useMarkerImages";

const IconsModalView: React.FC = () => {
  const { images, isLoading, fetchAll } = useMarkerImages();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  if (isLoading)
    return (
      <div className="p-4 flex justify-center align-center text-blue-700">
        <Loader size={"large"} />
      </div>
    );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center gap-2 align-center justify-around">
      <div
        className={clsx(
          "p-4 w-full mx-auto rounded-lg flex justify-center ease duration-200",
          selected && "hover:bg-black/[.05] cursor-pointer",
          !selected && "bg-black/[.15]"
        )}
        onClick={() => selected && setSelected(null)}
      >
        <figure>
          <div className="p-2">
            <MapMarker className="w-20 h-20 text-blue-700" />
          </div>
          <figcaption className="text-center text-sm">Звичайний</figcaption>
        </figure>
      </div>
      {images?.map((icon, index) => (
        <MarkerItem
          key={index}
          icon={icon}
          selected={selected == icon.name}
          onClick={(name) => setSelected(name)}
        />
      ))}
    </div>
  );
};

export default IconsModalView;
