import { useDebounce } from "@uidotdev/usehooks";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useHistory } from "./state/useHistory";

import { Arrow, Draw, Marker, ToolNames } from "../types";

type State = Arrow | Draw | Marker;

type UseHistorySubscriptionProps = {
  id?: string;
  tool: ToolNames;
  state?: State;
};

export const useOnChangeHistorySubscription = ({
  id,
  tool,
  state,
}: UseHistorySubscriptionProps) => {
  const { history, addHistoryCommit } = useHistory();

  const isExistInHistory = useMemo(
    () => history.some(({ id: historyItemId }) => historyItemId === id),
    [] // check once
  );

  const [oldState, setOldState] = useState<State>();
  const [isNewItem, setIsNewItem] = useState(!isExistInHistory);

  const debouncedState = useDebounce(state, 500);

  useEffect(() => {
    if (id && debouncedState) {
      if (isNewItem) {
        addHistoryCommit({
          type: "add",
          tool,
          id,
          newState: debouncedState,
        });

        setIsNewItem(false);
      } else if (
        JSON.stringify(debouncedState) !== JSON.stringify(oldState) &&
        oldState
      ) {
        addHistoryCommit({
          type: "edit",
          tool,
          id,
          oldState,
          newState: debouncedState,
        });
      }

      setOldState(debouncedState);
    }
  }, [debouncedState, id, tool]);

  const pushRemove = useCallback(() => {
    if (id) {
      addHistoryCommit({
        type: "remove",
        tool,
        id,
        oldState,
      });
    }
  }, [oldState, id, tool]);

  return useMemo(() => ({ pushRemove }), [pushRemove]);
};
