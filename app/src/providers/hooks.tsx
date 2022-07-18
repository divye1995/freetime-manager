import { useContext, useEffect, useMemo, useState } from "react";
import {
  DBChangeOption,
  DBError,
  DBResultOption,
  DocumentId,
} from "../services/database";
import { hierarchyPriorityList } from "../utils/constant";
import { MaxHeap } from "../utils/heap";
import {
  filterByLastSeenBefore,
  TaskSuggestion,
  TaskSuggestionComparator,
} from "../utils/TaskSuggestion";
import { TaskSuggestionDocument } from "../utils/types";
import { TaskContextType, TasksContext } from "./context";
const RETRY_TIME_MS = 60 * 0.5 * 1000; // time to retry a card if it has been picked 10 mins

export function useSuggestionsDB() {}

export function useSuggestionDocumentIterator(): [
  TaskSuggestionDocument | null,
  (suggestion: TaskSuggestionDocument) => void,
  (skipLastSeenSet?: boolean) => void,
  () => Promise<DBResultOption<TaskSuggestionDocument>>,
  (
    suggestion: TaskSuggestionDocument
  ) => Promise<DBResultOption<TaskSuggestionDocument>>
] {
  const { suggestionsDb } = useContext<TaskContextType>(TasksContext);
  const heapIndex = useMemo<{ [k: string]: boolean }>(() => ({}), []);
  const [currentSuggestionDoc, setCurrentSuggestionDoc] =
    useState<TaskSuggestionDocument | null>(null);
  const maxHeap = useMemo(
    () =>
      new MaxHeap<TaskSuggestionDocument>(
        [],
        (A: TaskSuggestionDocument, B: TaskSuggestionDocument) =>
          TaskSuggestionComparator(A, B, (type: string) =>
            ((index, length) => (index >= 0 ? length - index : 0))(
              hierarchyPriorityList.indexOf(type),
              hierarchyPriorityList.length
            )
          )
      ),
    []
  );

  // to listen to db changes
  useEffect(() => {
    var cancelDbListener = () => {};
    const onChange = (change: DBChangeOption<TaskSuggestionDocument>) => {
      if (change.kind === "Error") {
        return;
      }
      if (change.value.deleted) {
        // TODO: think about this later
      } else {
        // updated or added
        if (!heapIndex[change.value.id]) {
          // added
          // this doc is not in heap so we should push it
          // maxHeap.insert(change.value.doc);
          // setCurrentSuggestionDoc(change.value.doc);
        }
      }
    };

    cancelDbListener = suggestionsDb.watch(onChange);
    return cancelDbListener;
  }, [suggestionsDb, heapIndex, maxHeap]);

  useEffect(() => {
    // TODO : get all which were not Seen in the last 1 hour*
    suggestionsDb?.getAll().then((resp) => {
      if (resp.kind === "Error") {
        // TODO : somehow represent that an error has occured.
      } else {
        // var uniqueTask = new Set()

        maxHeap.heap = filterByLastSeenBefore(Date.now() - RETRY_TIME_MS)(
          resp.value
        );

        maxHeap.heap.forEach((v) => {
          heapIndex[v._id] = true;
        });

        maxHeap.heapify();
        setCurrentSuggestionDoc(maxHeap.next());
      }
    });
  }, [suggestionsDb, maxHeap, heapIndex]);

  const nextSuggestion = (skipLastSeenSet?: boolean) => {
    if (!skipLastSeenSet) setLastSeen();
    const suggestion = maxHeap.next();
    setCurrentSuggestionDoc(suggestion);
    if (suggestion) heapIndex[suggestion._id] = true;
  };

  const setLastSeen = async (): Promise<
    DBResultOption<TaskSuggestionDocument>
  > => {
    if (!currentSuggestionDoc)
      return { value: "Current Suggestion is Null", kind: "Error" } as DBError;
    currentSuggestionDoc.lastSeen = Date.now();
    return suggestionsDb.put(currentSuggestionDoc);
  };

  const deleteSuggestionDocument = async (
    suggestion: TaskSuggestionDocument
  ): Promise<DBResultOption<TaskSuggestionDocument>> => {
    return suggestionsDb.remove(suggestion);
  };

  return [
    currentSuggestionDoc,
    setCurrentSuggestionDoc,
    nextSuggestion,
    setLastSeen,
    deleteSuggestionDocument,
  ];
}

export function useSuggestionList(): [TaskSuggestionDocument[]] {
  const { suggestionsDb } = useContext<TaskContextType>(TasksContext);
  const [suggestions, setSuggestions] = useState<TaskSuggestionDocument[]>([]);
  useEffect(() => {
    // effect to load the list of all cards
    suggestionsDb?.getAll().then((res) => {
      if (res.kind === "Error") {
        // TODO : Some error handling
        return;
      }
      setSuggestions(res.value);
    });
  }, [suggestionsDb]);

  return [suggestions];
}
