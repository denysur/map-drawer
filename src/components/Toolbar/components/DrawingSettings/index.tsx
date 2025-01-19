import { ChangeEvent, FC, useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import { HexColorPicker } from "react-colorful";

import Button from "../../../Common/Button";
import { Close } from "../../../Icons";

import { DEFAULT_MARKER_COLOR } from "../../../../constants";

type DrawingSettingsProps = {
  isAddNewDrawingMode: boolean;
  selectedDraw?: any;
  onClose: () => void;
  onDrawDelete: (id: string) => void;
  onDrawSizeChange: (data: { id: string; scale: number }) => void;
  onDrawColorChange: (data: { id: string; color: string }) => void;
};

const DrawingSettings: FC<DrawingSettingsProps> = ({
  isAddNewDrawingMode,
  selectedDraw,
  onClose,
  onDrawDelete,
  onDrawSizeChange,
  onDrawColorChange,
}) => {
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

  const openColorPicker = () => setIsColorPickerVisible(true);
  const closeColorPicker = () => setIsColorPickerVisible(false);

  const ref = useClickAway<HTMLDivElement>(() => {
    closeColorPicker();
  });

  const onDrawSizeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectedDraw) {
      onDrawSizeChange({
        id: selectedDraw.id,
        scale: Number(e.target.value),
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
    }
  };

  if (isAddNewDrawingMode) {
    return (
      <div className="flex gap-2 justify-between">
        <span className="text-center">
          Натисніть будь де на мапу, щоб почати малювати.
        </span>
        <Close onClick={onClose} className="cursor-pointer" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full justify-end">
        <Close onClick={onClose} className="cursor-pointer" />
      </div>
      <div className="flex w-full gap-2">
        <div>Колір:</div>
        <div ref={ref} className="relative">
          <div
            className="w-6 h-6 rounded cursor-pointer"
            style={{
              backgroundColor: selectedDraw?.color || DEFAULT_MARKER_COLOR,
            }}
            onClick={openColorPicker}
            onBlur={closeColorPicker}
          ></div>
          {isColorPickerVisible && (
            <div className="absolute bottom-8 left-8">
              <HexColorPicker
                color={selectedDraw?.color || DEFAULT_MARKER_COLOR}
                onChange={onDrawColorChangeHandler}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full gap-2">
        <div>Розмір:</div>
        <div>
          <input
            type="range"
            value={selectedDraw?.scale || 1}
            onChange={onDrawSizeChangeHandler}
            min="0.1"
            max="3"
            step="0.1"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      </div>
      <div className="flex w-full gap-2">
        <Button size="small" color="error" onClick={onDrawDeleteHandler}>
          Видалити фігуру
        </Button>
      </div>
    </div>
  );
};

export default DrawingSettings;
