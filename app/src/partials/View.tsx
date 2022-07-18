import { useState } from "react";
import { SuggestionV2 } from "../components/Suggestion";
import { SuggestionAction } from "../components/SuggestionAction";
import { useSuggestionDocumentIterator } from "../providers/hooks";
import { TaskSuggestionDocument } from "../utils/types";
import TaskSuggestionCreator from "./CreateTaskSuggestion";
import "./View.css";

export function ViewV2() {
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [
    currentSuggestionDoc,
    setCurrentSuggestionDoc,
    nextSuggestion,
    setLastSeen,
    deleteSuggestion,
  ] = useSuggestionDocumentIterator();

  const onNextSuggestion = () => nextSuggestion();
  const onDelete = (suggestion: TaskSuggestionDocument | null) => {
    if (!suggestion) return;
    deleteSuggestion(suggestion).then((result) => {
      if (result.kind === "Error") {
        //TODO: Add error handling
        return;
      }
      nextSuggestion(true);
    });
  };
  return (
    <div>
      <TaskSuggestionCreator
        isOpen={isCreateOpen}
        onDone={({ cancel, created, suggestion }) => {
          setCreateOpen(false);
          if (suggestion) setCurrentSuggestionDoc(suggestion);
        }}
      />

      <div className="w-full flex flex-col justify-center overflow-hidden py-6 sm:py-12">
        <div className="w-full">
          <div className="my-4">
            <SuggestionAction
              suggestion={currentSuggestionDoc}
              onAdd={() => {
                setCreateOpen(true);
              }}
              onAccept={() => {}}
              onNext={() => onNextSuggestion()}
            ></SuggestionAction>
          </div>
          <SuggestionV2
            onDelete={() => onDelete(currentSuggestionDoc)}
            task={currentSuggestionDoc}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewV2;
