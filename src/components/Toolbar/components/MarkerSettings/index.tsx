import { FC } from "react";

import Close from "../../../Icons/Close";

import { Marker } from "../../../../types";

type MarkerSettingsProps = {
  isAddNewMarkerMode: boolean;
  selectedMarker?: Marker;
  onClose: () => void;
};

const MarkerSettings: FC<MarkerSettingsProps> = ({
  isAddNewMarkerMode,
  onClose,
}) => {
  if (isAddNewMarkerMode) {
    return <span>Натисніть будь де на мапу, щоб додати маркер</span>;
  }

  return (
    <div>
      <div className="flex w-full justify-end">
        <Close onClick={onClose} className="cursor-pointer" />
      </div>
      <div>розмір</div>
    </div>
  );
};

export default MarkerSettings;
