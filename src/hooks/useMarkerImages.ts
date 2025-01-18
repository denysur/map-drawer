import { useMemo, useState, useTransition } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";

import { storage } from "../utils/firebase";

import { FIREBASE_MARKER_IMAGES_PATH } from "../constants";
import { MarkerIcon } from "../types";

export const useMarkerImages = () => {
  const [isLoading, startTransition] = useTransition();
  const [images, setImages] = useState<MarkerIcon[] | null>(null);

  const fetchAll = () =>
    startTransition(async () => {
      try {
        const imagesRef = ref(storage, FIREBASE_MARKER_IMAGES_PATH);
        const result = await listAll(imagesRef);

        const urls = await Promise.all(
          result.items.map(async (item) => ({
            name: item.name,
            url: await getDownloadURL(item),
          }))
        );

        setImages(urls);
      } catch (error) {
        console.error("Ошибка при загрузке изображений:", error);
      }
    });

  return useMemo(
    () => ({ images, isLoading, fetchAll }),
    [fetchAll, images, isLoading]
  );
};
