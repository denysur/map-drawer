import React, { useEffect, useState } from "react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const SafeImage: React.FC<SafeImageProps> = ({ src, ...props }) => {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const convertImageToBlob = async (): Promise<void> => {
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        const blob: Blob = await response.blob();
        setImageBlob(blob);
      } catch (error) {
        console.error("Error fetching the image:", error);
      }
    };

    convertImageToBlob();
  }, []);

  if (!imageBlob) return null;

  return <img src={URL.createObjectURL(imageBlob)} {...props} />;
};

export default SafeImage;
