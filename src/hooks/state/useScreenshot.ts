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
    await Promise.resolve(); // waits logo opacity to change
    const domRef = document.querySelector(".mapboxgl-wrapper") as HTMLElement;
    if (domRef) {
      const canvas = await html2canvas(domRef, {
        allowTaint: false,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      const dateNow = new Date().toISOString().split("T")[0];
      link.download = `MapState_${dateNow}.png`;
      link.click();
      dispatch(setIsScreenshoting(false));
    }
  };
  const screenshot = () => {
    dispatch(setIsScreenshoting(true));
    makeScreenshot().finally(() => {
      dispatch(setIsScreenshoting(false));
    });
  };

  return { isScreenshoting, screenshot };
};
