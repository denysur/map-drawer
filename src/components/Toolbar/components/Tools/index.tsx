import IconButton from "../../../Common/IconButton";
import MarkerSettings from "../../components/MarkerSettings";

import { useActiveTool } from "../../../../hooks/state/useActiveTool";

import { MapMarker } from "../../../Icons";
import { useCallback } from "react";
import { useMarkers } from "../../../../hooks/state/useMarkers";

const Tools = () => {
  const [activeTool, setActiveTool] = useActiveTool();
  const [{ selectedMarker, isAddNewMarkerMode }] = useMarkers();

  const onCloseToolHandler = useCallback(() => {
    setActiveTool(null);
  }, []);

  if (activeTool === "marker") {
    return (
      <MarkerSettings
        isAddNewMarkerMode={isAddNewMarkerMode}
        selectedMarker={selectedMarker}
        onClose={onCloseToolHandler}
      />
    );
  }

  return (
    <IconButton
      color="primaryLight"
      iconComponent={MapMarker}
      onClick={() => {
        setActiveTool("marker");
      }}
    />
  );
};

export default Tools;
