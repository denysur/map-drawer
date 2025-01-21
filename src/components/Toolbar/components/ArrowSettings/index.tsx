import { ChangeEvent, FC, useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import { HexColorPicker } from "react-colorful";

import Button from "../../../Common/Button";
import { Close } from "../../../Icons";

import { getTextColor } from "../../../../utils/common";

import {
  DEFAULT_MARKER_COLOR,
  DEFAULT_MARKER_SCALE,
  MAXIMUM_MARKER_SCALE,
  MINIMUM_MARKER_SCALE,
} from "../../../../constants";

type ArrowSettingsProps = {
  isAddNewArrowMode: boolean;
  selectedArrow?: any;
  onClose: () => void;
  onArrowDelete: (id: string) => void;
  onArrowSizeChange: (data: { id: string; scale: number }) => void;
  onArrowColorChange: (data: { id: string; color: string }) => void;
};

const ArrowSettings: FC<ArrowSettingsProps> = ({
  isAddNewArrowMode,
  selectedArrow,
  onClose,
  onArrowDelete,
  onArrowSizeChange,
  onArrowColorChange,
}) => {
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

  const openColorPicker = () => setIsColorPickerVisible(true);
  const closeColorPicker = () => setIsColorPickerVisible(false);

  const ref = useClickAway<HTMLDivElement>(() => {
    closeColorPicker();
  });

  const onArrowSizeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectedArrow) {
      onArrowSizeChange({
        id: selectedArrow.id,
        scale: Number(e.target.value),
      });
    }
  };

  const onArrowColorChangeHandler = (newColor: string) => {
    if (selectedArrow) {
      onArrowColorChange({
        id: selectedArrow.id,
        color: newColor,
      });
    }
  };

  const onArrowDeleteHandler = () => {
    if (selectedArrow) {
      onArrowDelete(selectedArrow.id);
    }
  };

  if (isAddNewArrowMode) {
    return (
      <div className="flex gap-2 justify-between">
        <span className="text-center">
          Натисніть будь де на мапу, щоб зробити стрілку.
        </span>
        <Close onClick={onClose} className="cursor-pointer" />
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-96 gap-4">
      <div
        onClick={onClose}
        className="absolute p-2 top-1 right-1 justify-self-end rounded-lg ease duration-200 text-zinc-500 hover:bg-black/[.1] hover:text-black dark:hover:bg-white/[.05] dark:hover:text-white cursor-pointer"
      >
        <Close className="" />
      </div>
      <div>
        <h2 className="font-bold">Налаштування фігури</h2>
      </div>
      {!selectedArrow?.icon && (
        <div className="flex w-full gap-2 justify-between items-center">
          <span className="select-none">Змінити колір: </span>
          <div ref={ref} className="relative">
            <div
              className="p-2 w-24 text-center rounded-lg cursor-pointer font-bold"
              style={{
                backgroundColor: selectedArrow?.color || DEFAULT_MARKER_COLOR,
                color: getTextColor(
                  selectedArrow?.color || DEFAULT_MARKER_COLOR
                ),
              }}
              onClick={openColorPicker}
              onBlur={closeColorPicker}
            >
              {selectedArrow?.color}
            </div>
            {isColorPickerVisible && (
              <div className="absolute bottom-8 left-8">
                <HexColorPicker
                  color={selectedArrow?.color || DEFAULT_MARKER_COLOR}
                  onChange={onArrowColorChangeHandler}
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
            value={selectedArrow?.scale || DEFAULT_MARKER_SCALE}
            onChange={onArrowSizeChangeHandler}
            min={MINIMUM_MARKER_SCALE}
            max={MAXIMUM_MARKER_SCALE}
            step="0.1"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      </div>
      <div className="flex w-full gap-2">
        <Button color="error" className="w-full" onClick={onArrowDeleteHandler}>
          Видалити фігуру
        </Button>
      </div>
    </div>
  );
};

export default ArrowSettings;
