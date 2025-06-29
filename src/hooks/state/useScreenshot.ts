import html2canvas from "html2canvas-pro";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setIsScreenshoting } from "../../app/slices/screenshotSlice";

export const useScreenshot = () => {
  const isScreenshoting = useSelector(
    (state: RootState) => state.screenshot.isScreenshoting
  );
  const dispatch = useDispatch();

  const makeScreenshot = async () => {
    try {
      // Ждем, чтобы логотип успел скрыться (если нужно)
      await Promise.resolve();

      const domRef = document.querySelector(
        ".mapboxgl-wrapper"
      ) as HTMLElement | null;

      if (!domRef) {
        console.warn("DOM element .mapboxgl-wrapper not found.");
        return;
      }

      const canvas = await html2canvas(domRef, {
        allowTaint: false,
        useCORS: true,
        logging: false,
        backgroundColor: null, // делает фон прозрачным, если нужно
      });

      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      const dateNow = new Date().toISOString().replace(/[:.]/g, "-");
      link.download = `MapState_${dateNow}.png`;
      link.click();
    } catch (error) {
      console.error("Failed to capture screenshot:", error);
    } finally {
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
