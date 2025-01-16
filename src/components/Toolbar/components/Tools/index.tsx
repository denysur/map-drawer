import IconButton from "../../../Common/IconButton";
import MarkerSettings from "../../components/MarkerSettings";

import { useActiveTool } from "../../../../hooks/state/useActiveTool";
import { useMarkers } from "../../../../hooks/state/useMarkers";

import { MapMarker } from "../../../Icons";

const Tools = () => {
  const [activeTool, setActiveTool] = useActiveTool();
  const [
    { selectedMarker, isAddNewMarkerMode },
    { unselectMarker, updateMarkerSize },
  ] = useMarkers();

  const onMarkerToolOpenHandler = () => setActiveTool("marker");
  const onMarkerToolCloseHandler = () => unselectMarker();

  const onMarkerSizeChangeHandler = (data: { id: string; scale: number }) => {
    updateMarkerSize(data);
  };

  if (activeTool === "marker") {
    return (
      <MarkerSettings
        isAddNewMarkerMode={isAddNewMarkerMode}
        selectedMarker={selectedMarker}
        onClose={onMarkerToolCloseHandler}
        onMarkerSizeChange={onMarkerSizeChangeHandler}
      />
    );
  }

  return (
    <IconButton
      color="primaryLight"
      iconComponent={MapMarker}
      onClick={onMarkerToolOpenHandler}
    />
  );
};

export default Tools;
