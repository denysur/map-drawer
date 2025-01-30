import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo } from "react";

import { RootState } from "../../app/store";

import {
  addMarker,
  removeMarker,
  setMarkerProps,
} from "../../app/slices/markerSlice";
import { addDraw, removeDraw, setDrawProps } from "../../app/slices/drawSlice";
import {
  addArrow,
  removeArrow,
  setArrowProps,
} from "../../app/slices/arrowSlice";
import {
  addCommit,
  clearHistoryState,
  setTimestamp,
} from "../../app/slices/historySlice";

import { Arrow, Draw, HistoryCommit, Marker } from "../../types";

export const useHistory = () => {
  const dispatch = useDispatch();

  const history = useSelector((state: RootState) => state.history.history);
  const timestamp = useSelector((state: RootState) => state.history.timestamp);

  const canUndo = useMemo(() => {
    return history.some((c) => c.timestamp <= (timestamp || 0));
  }, [history, timestamp]);
  const canRedo = useMemo(() => {
    return history.some((c) => c.timestamp > (timestamp || 0));
  }, [history, timestamp]);

  const addHistoryCommit = useCallback(
    (commit: Omit<HistoryCommit, "timestamp">) => {
      const newCommit = { ...commit, timestamp: new Date().getTime() };
      dispatch(addCommit(newCommit));
    },
    [dispatch]
  );

  const setHistoryTimestamp = useCallback(
    (newTimestamp: number) => {
      dispatch(setTimestamp(newTimestamp));
    },
    [dispatch]
  );

  const handleDrawStateChange = useCallback(
    (commit: HistoryCommit, action: "undo" | "redo") => {
      const oldState = commit.oldState as Partial<Draw> & {
        id: string;
      };
      const newState = commit.newState as Partial<Draw> & {
        id: string;
      };

      if (commit.type === "add") {
        if (action === "undo") {
          if (newState?.id) dispatch(removeDraw(newState.id));
        } else {
          if (newState?.id && newState.geometry)
            dispatch(
              addDraw({
                ...newState,
                color: newState.color ?? null,
                weight: newState.weight ?? 1,
                geometry: newState.geometry,
              })
            );
        }
      } else if (commit.type === "remove") {
        if (action === "undo") {
          if (oldState?.id && oldState.geometry)
            dispatch(
              addDraw({
                ...oldState,
                color: oldState.color ?? null,
                weight: oldState.weight ?? 1,
                geometry: oldState.geometry,
              })
            );
        } else {
          if (oldState?.id) dispatch(removeDraw(oldState.id));
        }
      } else if (commit.type === "edit") {
        if (action === "undo") {
          if (oldState) dispatch(setDrawProps(oldState));
        } else {
          if (newState) dispatch(setDrawProps(newState));
        }
      }
    },
    [dispatch, addDraw, removeDraw, setDrawProps]
  );

  const handleMarkerStateChange = useCallback(
    (commit: HistoryCommit, action: "undo" | "redo") => {
      const oldState = commit.oldState as Partial<Marker> & {
        id: string;
      };
      const newState = commit.newState as Partial<Marker> & {
        id: string;
      };

      if (commit.type === "add") {
        if (action === "undo") {
          if (newState?.id) dispatch(removeMarker(newState.id));
        } else {
          if (newState?.id && newState)
            dispatch(
              addMarker({
                ...newState,
                color: newState.color ?? null,
                scale: newState.scale ?? 1,
                rotation: newState.rotation ?? 0,
                longitude: newState.longitude ?? 0,
                latitude: newState.latitude ?? 0,
                icon: newState.icon ?? null,
              })
            );
        }
      } else if (commit.type === "remove") {
        if (action === "undo") {
          if (oldState?.id && oldState)
            dispatch(
              addMarker({
                ...oldState,
                color: oldState.color ?? null,
                scale: oldState.scale ?? 1,
                rotation: oldState.rotation ?? 0,
                longitude: oldState.longitude ?? 0,
                latitude: oldState.latitude ?? 0,
                icon: oldState.icon ?? null,
              })
            );
        } else {
          if (oldState?.id) dispatch(removeMarker(oldState.id));
        }
      } else if (commit.type === "edit") {
        if (action === "undo") {
          if (oldState) dispatch(setMarkerProps(oldState));
        } else {
          if (newState) dispatch(setMarkerProps(newState));
        }
      }
    },
    [dispatch, addMarker, removeMarker, setMarkerProps]
  );

  const handleArrowStateChange = useCallback(
    (commit: HistoryCommit, action: "undo" | "redo") => {
      const oldState = commit.oldState as Partial<Arrow> & {
        id: string;
      };
      const newState = commit.newState as Partial<Arrow> & {
        id: string;
      };

      if (commit.type === "add") {
        if (action === "undo") {
          if (newState?.id) dispatch(removeArrow(newState.id));
        } else {
          if (newState?.id && newState)
            dispatch(
              addArrow({
                ...newState,
                color: newState.color ?? null,
                scale: newState.scale ?? 1,
                weight: newState.weight ?? 1,
                scaleFactor: newState.scaleFactor!,
                vertices: newState.vertices!,
              })
            );
        }
      } else if (commit.type === "remove") {
        if (action === "undo") {
          if (oldState?.id && oldState)
            dispatch(
              addArrow({
                ...oldState,
                color: oldState.color ?? null,
                scale: oldState.scale ?? 1,
                weight: oldState.weight ?? 1,
                scaleFactor: oldState.scaleFactor!,
                vertices: oldState.vertices!,
              })
            );
        } else {
          if (oldState?.id) dispatch(removeArrow(oldState.id));
        }
      } else if (commit.type === "edit") {
        if (action === "undo") {
          if (oldState) dispatch(setArrowProps(oldState));
        } else {
          if (newState) dispatch(setArrowProps(newState));
        }
      }
    },
    [dispatch, addMarker, removeMarker, setMarkerProps]
  );

  const undo = useCallback(() => {
    const lastCommit = history
      .filter((c) => (timestamp || 0) >= c.timestamp)
      .sort((a, b) => b.timestamp - a.timestamp)[0];

    if (lastCommit) {
      if (lastCommit.tool === "freehand-draw") {
        handleDrawStateChange(lastCommit, "undo");
      } else if (lastCommit.tool === "marker") {
        handleMarkerStateChange(lastCommit, "undo");
      } else if (lastCommit.tool === "arrow") {
        handleArrowStateChange(lastCommit, "undo");
      } else {
        console.warn("Unknown tool", lastCommit.tool);
      }
    }
    dispatch({ type: "historySlice/undo" });
  }, [
    dispatch,
    history,
    timestamp,
    handleDrawStateChange,
    handleMarkerStateChange,
    handleArrowStateChange,
  ]);

  const redo = useCallback(() => {
    const nextCommit = history.find((c) => c.timestamp > (timestamp || 0));
    if (nextCommit) {
      if (nextCommit.tool === "freehand-draw") {
        handleDrawStateChange(nextCommit, "redo");
      } else if (nextCommit.tool === "marker") {
        handleMarkerStateChange(nextCommit, "redo");
      } else if (nextCommit.tool === "arrow") {
        handleArrowStateChange(nextCommit, "redo");
      } else {
        console.warn("Unknown tool", nextCommit.tool);
      }
    }
    dispatch({ type: "historySlice/redo" });
  }, [
    dispatch,
    history,
    timestamp,
    handleDrawStateChange,
    handleMarkerStateChange,
    handleArrowStateChange,
  ]);

  const flushHistoryState = useCallback(() => {
    dispatch(clearHistoryState());
  }, []);

  return useMemo(
    () => ({
      canUndo,
      canRedo,
      history,
      timestamp,
      addHistoryCommit,
      setHistoryTimestamp,
      undo,
      redo,
      flushHistoryState,
    }),
    [history, timestamp, addHistoryCommit, setHistoryTimestamp, undo, redo]
  );
};
