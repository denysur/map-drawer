import html2canvas from "html2canvas";

import { Camera, MapMarker } from "../../../Icons";
import IconButton from "../../../Common/IconButton";
import MarkerSettings from "../MarkerSettings";
import DrawingSettings from "../DrawingSettings";
import { MapMarker, Draw } from "../../../Icons";

import { useActiveTool } from "../../../../hooks/state/useActiveTool";
import { useMarkers } from "../../../../hooks/state/useMarkers";
import { useDrawings } from "../../../../hooks/state/useDrawings";

import { MarkerIcon } from "../../../../types";

const Tools = () => {
  const [activeTool, setActiveTool] = useActiveTool();
  const [
    { selectedMarker, isAddNewMarkerMode },
    {
      unselectMarker,
      updateMarkerSize,
      updateMarkerColor,
      updateMarkerIcon,
      removeMarker,
    },
  ] = useMarkers();
  const [
    { selectedDraw, isAddNewDrawingMode },
    { removeDraw, updateDrawSize, updateDrawColor, unselectDrawing },
  ] = useDrawings();

  const onMarkerToolOpenHandler = () => setActiveTool("marker");
  const onMarkerToolCloseHandler = () => unselectMarker();
  const onFreehandDrawToolOpenHandler = () => setActiveTool("freehand-draw");
  const onFreehandDrawToolCloseHandler = () => unselectDrawing();

  const onScreenshotToolOpenHandler = async () => {
    const domRef = document.querySelector(".mapboxgl-wrapper") as HTMLElement;
    if (domRef) {
      const canvas = await html2canvas(domRef, {
        allowTaint: false,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "screenshot.png";
      link.click();
    }
  };

  const onMarkerSizeChange = (data: { id: string; scale: number }) => {
    updateMarkerSize(data);
  };

  const onMarkerColorChange = (data: { id: string; color: string }) => {
    updateMarkerColor(data);
  };

  const onMarkerIconChange = (data: {
    id: string;
    icon: MarkerIcon | null;
  }) => {
    updateMarkerIcon(data);
  };

  const onMarkerDelete = (id: string) => {
    removeMarker(id);
  };

  const onDrawDelete = (id: string) => {
    removeDraw(id);
  };
  const onDrawSizeChange = (data: { id: string; scale: number }) => {
    updateDrawSize(data);
  };

  const onDrawColorChange = (data: { id: string; color: string }) => {
    updateDrawColor(data);
  };

  if (activeTool === "marker") {
    return (
      <MarkerSettings
        isAddNewMarkerMode={isAddNewMarkerMode}
        selectedMarker={selectedMarker}
        onClose={onMarkerToolCloseHandler}
        onMarkerSizeChange={onMarkerSizeChange}
        onMarkerColorChange={onMarkerColorChange}
        onMarkerDelete={onMarkerDelete}
        onMarkerIconChange={onMarkerIconChange}
      />
    );
  }

  if (activeTool === "freehand-draw") {
    return (
      <DrawingSettings
        isAddNewDrawingMode={isAddNewDrawingMode}
        selectedDraw={selectedDraw}
        onClose={onFreehandDrawToolCloseHandler}
        onDrawDelete={onDrawDelete}
        onDrawSizeChange={onDrawSizeChange}
        onDrawColorChange={onDrawColorChange}
      />
    );
  }

  return (
    <>
      <IconButton
        color="primaryLight"
        iconComponent={MapMarker}
        onClick={onMarkerToolOpenHandler}
      />
      <IconButton
        color="primaryLight"
        iconComponent={Draw}
        onClick={onFreehandDrawToolOpenHandler}
      />
      <IconButton
        color="primaryLight"
        iconComponent={Camera}
        onClick={onScreenshotToolOpenHandler}
      />
    </>
  );
};

export default Tools;
