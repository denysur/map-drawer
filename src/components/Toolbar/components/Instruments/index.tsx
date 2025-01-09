import IconButton from "../../../Common/IconButton";
import MarkerSettings from "../../components/MarkerSettings";

import { useActiveTool } from "../../../../hooks/state/useActiveTool";

import { MapMarker } from "../../../Icons";
import { useCallback } from "react";

const Instruments = () => {
  const [activeTool, setActiveTool] = useActiveTool();

  const onCloseToolHandler = useCallback(() => {
    setActiveTool(null);
  }, []);

  if (activeTool === "marker") {
    return <MarkerSettings onClose={onCloseToolHandler} />;
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

export default Instruments;
