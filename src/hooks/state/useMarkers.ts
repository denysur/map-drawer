import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

import {
  setSelectedMarkerId as setSelectedMarkerIdAction,
  addMarker as addMarkerAction,
  removeMarker as removeMarkerAction,
} from "../../app/slices/markerSlice";
import { generateId } from "../../utils/common";
import { RootState } from "../../app/store";

import { Marker } from "../../types";

export const useMarkers = () => {
  const selectedMarkerId = useSelector(
    (state: RootState) => state.marker.selectedMarkerId
  );
  const selectedMarker = useSelector((state: RootState) =>
    state.marker.markers.find(({ id }) => id === selectedMarkerId)
  );
  const markers = useSelector((state: RootState) => state.marker.markers);

  const dispatch = useDispatch();

  const setSelectedMarkerId = useCallback((id: Marker["id"]) => {
    dispatch(setSelectedMarkerIdAction(id));
  }, []);

  const removeMarker = useCallback((id: Marker["id"]) => {
    dispatch(removeMarkerAction(id));
  }, []);

  const addMarker = useCallback((marker: Omit<Marker, "id">) => {
    dispatch(
      addMarkerAction({
        ...marker,
        id: generateId(),
      })
    );
  }, []);

  return useMemo(
    () =>
      [
        { selectedMarker, markers },
        { setSelectedMarkerId, removeMarker, addMarker },
      ] as const,
    [selectedMarker, markers]
  );
};
