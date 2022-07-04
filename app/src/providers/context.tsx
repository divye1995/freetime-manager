// create a context to provide custom hooks for Pouch DB

import { findIndex, propEq } from "ramda";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DBChangeOption,
  DBResultOption,
  DocumentId,
  DocumentPrototype,
  LocalDocumentDatabase,
} from "../logic/database";
import {
  filterByLastPickedBefore,
  flattenTaskTypes,
  sortTask,
  TaskSuggestion,
  TaskType,
} from "../logic/TaskSuggestion";
import { circlularAdd } from "../utils/utils";

const RETRY_TIME_MS = 60 * 10 * 1000; // time to retry a card if it has been picked 10 mins

export type TaskSuggestionDocument = TaskSuggestion & DocumentPrototype;

export type IncompleteTaskSuggestionDocument =
  | TaskSuggestionDocument
  | (TaskSuggestion & { _id?: DocumentId });
const initialState: TaskContextType = {
  suggestions: [],
  setSuggestions: () => {},
  hierarchy: [],
  setHeirarchy: () => {},
  currentSuggestion: null,
  setCurrentSuggestion: () => {},
};

export interface TaskContextType {
  suggestions: TaskSuggestionDocument[];
  setSuggestions: (task: TaskSuggestionDocument[]) => void;
  hierarchy: TaskType[];
  setHeirarchy: (hierarchy: TaskType[]) => void;
  currentSuggestion: TaskSuggestionDocument | null;
  setCurrentSuggestion: (suggestion: TaskSuggestionDocument | null) => void;
}
export const TasksContext = createContext<TaskContextType>(initialState);
const localdb = new LocalDocumentDatabase<TaskSuggestionDocument>("tasks");

export function useSuggestions(): [
  TaskSuggestionDocument[],
  (task: TaskSuggestionDocument[]) => void
] {
  const { suggestions, setSuggestions } =
    useContext<TaskContextType>(TasksContext);

  return [suggestions, setSuggestions];
}
const findCurrentIndex = (currentSuggestion: TaskSuggestionDocument) =>
  findIndex(propEq("_id", currentSuggestion?._id));
export function useSuggestion(): {
  currentSuggestion: TaskSuggestionDocument | null;
  filteredSuggestions: TaskSuggestionDocument[];
  setCurrentSuggestion: (suggestion: TaskSuggestionDocument | null) => void;
  nextSuggestion: () => void;
  updateSuggestion: (
    suggestion: IncompleteTaskSuggestionDocument
  ) => Promise<DBResultOption<TaskSuggestionDocument>>;
  deleteSuggestion: (
    suggestion: TaskSuggestionDocument
  ) => Promise<DBResultOption<TaskSuggestionDocument>>;
  setPick: (
    suggestion: TaskSuggestionDocument
  ) => Promise<DBResultOption<TaskSuggestionDocument>>;
} {
  const { suggestions, currentSuggestion, setCurrentSuggestion } =
    useContext<TaskContextType>(TasksContext);
  const filteredSuggestions = filterByLastPickedBefore(
    Date.now() - RETRY_TIME_MS
  )(suggestions);

  const nextSuggestion = () => {
    try {
      if (filteredSuggestions.length === 0) {
        setCurrentSuggestion(null);
        return;
      }
      if (currentSuggestion === null) {
        setCurrentSuggestion(filteredSuggestions[0]);
      } else {
        var currentIdx =
          findCurrentIndex(currentSuggestion)(filteredSuggestions);
        var nextIdx = circlularAdd(filteredSuggestions.length)(currentIdx);
        setCurrentSuggestion(filteredSuggestions[nextIdx]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateSuggestion = (
    suggestion: IncompleteTaskSuggestionDocument
  ): Promise<DBResultOption<TaskSuggestionDocument>> => {
    return localdb.put(suggestion);
  };

  const setPick = (
    suggestion: TaskSuggestionDocument
  ): Promise<DBResultOption<TaskSuggestionDocument>> => {
    suggestion.lastPicked = Date.now();
    return localdb.put(suggestion);
  };

  const deleteSuggestion = (suggestion: TaskSuggestionDocument) => {
    return localdb.remove(suggestion);
  };
  return {
    currentSuggestion,
    filteredSuggestions,
    setCurrentSuggestion,
    nextSuggestion,
    updateSuggestion,
    deleteSuggestion,
    setPick,
  };
}

export function useHeirarchy(): [TaskType[], (hierarchy: TaskType[]) => void] {
  const { hierarchy, setHeirarchy } = useContext<TaskContextType>(TasksContext);
  return [hierarchy, setHeirarchy];
}

export function StoreProvider({ children }: React.PropsWithChildren<{}>) {
  const [suggestions, setSuggestions] = useState<TaskSuggestionDocument[]>([]);
  const [hierarchy, setHeirarchy] = useState<TaskType[]>([]);
  const [currentSuggestion, setCurrentSuggestion] =
    useState<TaskSuggestionDocument | null>(null);
  const hierarchySet = useRef(false);

  useEffect(() => {
    fetch("/assets/tasktypehierarchy.json")
      .then((res) => res.json())
      .then((_hierarchy) => {
        setHeirarchy(_hierarchy);
        hierarchySet.current = true;
      });
    return () => {
      hierarchySet.current = false;
    };
  }, []);

  useEffect(() => {
    if (!hierarchySet.current) return;
    var cancelDbListener = () => {};
    const onChange = (change: DBChangeOption<TaskSuggestionDocument>) => {
      if (change.kind === "Error") {
        console.log("Update Skipped", change.value);
        return;
      }
      // if update is current suggestion , set current Suggestion
      if (change.value.id === currentSuggestion?._id) {
        setCurrentSuggestion(change.value.doc);
      }
      getAndUpdateSuggestionsList();
    };
    cancelDbListener = localdb.watch(onChange);

    const getAndUpdateSuggestionsList = async () => {
      var resp = await localdb.getAll();
      if (resp.kind === "Error") {
        // TODO : somehow represent that an error has occured.
      } else {
        const sorted_suggestions = sortTask(
          resp.value,
          flattenTaskTypes(hierarchy)
        );
        setSuggestions(sorted_suggestions);

        if (currentSuggestion !== null) {
          if (findCurrentIndex(currentSuggestion)(sorted_suggestions) === -1) {
            setCurrentSuggestion(null); // if the suggestion was deleted then reset to the initial suggestion
          }
        }
      }
    };
    getAndUpdateSuggestionsList();
    // )();

    return cancelDbListener;
  }, [hierarchy]);

  const value = useMemo(
    () => ({
      suggestions,
      setSuggestions,
      hierarchy,
      setHeirarchy,
      currentSuggestion,
      setCurrentSuggestion,
    }),
    [suggestions, hierarchy, currentSuggestion]
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
