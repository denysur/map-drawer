import React, { useEffect, useState, useTransition } from "react";

import MarkerItem from "./components/MarkerItem";
import Loader from "../Common/Loader";

import { useMarkerImages } from "../../hooks/useMarkerImages";
import Button from "../Common/Button";

type IconsModalProps = {
  onSelect?: (name: string) => void;
};

const IconsModal: React.FC<IconsModalProps> = ({ onSelect }) => {
  const { images, fetchAll, deleteImage, uploadImage } = useMarkerImages();

  const [isLoading, startTransition] = useTransition();

  const [selected, setSelected] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    startTransition(async () => {
      await fetchAll();
      setIsInitialLoading(false);
    });
  }, []);

  if (isInitialLoading)
    return (
      <div className="p-4 flex justify-center align-center text-blue-700">
        <Loader size={"large"} />
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center gap-2 align-center justify-around">
        {images?.map((icon, index) => (
          <MarkerItem
            key={index}
            icon={icon}
            selected={selected == icon.name}
            onClick={(name) => setSelected(name)}
          />
        ))}
      </div>
      <div>
        <Button
          onClick={() => {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = "image/*";
            fileInput.onchange = async (event) => {
              const file = (event.target as HTMLInputElement).files?.[0];
              if (file) {
                startTransition(async () => {
                  await uploadImage(file);
                });
              }
            };
            fileInput.click();
          }}
          disabled={isLoading}
        >
          UPL
        </Button>
        <Button
          disabled={isLoading || !selected}
          color="error"
          onClick={() => {
            selected && deleteImage(selected);
          }}
        >
          REM
        </Button>
        {onSelect && <Button>Select</Button>}
      </div>
    </div>
  );
};

export default IconsModal;
