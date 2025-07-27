import IconButton from "../../../Common/IconButton";
import MarkerSettings from "../MarkerSettings";
import DrawingSettings from "../DrawingSettings";
import ArrowSettings from "../ArrowSettings";
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
import { useArrows } from "../../../../hooks/state/useArrows";
import { useHistory } from "../../../../hooks/state/useHistory";
import { useScreenshot } from "../../../../hooks/state/useScreenshot";

import { DefaultMarkerIcon, MarkerIcon } from "../../../../types";

const Tools = () => {
  const [activeTool, setActiveTool] = useActiveTool();
  const { screenshot } = useScreenshot();
  const [
    { selectedMarker, isAddNewMarkerMode, iconOnCreating },
    {
      unselectMarker,
      updateMarkerSize,
      updateMarkerColor,
      updateMarkerIcon,
      updateMarkerRotation,
      removeMarker,
      flushMarkersState,
      updateIconOnCreating,
    },
  ] = useMarkers();
  const [
    { selectedDraw, isAddNewDrawingMode },
    {
      removeDraw,
      updateDrawWeight,
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
      updateArrowWeight,
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
    screenshot();
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
    icon: MarkerIcon | DefaultMarkerIcon | null;
  }) => {
    updateMarkerIcon(data);
  };

  const onMarkerDelete = (id: string) => {
    removeMarker(id);
  };
  const onIconCreatingChange = (icon?: string) => {
    updateIconOnCreating(icon);
  };

  const onDrawDelete = (id: string) => {
    removeDraw(id);
  };
  const onDrawWeightChange = (data: { id: string; weight: number }) => {
    updateDrawWeight(data);
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

  const onArrowWeightChange = (data: { id: string; weight: number }) => {
    updateArrowWeight(data);
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
        iconOnCreating={iconOnCreating?.name}
        onIconCreatingChange={onIconCreatingChange}
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
        onArrowWeightChange={onArrowWeightChange}
        onArrowColorChange={onArrowColorChange}
      />
    );
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 gap-y-3 md:flex-nowrap">
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
      </div>
      <div className="flex gap-2 justify-center items-center w-full md:pt-0">
        <div className="w-0.5 bg-gray-200 dark:bg-zinc-700 h-[36px] rounded hidden md:block ease duration-200" />
        <IconButton
          color="secondaryLight"
          iconComponent={Camera}
          onClick={onScreenshotToolOpenHandler}
        />
        <div className="w-0.5 bg-gray-200 dark:bg-zinc-700 h-[36px] rounded ease duration-200" />
        <IconButton
          iconComponent={Undo}
          disabled={!canUndo}
          className="!text-orange-700 bg-orange-100 [&:not(:disabled)]:hover:bg-orange-200 dark:!text-orange-100 dark:bg-orange-900 [&:not(:disabled)]:dark:hover:!bg-orange-800 dark:focus:ring-orange-400"
          onClick={onUndoButtonClickHandler}
        />
        <IconButton
          iconComponent={Redo}
          disabled={!canRedo}
          className="!text-orange-700 bg-orange-100 [&:not(:disabled)]:hover:bg-orange-200 dark:!text-orange-100 dark:bg-orange-900 [&:not(:disabled)]:dark:hover:!bg-orange-800 dark:focus:ring-orange-400"
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
