import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo } from "react";
import { addCommit, setTimestamp } from "../../app/slices/historySlice";
import { RootState } from "../../app/store";
import { Draw, HistoryCommit, Marker } from "../../types";
import { addDraw, removeDraw } from "../../app/slices/drawSlice";
import {
  addMarker,
  removeMarker,
  setMarkerProps,
} from "../../app/slices/markerSlice";

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

  useEffect(() => {
    console.table(history);
  }, [history]);

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

  const undo = useCallback(() => {
    const lastCommit = history
      .filter((c) => (timestamp || 0) >= c.timestamp)
      .sort((a, b) => b.timestamp - a.timestamp)[0];

    if (lastCommit) {
      if (lastCommit.tool === "freehand-draw") {
        const oldState = lastCommit.oldState as Partial<Draw> & {
          id: string;
        };
        const newState = lastCommit.newState as Partial<Draw> & {
          id: string;
        };
        if (lastCommit.type === "add") {
          if (newState?.id) dispatch(removeDraw(newState.id));
        } else if (lastCommit.type === "remove") {
          if (oldState?.id && oldState.geometry)
            dispatch(
              addDraw({
                ...oldState,
                color: oldState.color ?? null,
                scale: oldState.scale ?? 1,
                geometry: oldState.geometry,
              })
            );
        }
      } else if (lastCommit.tool === "marker") {
        const oldState = lastCommit.oldState as Partial<Marker> & {
          id: string;
        };
        const newState = lastCommit.newState as Partial<Marker> & {
          id: string;
        };
        if (lastCommit.type === "add") {
          if (newState?.id) dispatch(removeMarker(newState.id));
        } else if (lastCommit.type === "remove") {
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
        } else if (lastCommit.type === "edit") {
          if (oldState) dispatch(setMarkerProps(oldState));
        }
      } else {
        console.warn("Unknown tool", lastCommit.tool);
      }
    }
    dispatch({ type: "historySlice/undo" });
  }, [dispatch, history, timestamp]);

  const redo = useCallback(() => {
    const nextCommit = history.find((c) => c.timestamp > (timestamp || 0));
    if (nextCommit) {
      if (nextCommit.tool === "freehand-draw") {
        const oldState = nextCommit.oldState as Partial<Draw> & {
          id: string;
        };
        const newState = nextCommit.newState as Partial<Draw> & {
          id: string;
        };
        if (nextCommit.type === "remove") {
          if (oldState?.id) dispatch(removeDraw(oldState.id));
        } else if (nextCommit.type === "add") {
          if (newState?.id && newState.geometry)
            dispatch(
              addDraw({
                ...newState,
                color: newState.color ?? null,
                scale: newState.scale ?? 1,
                geometry: newState.geometry,
              })
            );
        }
      } else if (nextCommit.tool === "marker") {
        const oldState = nextCommit.oldState as Partial<Marker> & {
          id: string;
        };
        const newState = nextCommit.newState as Partial<Marker> & {
          id: string;
        };
        if (nextCommit.type === "remove") {
          if (oldState?.id) dispatch(removeMarker(oldState.id));
        } else if (nextCommit.type === "add") {
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
        } else if (nextCommit.type === "edit") {
          if (newState) dispatch(setMarkerProps(newState));
        }
      } else {
        console.warn("Unknown tool", nextCommit.tool);
      }
    }
    dispatch({ type: "historySlice/redo" });
  }, [dispatch, history, timestamp]);

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
    }),
    [history, timestamp, addHistoryCommit, setHistoryTimestamp, undo, redo]
  );
};
