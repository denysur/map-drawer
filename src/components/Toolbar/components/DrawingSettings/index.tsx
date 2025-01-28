import { ChangeEvent, FC, useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import { HexColorPicker } from "react-colorful";

import Button from "../../../Common/Button";
import { Close } from "../../../Icons";

import { getTextColor } from "../../../../utils/common";

import {
  DEFAULT_COLOR,
  DEFAULT_SCALE,
  MAXIMUM_SCALE,
  MINIMUM_SCALE,
} from "../../../../constants";
import { useOnChangeHistorySubscription } from "../../../../hooks/useOnChangeHistorySubscription";

type DrawingSettingsProps = {
  isAddNewDrawingMode: boolean;
  selectedDraw?: any;
  onClose: () => void;
  onDrawDelete: (id: string) => void;
  onDrawWeightChange: (data: { id: string; weight: number }) => void;
  onDrawColorChange: (data: { id: string; color: string }) => void;
};

const DrawingSettings: FC<DrawingSettingsProps> = ({
  isAddNewDrawingMode,
  selectedDraw,
  onClose,
  onDrawDelete,
  onDrawWeightChange,
  onDrawColorChange,
}) => {
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

  const { pushRemove } = useOnChangeHistorySubscription({
    id: selectedDraw?.id,
    tool: "freehand-draw",
    state: selectedDraw,
  });

  const openColorPicker = () => setIsColorPickerVisible(true);
  const closeColorPicker = () => setIsColorPickerVisible(false);

  const ref = useClickAway<HTMLDivElement>(() => {
    closeColorPicker();
  });

  const onDrawWeightChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectedDraw) {
      onDrawWeightChange({
        id: selectedDraw.id,
        weight: Number(e.target.value),
      });
    }
  };

  const onDrawColorChangeHandler = (newColor: string) => {
    if (selectedDraw) {
      onDrawColorChange({
        id: selectedDraw.id,
        color: newColor,
      });
    }
  };

  const onDrawDeleteHandler = () => {
    if (selectedDraw) {
      onDrawDelete(selectedDraw.id);
      pushRemove();
    }
  };

  if (isAddNewDrawingMode) {
    return (
      <div className="flex gap-2 justify-between">
        <span className="text-center">
          Натисніть будь де на мапу, щоб почати малювати.
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
        <h2 className="font-bold">Налаштування фігури</h2>
      </div>
      <div className="flex w-full gap-1">
        <span className="select-none">Тип: </span>
        <span className="select-none">
          {selectedDraw.geometry.name === "circle"
            ? "Круг"
            : selectedDraw.geometry.name === "rectangle"
              ? "Прямокутник"
              : selectedDraw.geometry.name === "quadrilateral"
                ? "Чотирикутник"
                : selectedDraw.geometry.name === "golden-ratio triangle" ||
                    selectedDraw.geometry.name === "silver-ratio triangle" ||
                    selectedDraw.geometry.name === "triangle"
                  ? "Трикутник"
                  : selectedDraw.geometry.name === "hexagon"
                    ? "Шестикутник"
                    : "Лінія"}
        </span>
      </div>
      {!selectedDraw?.icon && (
        <div className="flex w-full gap-2 justify-between items-center">
          <span className="select-none">Змінити колір: </span>
          <div ref={ref} className="relative">
            <div
              className="p-2 w-24 text-center rounded-lg cursor-pointer font-bold"
              style={{
                backgroundColor: selectedDraw?.color || DEFAULT_COLOR,
                color: getTextColor(selectedDraw?.color || DEFAULT_COLOR),
              }}
              onClick={openColorPicker}
              onBlur={closeColorPicker}
            >
              {selectedDraw?.color}
            </div>
            {isColorPickerVisible && (
              <div className="absolute bottom-8 left-8">
                <HexColorPicker
                  color={selectedDraw?.color || DEFAULT_COLOR}
                  onChange={onDrawColorChangeHandler}
                />
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex w-full gap-2 flex-col justify-between">
        <span className="select-none">Товщина лінії: </span>
        <div className="w-full">
          <input
            type="range"
            value={selectedDraw?.weight || DEFAULT_SCALE}
            onChange={onDrawWeightChangeHandler}
            min={MINIMUM_SCALE}
            max={MAXIMUM_SCALE}
            step="0.1"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      </div>
      <div className="flex w-full gap-2">
        <Button color="error" className="w-full" onClick={onDrawDeleteHandler}>
          Видалити фігуру
        </Button>
      </div>
    </div>
  );
};

export default DrawingSettings;
