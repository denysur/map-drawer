import { FC } from "react";

import { Close } from "../../../Icons";

type DrawingSettingsProps = {
  isAddNewDrawingMode: boolean;
  selectedDraw?: any;
  onClose: () => void;
};

const DrawingSettings: FC<DrawingSettingsProps> = ({
  isAddNewDrawingMode,
  onClose,
}) => {
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

  return null;
};

export default DrawingSettings;
