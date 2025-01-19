import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

import {
  setSelectedMarkerId,
  addMarker as addMarkerAction,
  removeMarker as removeMarkerAction,
  setMarkerPosition,
  setMarkerSize,
  setMarkerColor,
  setMarkerIcon,
} from "../../app/slices/markerSlice";
import { generateId } from "../../utils/common";
import { useActiveTool } from "./useActiveTool";

import { DEFAULT_MARKER_COLOR, DEFAULT_MARKER_SCALE } from "../../constants";

import { RootState } from "../../app/store";
import { Marker, MarkerIcon } from "../../types";

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

  const selectMarker = useCallback((id: Marker["id"]) => {
    dispatch(setSelectedMarkerId(id));

    setActiveTool("marker");
  }, []);

  const unselectMarker = useCallback(() => {
    dispatch(setSelectedMarkerId(null));

    setActiveTool(null);
  }, []);

  const removeMarker = useCallback((id: Marker["id"]) => {
    dispatch(removeMarkerAction(id));

    setActiveTool(null);
  }, []);

  const addMarker = useCallback(
    (marker: Omit<Marker, "id" | "color" | "scale" | "icon">) => {
      dispatch(
        addMarkerAction({
          ...marker,
          color: DEFAULT_MARKER_COLOR,
          scale: DEFAULT_MARKER_SCALE,
          icon: null,
          id: generateId(),
        })
      );

      setActiveTool("marker");
    },
    []
  );

  const updateMarkerPosition = useCallback(
    (data: { id: string; latitude: number; longitude: number }) => {
      dispatch(setMarkerPosition(data));
    },
    []
  );

  const updateMarkerSize = useCallback(
    (data: { id: string; scale: number }) => {
      dispatch(setMarkerSize(data));
    },
    []
  );

  const updateMarkerColor = useCallback(
    (data: { id: string; color: string }) => {
      dispatch(setMarkerColor(data));
    },
    []
  );
  const updateMarkerIcon = useCallback(
    (data: { id: string; icon: MarkerIcon | null }) => {
      dispatch(setMarkerIcon(data));
    },
    []
  );

  return useMemo(
    () =>
      [
        { selectedMarkerId, selectedMarker, markers, isAddNewMarkerMode },
        {
          selectMarker,
          unselectMarker,
          removeMarker,
          addMarker,
          updateMarkerPosition,
          updateMarkerSize,
          updateMarkerColor,
          updateMarkerIcon,
        },
      ] as const,
    [selectedMarkerId, selectedMarker, markers, isAddNewMarkerMode]
  );
};
