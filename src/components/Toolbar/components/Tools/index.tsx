import html2canvas from "html2canvas";

import IconButton from "../../../Common/IconButton";
import MarkerSettings from "../MarkerSettings";
import DrawingSettings from "../DrawingSettings";
import {
  Camera,
  MapMarker,
  Draw,
  Arrow,
  Undo,
  Redo,
  DeleteAll,
} from "../../../Icons";

import { useActiveTool } from "../../../../hooks/state/useActiveTool";
import { useMarkers } from "../../../../hooks/state/useMarkers";
import { useDrawings } from "../../../../hooks/state/useDrawings";
import { useHistory } from "../../../../hooks/state/useHistory";

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
      flushMarkersState,
    },
  ] = useMarkers();
  const [
    { selectedDraw, isAddNewDrawingMode },
    {
      removeDraw,
      updateDrawWeigh,
      updateDrawColor,
      unselectDrawing,
      flushDrawsState,
    },
  ] = useDrawings();
  const [
    { selectedArrow, isAddNewArrowMode },
    {
      removeArrow,
      updateArrowSize,
      updateArrowColor,
      unselectArrowing,
      updateArrowWight,
      flushArrowsState,
    },
  ] = useArrows();
  const { undo, redo, canUndo, canRedo, flushHistoryState } = useHistory();

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

  const onArrowWightChange = (data: { id: string; weight: number }) => {
    updateArrowWight(data);
  };

  const onArrowColorChange = (data: { id: string; color: string }) => {
    updateArrowColor(data);
  };

  const onUndoButtonClickHandler = () => {
    undo();
  };

  const onRedoButtonClickHandler = () => {
    redo();
  };

  const onClearState = () => {
    flushMarkersState();
    flushDrawsState();
    flushArrowsState();
    flushHistoryState();
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
        onArrowWightChange={onArrowWightChange}
        onArrowColorChange={onArrowColorChange}
      />
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 md:flex-nowrap">
      <div className="flex gap-2">
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
        <div className="border-l border-gray-300 h-[48px]" />
        <IconButton
          color="secondaryLight"
          iconComponent={Camera}
          onClick={onScreenshotToolOpenHandler}
        />
      </div>
      <div className="flex gap-2 justify-center border-t pt-2 border-gray-300 w-full md:pl-2 md:pt-0 md:border-t-0 md:border-l">
        <IconButton
          iconComponent={Undo}
          disabled={!canUndo}
          className="!text-orange-700 bg-orange-100 [&:not(:disabled)]:hover:bg-orange-200 dark:!text-orange-100 dark:bg-orange-800 [&:not(:disabled)]:dark:hover:bg-orange-700 dark:focus:ring-orange-400"
          onClick={onUndoButtonClickHandler}
        />
        <IconButton
          iconComponent={Redo}
          disabled={!canRedo}
          className="!text-orange-700 bg-orange-100 [&:not(:disabled)]:hover:bg-orange-200 dark:!text-orange-100 dark:bg-orange-800 [&:not(:disabled)]:dark:hover:bg-orange-700 dark:focus:ring-orange-400"
          onClick={onRedoButtonClickHandler}
        />
        <IconButton
          iconComponent={DeleteAll}
          color="errorLight"
          onClick={onClearState}
        />
      </div>
    </div>
  );
};

export default Tools;
