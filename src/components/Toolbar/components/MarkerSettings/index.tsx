import { FC, ChangeEvent } from "react";

import Button from "../../../Common/Button";
import Close from "../../../Icons/Close";

import { DEFAULT_MARKER_COLOR } from "../../../../constants";

import { Marker } from "../../../../types";

type MarkerSettingsProps = {
  isAddNewMarkerMode: boolean;
  selectedMarker?: Marker;
  onClose: () => void;
  onMarkerSizeChange: (data: { id: string; scale: number }) => void;
};

const MarkerSettings: FC<MarkerSettingsProps> = ({
  isAddNewMarkerMode,
  selectedMarker,
  onClose,
  onMarkerSizeChange,
}) => {
  if (isAddNewMarkerMode) {
    return <span>Натисніть будь де на мапу, щоб додати маркер</span>;
  }

  const onMarkerSizeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectedMarker) {
      onMarkerSizeChange({
        id: selectedMarker.id,
        scale: Number(e.target.value),
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full justify-end">
        <Close onClick={onClose} className="cursor-pointer" />
      </div>
      <div className="flex w-full gap-2 justify-between">
        <div>Іконка: (За замовчуванням)</div>
        <Button size="small">Змінити</Button>
      </div>
      <div className="flex w-full gap-2">
        <div>Колір:</div>
        <div
          className="w-6 h-6 rounded cursor-pointer"
          style={{
            backgroundColor: selectedMarker?.color || DEFAULT_MARKER_COLOR,
          }}
        />
      </div>
      <div className="flex w-full gap-2">
        <div>Розмір:</div>
        <div>
          <input
            type="range"
            value={selectedMarker?.scale || 1}
            onChange={onMarkerSizeChangeHandler}
            min="0.1"
            max="3"
            step="0.1"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default MarkerSettings;
