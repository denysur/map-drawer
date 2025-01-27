import html2canvas from "html2canvas";

import IconButton from "../../../Common/IconButton";
import MarkerSettings from "../MarkerSettings";
import DrawingSettings from "../DrawingSettings";
import { Camera, MapMarker, Draw } from "../../../Icons";

import { useActiveTool } from "../../../../hooks/state/useActiveTool";
import { useMarkers } from "../../../../hooks/state/useMarkers";
import { useDrawings } from "../../../../hooks/state/useDrawings";

import { MarkerIcon } from "../../../../types";
import Undo from "../../../Icons/Undo";
import Redo from "../../../Icons/Redo";
import { useHistory } from "../../../../hooks/state/useHistory";

const Tools = () => {
  const [activeTool, setActiveTool] = useActiveTool();
  const [{ markers }] = useMarkers();
  const [{ drawings }] = useDrawings();
  const { addHistoryCommit } = useHistory();
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
    { removeDraw, updateDrawSize, updateDrawColor, unselectDrawing },
  ] = useDrawings();
  const { undo, redo, canUndo, canRedo } = useHistory();

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

  const onUndoButtonClickHandler = () => {
    undo();
  };

  const onRedoButtonClickHandler = () => {
    redo();
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
      <div className="w-0.5 h-10 bg-gray-200 dark:bg-zinc-800 rounded"></div>

      <IconButton
        iconComponent={Undo}
        disabled={!canUndo}
        onClick={onUndoButtonClickHandler}
      />
      <IconButton
        iconComponent={Redo}
        disabled={!canRedo}
        onClick={onRedoButtonClickHandler}
      />
    </>
  );
};

export default Tools;
