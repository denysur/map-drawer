import { FC } from "react";

const MarkerSettings: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div>
      <div onClick={onClose}>close</div>
      <div>slider</div>
    </div>
  );
};

export default MarkerSettings;
