import { FC, useEffect, useState, useTransition } from "react";

import MarkerItem from "./components/MarkerItem";
import Loader from "../Common/Loader";
import Button from "../Common/Button";
import Upload from "../Icons/Upload";
import Delete from "../Icons/Delete";

import { useMarkerImages } from "../../hooks/useMarkerImages";

import { MarkerIcon } from "../../types";

type IconsModalProps = {
  onSelect?: (icon: MarkerIcon | null) => void;
};

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
    setSelected(icon.name != selected?.name ? icon : null);
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
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center gap-2 align-center justify-around">
        {images?.map((icon, index) => (
          <MarkerItem
            key={index}
            icon={icon}
            selected={!!selected && selected.name == icon.name}
            onClick={onMarkerIconClickHandler}
          />
        ))}
      </div>
      <div className="flex align-center gap-2">
        {!onSelect ? (
          <>
            <Button
              className="w-full"
              disabled={isLoading || !selected}
              color="error"
              onClick={onImageDeleteHandler}
            >
              <Delete />{" "}
              <span className="max-[420px]:hidden">Видалити файл</span>
            </Button>
            <Button
              onClick={onImageUploadHandler}
              className="w-full"
              disabled={isLoading}
            >
              <Upload /> <span className="max-[420px]:hidden">Завантажити</span>
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
            <Button onClick={onSelectClickHandler} className="w-full">
              Вибрати
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default IconsModal;
