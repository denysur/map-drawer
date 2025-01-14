import { FC } from "react";

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
      <div onClick={onClose}>закрити</div>
      <div>розмір</div>
    </div>
  );
};

export default MarkerSettings;
