import { FC, ChangeEvent, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useClickAway } from "@uidotdev/usehooks";

import Button from "../../../Common/Button";
import Modal from "../../../Common/Modal";
import IconsModal from "../../../IconsModal";
import { Edit, Close } from "../../../Icons";

import { getTextColor } from "../../../../utils/common";

import {
  DEFAULT_COLOR,
  DEFAULT_SCALE,
  MAXIMUM_SCALE,
  MINIMUM_SCALE,
} from "../../../../constants";

import { Marker, MarkerIcon } from "../../../../types";

type MarkerSettingsProps = {
  isAddNewMarkerMode: boolean;
  selectedMarker?: Marker;
  onClose: () => void;
  onMarkerSizeChange: (data: { id: string; scale: number }) => void;
  onMarkerRotationChange: (data: { id: string; rotation: number }) => void;
  onMarkerColorChange: (data: { id: string; color: string }) => void;
  onMarkerIconChange: (data: { id: string; icon: MarkerIcon | null }) => void;
  onMarkerDelete: (id: string) => void;
};

const MarkerSettings: FC<MarkerSettingsProps> = ({
  isAddNewMarkerMode,
  selectedMarker,
  onClose,
  onMarkerSizeChange,
  onMarkerRotationChange,
  onMarkerColorChange,
  onMarkerIconChange,
  onMarkerDelete,
}) => {
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [isIconsModalOpen, setIsIconsModalOpen] = useState(false);

  const openColorPicker = () => setIsColorPickerVisible(true);
  const closeColorPicker = () => setIsColorPickerVisible(false);

  const openIconsModal = () => setIsIconsModalOpen(true);
  const closeIconsModal = () => setIsIconsModalOpen(false);

  const onMarkerIconChangeHandler = (icon: MarkerIcon | null) => {
    if (selectedMarker) {
      onMarkerIconChange({
        id: selectedMarker.id,
        icon,
      });
    }
    setIsIconsModalOpen(false);
  };
  const onMarkerIconRemoveHandler = () => {
    if (selectedMarker) {
      onMarkerIconChange({
        id: selectedMarker.id,
        icon: null,
      });
    }
  };

  const ref = useClickAway<HTMLDivElement>(() => {
    closeColorPicker();
  });

  const onMarkerSizeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectedMarker) {
      onMarkerSizeChange({
        id: selectedMarker.id,
        scale: Number(e.target.value),
      });
    }
  };

  const onMarkerRotationChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectedMarker) {
      onMarkerRotationChange({
        id: selectedMarker.id,
        rotation: Number(e.target.value),
      });
    }
  };

  const onMarkerColorChangeHandler = (newColor: string) => {
    if (selectedMarker) {
      onMarkerColorChange({
        id: selectedMarker.id,
        color: newColor,
      });
    }
  };

  const onMarkerDeleteHandler = () => {
    if (selectedMarker) {
      onMarkerDelete(selectedMarker.id);
    }
  };

  if (isAddNewMarkerMode) {
    return (
      <div className="flex gap-2 justify-between">
        <span className="text-center">
          Натисніть будь де на мапу, щоб додати маркер
        </span>
        <Close onClick={onClose} className="cursor-pointer min-w-6" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-[270px]">
      <div
        onClick={onClose}
        className="absolute p-2 top-1 right-1 justify-self-end rounded-lg ease duration-200 text-zinc-500 hover:bg-black/[.1] hover:text-black dark:hover:bg-white/[.05] dark:hover:text-white cursor-pointer"
      >
        <Close className="" />
      </div>
      <div>
        <h2 className="font-bold">Налаштування маркера</h2>
      </div>
      <div className="flex w-full gap-4 justify-between items-center">
        <div className="truncate">
          <span className="select-none">Іконка: </span>
          <span>
            {selectedMarker?.icon
              ? selectedMarker.icon.name
              : "(за замовчуванням)"}
          </span>
        </div>
        <div className="flex gap-2">
          {selectedMarker?.icon && (
            <Button
              color="error"
              className="!p-2"
              onClick={onMarkerIconRemoveHandler}
              size="small"
            >
              <Close className="h-5 w-5" />
            </Button>
          )}
          <Button className="!p-2" onClick={openIconsModal} size="small">
            <Edit className="h-5 w-5" />
          </Button>
        </div>
        <Modal
          isOpen={isIconsModalOpen}
          title="Виберіть іконку маркеру"
          onClose={closeIconsModal}
        >
          <IconsModal onSelect={onMarkerIconChangeHandler} />
        </Modal>
      </div>
      {!selectedMarker?.icon && (
        <div className="flex w-full gap-2 justify-between items-center">
          <span className="select-none">Змінити колір: </span>
          <div ref={ref} className="relative">
            <div
              className="p-2 w-24 text-center rounded-lg cursor-pointer font-bold"
              style={{
                backgroundColor: selectedMarker?.color || DEFAULT_COLOR,
                color: getTextColor(selectedMarker?.color || DEFAULT_COLOR),
              }}
              onClick={openColorPicker}
              onBlur={closeColorPicker}
            >
              {selectedMarker?.color}
            </div>
            {isColorPickerVisible && (
              <div className="absolute bottom-8 left-8">
                <HexColorPicker
                  color={selectedMarker?.color || DEFAULT_COLOR}
                  onChange={onMarkerColorChangeHandler}
                />
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex w-full gap-2 flex-col justify-between">
        <span className="select-none">Розмір: </span>
        <div className="w-full">
          <input
            type="range"
            value={selectedMarker?.scale || DEFAULT_SCALE}
            onChange={onMarkerSizeChangeHandler}
            min={MINIMUM_SCALE}
            max={MAXIMUM_SCALE}
            step="0.1"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      </div>
      {selectedMarker?.icon && (
        <div className="flex w-full gap-2 flex-col justify-between">
          <span className="select-none">Поворот: </span>
          <div className="w-full">
            <input
              type="range"
              value={selectedMarker?.rotation || 0}
              onChange={onMarkerRotationChangeHandler}
              min={0}
              max={360}
              step="1"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>
        </div>
      )}
      <div className="flex w-full gap-2">
        <Button
          color="error"
          className="w-full"
          onClick={onMarkerDeleteHandler}
        >
          Видалити маркер
        </Button>
      </div>
    </div>
  );
};

export default MarkerSettings;
