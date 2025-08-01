import { FC, useEffect, useState, useTransition } from "react";

import { Upload, Delete } from "../Icons";
import Loader from "../Common/Loader";
import Button from "../Common/Button";
import MarkerItem from "./components/MarkerItem";

import { useMarkerImages } from "../../hooks/useMarkerImages";

import { MarkerIcon } from "../../types";

type IconsModalProps = { onSelect?: (icon: MarkerIcon | null) => void };

const IconsModal: FC<IconsModalProps> = ({ onSelect }) => {
  const { images, fetchAll, deleteImage, uploadImage } = useMarkerImages();

  const [isLoading, startTransition] = useTransition();

  const [selected, setSelected] = useState<MarkerIcon | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    startTransition(async () => {
      await fetchAll();
      setIsInitialLoading(false);
    });
  }, []);

  const onMarkerIconClickHandler = (icon: MarkerIcon) => {
    setSelected(
      icon.name != selected?.name ? { ...icon, type: "image" } : null
    );
  };

  const onImageUploadHandler = () => {
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
  };
  const onImageDeleteHandler = () => {
    selected && deleteImage(selected.name);
  };
  const onSelectClickHandler = () => {
    if (onSelect) onSelect(selected);
  };

  if (isInitialLoading)
    return (
      <div className="p-4 flex justify-center align-center text-blue-700">
        <Loader size={"large"} />
      </div>
    );

  return (
    <div className="flex flex-col overflow-hidden h-dvh md:h-auto">
      <div className="flex-grow py-4 overflow-y-auto">
        <div className="px-4 grid grid-cols-2 min-[384px]:grid-cols-3 min-[512px]:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 items-center gap-2 align-center justify-around overflow-auto">
          {images?.map((icon) => (
            <MarkerItem
              key={`marker-${icon.name}`}
              icon={icon}
              selected={!!selected && selected.name == icon.name}
              onClick={onMarkerIconClickHandler}
            />
          ))}
        </div>
      </div>
      <div className="p-4 pt-2 flex justify-end gap-2">
        {!onSelect ? (
          <>
            <Button
              className="!p-2"
              disabled={isLoading || !selected}
              color="error"
              onClick={onImageDeleteHandler}
            >
              <Delete />{" "}
              <span className="max-[355px]:hidden">Видалити файл</span>
            </Button>
            <Button
              onClick={onImageUploadHandler}
              className="!p-2"
              disabled={isLoading}
            >
              <Upload /> <span className="max-[355px]:hidden">Завантажити</span>
            </Button>
          </>
        ) : (
          <>
            {/* <Button
              className="!p-2"
              disabled={isLoading || !selected}
              color="error"
              onClick={onImageDeleteHandler}
            >
              <Delete />
            </Button> */}
            <Button
              onClick={onImageUploadHandler}
              className="!p-2"
              disabled={isLoading}
            >
              <Upload />
            </Button>
            <Button
              disabled={isLoading || !selected}
              onClick={onSelectClickHandler}
              className=""
            >
              Вибрати
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default IconsModal;
