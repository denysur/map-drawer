import html2canvas from "html2canvas";

import IconButton from "../../../Common/IconButton";
import MarkerSettings from "../MarkerSettings";
import DrawingSettings from "../DrawingSettings";
import { Camera, MapMarker, Draw, Arrow } from "../../../Icons";

import { useActiveTool } from "../../../../hooks/state/useActiveTool";
import { useMarkers } from "../../../../hooks/state/useMarkers";
import { useDrawings } from "../../../../hooks/state/useDrawings";

import { MarkerIcon } from "../../../../types";
import { useArrows } from "../../../../hooks/state/useArrows";
import ArrowSettings from "../ArrowSettings";

const Tools = () => {
  const [activeTool, setActiveTool] = useActiveTool();
  const [
    { selectedMarker, isAddNewMarkerMode },
    {
      unselectMarker,
      updateMarkerSize,
      updateMarkerColor,
      updateMarkerIcon,
      updateMarkerRotation,
      removeMarker,
    },
  ] = useMarkers();
  const [
    { selectedDraw, isAddNewDrawingMode },
    { removeDraw, updateDrawWeigh, updateDrawColor, unselectDrawing },
  ] = useDrawings();
  const [
    { selectedArrow, isAddNewArrowMode },
    { removeArrow, updateArrowSize, updateArrowColor, unselectArrowing },
  ] = useArrows();

  const onMarkerToolOpenHandler = () => setActiveTool("marker");
  const onMarkerToolCloseHandler = () => unselectMarker();
  const onFreehandDrawToolOpenHandler = () => setActiveTool("freehand-draw");
  const onFreehandDrawToolCloseHandler = () => unselectDrawing();
  const onFreehandArrowToolOpenHandler = () => setActiveTool("arrow");
  const onFreehandArrowToolCloseHandler = () => unselectArrowing();

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

  const onMarkerRotationChange = (data: { id: string; rotation: number }) => {
    updateMarkerRotation(data);
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
  const onDrawWeightChange = (data: { id: string; weight: number }) => {
    updateDrawWeigh(data);
  };

  const onDrawColorChange = (data: { id: string; color: string }) => {
    updateDrawColor(data);
  };

  const onArrowDelete = (id: string) => {
    removeArrow(id);
  };
  const onArrowSizeChange = (data: { id: string; scale: number }) => {
    updateArrowSize(data);
  };

  const onArrowColorChange = (data: { id: string; color: string }) => {
    updateArrowColor(data);
  };

  if (activeTool === "marker") {
    return (
      <MarkerSettings
        isAddNewMarkerMode={isAddNewMarkerMode}
        selectedMarker={selectedMarker}
        onClose={onMarkerToolCloseHandler}
        onMarkerSizeChange={onMarkerSizeChange}
        onMarkerRotationChange={onMarkerRotationChange}
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
        onDrawWeightChange={onDrawWeightChange}
        onDrawColorChange={onDrawColorChange}
      />
    );
  }
  if (activeTool === "arrow") {
    return (
      <ArrowSettings
        isAddNewArrowMode={isAddNewArrowMode}
        selectedArrow={selectedArrow}
        onClose={onFreehandArrowToolCloseHandler}
        onArrowDelete={onArrowDelete}
        onArrowSizeChange={onArrowSizeChange}
        onArrowColorChange={onArrowColorChange}
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
        iconComponent={Arrow}
        onClick={onFreehandArrowToolOpenHandler}
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
