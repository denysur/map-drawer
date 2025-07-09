import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setIsScreenshoting } from "../../app/slices/screenshotSlice";
import { domToBlob } from "modern-screenshot";

export const useScreenshot = () => {
  const isScreenshoting = useSelector(
    (state: RootState) => state.screenshot.isScreenshoting
  );
  const dispatch = useDispatch();

  const makeScreenshot = async () => {
    let dataUrl: string | undefined;
    try {
      await Promise.resolve();

      const domRef = document.querySelector(
        ".mapboxgl-wrapper"
      ) as HTMLElement | null;

      if (!domRef) {
        console.warn("DOM element .mapboxgl-wrapper not found.");
        return;
      }

      const blob = await domToBlob(domRef, {
        scale: 3,
      });

      dataUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.rel = "noopener noreferrer";
      link.target = "_blank";
      link.style.display = "none";
      link.href = dataUrl;

      const dateNow = new Date().toISOString().replace(/[:.]/g, "-");
      link.download = `MapState_${dateNow}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to capture screenshot:", error);
    } finally {
      if (dataUrl) URL.revokeObjectURL(dataUrl);
      dispatch(setIsScreenshoting(false));
    }
  };

  const screenshot = () => {
    if (isScreenshoting) return;
    dispatch(setIsScreenshoting(true));
    makeScreenshot();
  };

  return { isScreenshoting, screenshot };
};
