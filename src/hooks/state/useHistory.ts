import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo } from "react";
import { addCommit, setTimestamp } from "../../app/slices/historySlice";
import { RootState } from "../../app/store";
import { HistoryCommit } from "../../types";
import { addDraw, removeDraw } from "../../app/slices/drawSlice";
import { addMarker, removeMarker } from "../../app/slices/markerSlice";

export const useHistory = () => {
  const dispatch = useDispatch();

  const history = useSelector((state: RootState) => state.history.history);
  const timestamp = useSelector((state: RootState) => state.history.timestamp);

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
      switch (lastCommit.tool) {
        case "freehand-draw":
          if (lastCommit.type === "add") {
            if (lastCommit.drawing?.id)
              dispatch(removeDraw(lastCommit.drawing.id));
          }
          if (lastCommit.type === "remove") {
            if (lastCommit.drawing?.id && lastCommit.drawing.geometry)
              dispatch(
                addDraw({
                  ...lastCommit.drawing,
                  color: lastCommit.drawing.color ?? null,
                  scale: lastCommit.drawing.scale ?? 1,
                  geometry: lastCommit.drawing.geometry,
                })
              );
          }
          break;
        case "marker":
          if (lastCommit.type === "add") {
            if (lastCommit.marker?.id)
              dispatch(removeMarker(lastCommit.marker.id));
          }
          if (lastCommit.type === "remove") {
            if (lastCommit.marker?.id && lastCommit.marker)
              dispatch(
                addMarker({
                  ...lastCommit.marker,
                  color: lastCommit.marker.color ?? null,
                  scale: lastCommit.marker.scale ?? 1,
                  rotation: lastCommit.marker.rotation ?? 0,
                  longitude: lastCommit.marker.longitude ?? 0,
                  latitude: lastCommit.marker.latitude ?? 0,
                  icon: lastCommit.marker.icon ?? null,
                })
              );
          }
          break;
        default:
          console.warn("Unknown tool", lastCommit.tool);
      }
    }
    dispatch({ type: "historySlice/undo" });
  }, [dispatch, history, timestamp]);

  const redo = useCallback(() => {
    const nextCommit = history.find((c) => c.timestamp > (timestamp || 0));
    if (nextCommit) {
      switch (nextCommit.tool) {
        case "freehand-draw":
          if (nextCommit.type === "remove") {
            if (nextCommit.drawing?.id)
              dispatch(removeDraw(nextCommit.drawing.id));
          }
          if (nextCommit.type === "add") {
            if (nextCommit.drawing?.id && nextCommit.drawing.geometry)
              dispatch(
                addDraw({
                  ...nextCommit.drawing,
                  color: nextCommit.drawing.color ?? null,
                  scale: nextCommit.drawing.scale ?? 1,
                  geometry: nextCommit.drawing.geometry,
                })
              );
          }
          break;
        case "marker":
          if (nextCommit.type === "remove") {
            if (nextCommit.marker?.id)
              dispatch(removeMarker(nextCommit.marker.id));
          }
          if (nextCommit.type === "add") {
            if (nextCommit.marker?.id && nextCommit.marker)
              dispatch(
                addMarker({
                  ...nextCommit.marker,
                  color: nextCommit.marker.color ?? null,
                  scale: nextCommit.marker.scale ?? 1,
                  rotation: nextCommit.marker.rotation ?? 0,
                  longitude: nextCommit.marker.longitude ?? 0,
                  latitude: nextCommit.marker.latitude ?? 0,
                  icon: nextCommit.marker.icon ?? null,
                })
              );
          }
          break;
        default:
          console.warn("Unknown tool", nextCommit.tool);
      }
    }
    dispatch({ type: "historySlice/redo" });
  }, [dispatch, history, timestamp]);

  return useMemo(
    () => ({
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
