import { useCallback } from "react";

import IconButton from "../../../Common/IconButton";
import MarkerSettings from "../../components/MarkerSettings";

import { useActiveTool } from "../../../../hooks/state/useActiveTool";
import { useMarkers } from "../../../../hooks/state/useMarkers";

import { MapMarker } from "../../../Icons";

const Tools = () => {
  const [activeTool, setActiveTool] = useActiveTool();
  const [{ selectedMarker, isAddNewMarkerMode }, { unselectMarker }] =
    useMarkers();

  const onCloseToolHandler = useCallback(() => {
    setActiveTool(null);
    unselectMarker();
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
