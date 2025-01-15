import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

import {
  setSelectedMarkerId as setSelectedMarkerIdAction,
  addMarker as addMarkerAction,
  removeMarker as removeMarkerAction,
} from "../../app/slices/markerSlice";
import { generateId } from "../../utils/common";
import { useActiveTool } from "./useActiveTool";

import { RootState } from "../../app/store";
import { Marker } from "../../types";

export const useMarkers = () => {
  const [activeTool, setActiveTool] = useActiveTool();

  const selectedMarkerId = useSelector(
    (state: RootState) => state.marker.selectedMarkerId
  );
  const selectedMarker = useSelector((state: RootState) =>
    state.marker.markers.find(({ id }) => id === selectedMarkerId)
  );
  const markers = useSelector((state: RootState) => state.marker.markers);
  const isAddNewMarkerMode = activeTool === "marker" && !selectedMarker;

  const dispatch = useDispatch();

  const setSelectedMarkerId = useCallback((id: Marker["id"]) => {
    dispatch(setSelectedMarkerIdAction(id));

    setActiveTool("marker");
  }, []);

  const unselectMarker = useCallback(() => {
    dispatch(setSelectedMarkerIdAction(null));

    setActiveTool(null);
  }, []);

  const removeMarker = useCallback((id: Marker["id"]) => {
    dispatch(removeMarkerAction(id));
  }, []);

  const addMarker = useCallback(
    (marker: Omit<Marker, "id" | "color" | "scale" | "icon">) => {
      dispatch(
        addMarkerAction({
          ...marker,
          color: null,
          icon: null,
          scale: 1,
          id: generateId(),
        })
      );
    },
    []
  );

  return useMemo(
    () =>
      [
        { selectedMarkerId, selectedMarker, markers, isAddNewMarkerMode },
        { setSelectedMarkerId, unselectMarker, removeMarker, addMarker },
      ] as const,
    [selectedMarkerId, selectedMarker, markers, isAddNewMarkerMode]
  );
};
