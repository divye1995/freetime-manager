// create a context to provide custom hooks for Pouch DB

import { createContext, useMemo } from "react";
import { LocalDocumentDatabase } from "../services/database";
import { TaskSuggestionDocument } from "../utils/types";

const initialState: TaskContextType = {
  suggestionsDb: new LocalDocumentDatabase<TaskSuggestionDocument>("tasks"),
};

export interface TaskContextType {
  suggestionsDb: LocalDocumentDatabase<TaskSuggestionDocument>;
  // suggestions: TaskSuggestionDocument[];
  // setSuggestions: (task: TaskSuggestionDocument[]) => void;
  // hierarchy: TaskType[];
  // setHeirarchy: (hierarchy: TaskType[]) => void;
  // currentSuggestion: TaskSuggestionDocument | null;
  // setCurrentSuggestion: (suggestion: TaskSuggestionDocument | null) => void;
}
export const TasksContext = createContext<TaskContextType>(initialState);

// const settingsDb = new LocalDocumentDatabase<SettingsDocument>("settings");

// export function useSuggestions(): [
//   TaskSuggestionDocument[],
//   (task: TaskSuggestionDocument[]) => void
// ] {
//   const { suggestions, setSuggestions } =
//     useContext<TaskContextType>(TasksContext);

//   return [suggestions, setSuggestions];
// }

// export function useSuggestion(): {
//   currentSuggestion: TaskSuggestionDocument | null;
//   filteredSuggestions: TaskSuggestionDocument[];
//   setCurrentSuggestion: (suggestion: TaskSuggestionDocument | null) => void;
//   nextSuggestion: () => void;
//   updateSuggestion: (
//     suggestion: IncompleteTaskSuggestionDocument
//   ) => Promise<DBResultOption<TaskSuggestionDocument>>;
//   deleteSuggestion: (
//     suggestion: TaskSuggestionDocument
//   ) => Promise<DBResultOption<TaskSuggestionDocument>>;
//   setPick: (
//     suggestion: TaskSuggestionDocument
//   ) => Promise<DBResultOption<TaskSuggestionDocument>>;
// } {
//   const { suggestions, currentSuggestion, setCurrentSuggestion } =
//     useContext<TaskContextType>(TasksContext);
//   const filteredSuggestions = filterByLastPickedBefore(
//     Date.now() - RETRY_TIME_MS
//   )(suggestions);

//   const nextSuggestion = () => {
//     try {
//       if (filteredSuggestions.length === 0) {
//         setCurrentSuggestion(null);
//         return;
//       }
//       if (currentSuggestion === null) {
//         setCurrentSuggestion(filteredSuggestions[0]);
//       } else {
//         var currentIdx =
//           findCurrentIndex(currentSuggestion)(filteredSuggestions);
//         var nextIdx = circlularAdd(filteredSuggestions.length)(currentIdx);
//         setCurrentSuggestion(filteredSuggestions[nextIdx]);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const updateSuggestion = (
//     suggestion: IncompleteTaskSuggestionDocument
//   ): Promise<DBResultOption<TaskSuggestionDocument>> => {
//     return suggestionsDb.put(suggestion);
//   };

//   const setPick = (
//     suggestion: TaskSuggestionDocument
//   ): Promise<DBResultOption<TaskSuggestionDocument>> => {
//     suggestion.lastPicked = Date.now();
//     return suggestionsDb.put(suggestion);
//   };

//   const deleteSuggestion = (suggestion: TaskSuggestionDocument) => {
//     return suggestionsDb.remove(suggestion);
//   };
//   return {
//     currentSuggestion,
//     filteredSuggestions,
//     setCurrentSuggestion,
//     nextSuggestion,
//     updateSuggestion,
//     deleteSuggestion,
//     setPick,
//   };
// }

// export function useHeirarchy(): [TaskType[], (hierarchy: TaskType[]) => void] {
//   const { hierarchy, setHeirarchy } = useContext<TaskContextType>(TasksContext);
//   return [hierarchy, setHeirarchy];
// }

export function AppContextProvider({ children }: React.PropsWithChildren<{}>) {
  // const [suggestions, setSuggestions] = useState<TaskSuggestionDocument[]>([]);
  // // const [hierarchy, setHeirarchy] = useState<TaskType[]>(DefaultTaskTypes);
  // const [currentSuggestion, setCurrentSuggestion] =
  //   useState<TaskSuggestionDocument | null>(null);

  // // effect to read the suggestions list from the db.

  // // effect to listen to db changes
  // useEffect(() => {
  //   var cancelDbListener = () => {};
  //   const onChange = (change: DBChangeOption<TaskSuggestionDocument>) => {
  //     if (change.kind === "Error") {
  //       console.log("Update Skipped", change.value);
  //       return;
  //     }
  //     suggestionsDb.getAll().then((resp) => {
  //       if (resp.kind === "Error") {
  //         // TODO : somehow represent that an error has occured.
  //       } else {
  //         if (change.value.id === currentSuggestion?._id) {
  //           if (change.value.deleted) {
  //             setCurrentSuggestion(null); // if update is current suggestion , and the update says it is deleted
  //           } else {
  //             setCurrentSuggestion(change.value.doc);
  //           }
  //         }
  //         setSuggestions(resp.value);
  //       }
  //     }, []);
  //     cancelDbListener = suggestionsDb.watch(onChange);
  //     return cancelDbListener;
  //   };
  // }, []);

  // // effect to check if their is any type missing in the heirarchy

  // const sortedSuggestions = useMemo(() => {
  //   return sortTask(suggestions, flattenTaskTypes(hierarchy));
  // }, [suggestions, hierarchy]);

  const value = useMemo(
    () => ({
      suggestionsDb: new LocalDocumentDatabase<TaskSuggestionDocument>("tasks"),
    }),
    []
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
