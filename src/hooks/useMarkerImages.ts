import { useMemo, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";

import { storage } from "../utils/firebase";

import { FIREBASE_MARKER_IMAGES_PATH } from "../constants";
import { MarkerIcon } from "../types";

export const useMarkerImages = () => {
  const [images, setImages] = useState<MarkerIcon[]>([]);

  const fetchAll = async () => {
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
      console.error("Error fetching directory images:", error);
    }
  };

  const deleteImage = async (name: string) => {
    try {
      const imageRef = ref(storage, `${FIREBASE_MARKER_IMAGES_PATH}/${name}`);
      await deleteObject(imageRef);
      setImages(
        (prevImages) =>
          prevImages?.filter((image) => image.name !== name) || null
      );
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
  const uploadImage = async (file: File) => {
    try {
      const imageRef = ref(
        storage,
        `${FIREBASE_MARKER_IMAGES_PATH}/${file.name}`
      );
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setImages((prevImages = []) => {
        const imageIndex = prevImages.findIndex(
          (image) => image.name === file.name
        );

        if (imageIndex !== -1) {
          // Update existing image
          const updatedImages = [...prevImages];
          updatedImages[imageIndex] = { name: file.name, url };
          return updatedImages;
        }

        // Add new image
        return [...prevImages, { name: file.name, url }];
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return useMemo(
    () => ({ images, fetchAll, deleteImage, uploadImage }),
    [uploadImage, deleteImage, fetchAll, images]
  );
};
