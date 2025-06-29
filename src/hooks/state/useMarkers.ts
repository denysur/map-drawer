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
  setMarkerRotation,
  clearMarkersState,
  setIconOnCreating,
} from "../../app/slices/markerSlice";
import { generateId } from "../../utils/common";
import { useActiveTool } from "./useActiveTool";

import { DEFAULT_COLOR, DEFAULT_SCALE } from "../../constants";

import { RootState } from "../../app/store";
import { DefaultMarkerIcon, Marker, MarkerIcon } from "../../types";

export const useMarkers = () => {
  const [activeTool, setActiveTool] = useActiveTool();

  const selectedMarkerId = useSelector(
    (state: RootState) => state.marker.selectedMarkerId
  );
  const selectedMarker = useSelector((state: RootState) =>
    state.marker.markers.find(({ id }) => id === selectedMarkerId)
  );
  const markers = useSelector((state: RootState) => state.marker.markers);

  const iconOnCreating = useSelector(
    (state: RootState) => state.marker.iconOnCreating
  );

  const isAddNewMarkerMode = useMemo(
    () => activeTool === "marker" && !selectedMarker,
    [activeTool, selectedMarker]
  );

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
    (marker: Omit<Marker, "rotation" | "id" | "color" | "scale" | "icon">) => {
      const id = generateId();

      dispatch(
        addMarkerAction({
          ...marker,
          color: DEFAULT_COLOR,
          scale: DEFAULT_SCALE,
          rotation: 0,
          icon: iconOnCreating,
          id,
        })
      );

      setActiveTool("marker");

      return id;
    },
    [iconOnCreating]
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
  const updateMarkerRotation = useCallback(
    (data: { id: string; rotation: number }) => {
      dispatch(setMarkerRotation(data));
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
    (data: { id: string; icon: MarkerIcon | DefaultMarkerIcon | null }) => {
      dispatch(setMarkerIcon(data));
    },
    []
  );

  const flushMarkersState = useCallback(() => {
    dispatch(clearMarkersState());
  }, []);

  const updateIconOnCreating = useCallback((icon?: string) => {
    dispatch(setIconOnCreating(icon ? { type: "default", name: icon } : null));
  }, []);

  return useMemo(
    () =>
      [
        {
          selectedMarkerId,
          selectedMarker,
          markers,
          isAddNewMarkerMode,
          iconOnCreating,
        },
        {
          selectMarker,
          unselectMarker,
          removeMarker,
          addMarker,
          updateMarkerPosition,
          updateMarkerSize,
          updateMarkerRotation,
          updateMarkerColor,
          updateMarkerIcon,
          flushMarkersState,
          updateIconOnCreating,
        },
      ] as const,
    [
      selectedMarkerId,
      selectedMarker,
      markers,
      isAddNewMarkerMode,
      iconOnCreating,
      addMarker,
      updateIconOnCreating,
    ]
  );
};
