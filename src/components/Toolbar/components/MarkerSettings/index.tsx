import { FC, ChangeEvent, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useClickAway } from "@uidotdev/usehooks";

import Button, { ButtonColors } from "../../../Common/Button";
import Modal from "../../../Common/Modal";
import IconButton from "../../../Common/IconButton";
import IconsModal from "../../../IconsModal";
import { Edit, Close, Redo, Undo } from "../../../Icons";
import DefaultIcon from "../../../Icons/Markers/DefaultIcon";

import { getTextColor } from "../../../../utils/common";
import { useOnChangeHistorySubscription } from "../../../../hooks/useOnChangeHistorySubscription";
import { useItemDefaultColor } from "../../../../hooks/useItemDefaultColor";

import {
  DEFAULT_SCALE,
  MAXIMUM_SCALE,
  MINIMUM_SCALE,
} from "../../../../constants";

import {
  DefaultMarkerIcon,
  MarkerIconTypes,
  Marker,
  MarkerIcon,
} from "../../../../types";
import { useHistory } from "../../../../hooks/state/useHistory";

const DEFAULT_MARKERS: {
  id: MarkerIconTypes;
  name: string;
  color?: ButtonColors;
  selectedColor?: ButtonColors;
}[] = [
  {
    id: MarkerIconTypes.rocket,
    name: "Ракета",
  },
  {
    id: MarkerIconTypes.shahed,
    name: "Шахед",
  },
  {
    id: MarkerIconTypes.cruiseMissile,
    name: "Крилата ракета",
  },
  {
    id: MarkerIconTypes.surveillance,
    name: "Розвід-дрон",
  },
  {
    id: MarkerIconTypes.friendlyDrone,
    name: "Дружній дрон",
    color: "secondary",
    selectedColor: "secondaryLight",
  },
];

type MarkerSettingsProps = {
  isAddNewMarkerMode: boolean;
  selectedMarker?: Marker;
  iconOnCreating?: string;
  onClose: () => void;
  onMarkerSizeChange: (data: { id: string; scale: number }) => void;
  onMarkerRotationChange: (data: { id: string; rotation: number }) => void;
  onMarkerColorChange: (data: { id: string; color: string }) => void;
  onMarkerIconChange: (data: {
    id: string;
    icon: MarkerIcon | DefaultMarkerIcon | null;
  }) => void;
  onMarkerDelete: (id: string) => void;
  onIconCreatingChange: (icon?: DefaultMarkerIcon) => void;
};

const MarkerSettings: FC<MarkerSettingsProps> = ({
  isAddNewMarkerMode,
  selectedMarker,
  iconOnCreating,
  onClose,
  onMarkerSizeChange,
  onMarkerRotationChange,
  onMarkerColorChange,
  onMarkerIconChange,
  onMarkerDelete,
  onIconCreatingChange,
}) => {
  const { undo, redo, canUndo, canRedo } = useHistory();

  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [isIconsModalOpen, setIsIconsModalOpen] = useState(false);
  const defaultColor = useItemDefaultColor();

  const { pushRemove } = useOnChangeHistorySubscription({
    id: selectedMarker?.id,
    tool: "marker",
    state: selectedMarker,
  });

  const openColorPicker = () => setIsColorPickerVisible(true);
  const closeColorPicker = () => setIsColorPickerVisible(false);

  const openIconsModal = () => setIsIconsModalOpen(true);
  const closeIconsModal = () => setIsIconsModalOpen(false);

  const onMarkerIconChangeHandler = (icon: MarkerIcon | null) => {
    if (selectedMarker) {
      onMarkerIconChange({ id: selectedMarker.id, icon });
    }
    setIsIconsModalOpen(false);
  };
  const onMarkerIconRemoveHandler = () => {
    if (selectedMarker) {
      onMarkerIconChange({ id: selectedMarker.id, icon: null });
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
      onMarkerColorChange({ id: selectedMarker.id, color: newColor });
    }
  };

  const onMarkerDeleteHandler = () => {
    if (selectedMarker) {
      onMarkerDelete(selectedMarker.id);
      pushRemove();
    }
  };

  const onUndoButtonClickHandler = () => {
    undo();
  };

  const onRedoButtonClickHandler = () => {
    redo();
  };

  if (isAddNewMarkerMode) {
    return (
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 gap-y-4 items-center max-md:flex-col mx-auto">
          <div className="flex gap-2 items-center mx-auto">
            {DEFAULT_MARKERS.map((marker) => (
              <IconButton
                key={marker.id}
                color={
                  marker.id === iconOnCreating
                    ? marker.color || "primary"
                    : marker.selectedColor || "primaryLight"
                }
                className={
                  marker.id === iconOnCreating
                    ? "scale-110 dark:bg-blue-200!"
                    : ""
                }
                iconComponent={() => (
                  <DefaultIcon
                    type={marker.id}
                    style={{
                      transform: `rotate(45deg) scale(1.2)${marker.id === MarkerIconTypes.shahed ? "translate(-1px, -3px)" : ""}`,
                    }}
                  />
                )}
                onClick={() => {
                  onIconCreatingChange(
                    marker.id === iconOnCreating
                      ? undefined
                      : { type: marker.id, name: marker.name }
                  );
                }}
              />
            ))}
          </div>
          <div className="w-0.5 bg-gray-200 dark:bg-zinc-700 h-[36px] rounded ease duration-200 max-md:hidden" />
          <div className="flex gap-2">
            <IconButton
              iconComponent={Undo}
              disabled={!canUndo}
              className="!text-orange-700 bg-orange-100 [&:not(:disabled)]:hover:bg-orange-200 dark:!text-orange-100 dark:bg-orange-900 [&:not(:disabled)]:dark:hover:!bg-orange-800 dark:focus:ring-orange-400"
              onClick={onUndoButtonClickHandler}
            />
            <IconButton
              iconComponent={Redo}
              disabled={!canRedo}
              className="!text-orange-700 bg-orange-100 [&:not(:disabled)]:hover:bg-orange-200 dark:!text-orange-100 dark:bg-orange-900 [&:not(:disabled)]:dark:hover:!bg-orange-800 dark:focus:ring-orange-400"
              onClick={onRedoButtonClickHandler}
            />
          </div>
        </div>
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
            {selectedMarker?.icon?.type === "image"
              ? selectedMarker?.icon?.name
              : selectedMarker?.icon?.name
                ? `(${selectedMarker?.icon?.name})`
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
                backgroundColor: selectedMarker?.color || defaultColor,
                color: getTextColor(selectedMarker?.color || defaultColor),
              }}
              onClick={openColorPicker}
              onBlur={closeColorPicker}
            >
              {selectedMarker?.color}
            </div>
            {isColorPickerVisible && (
              <div className="absolute bottom-11 -left-10 md:left-0">
                <HexColorPicker
                  color={selectedMarker?.color || defaultColor}
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
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700 ease duration-200"
          />
        </div>
      </div>
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
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700 ease duration-200"
          />
        </div>
      </div>

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
