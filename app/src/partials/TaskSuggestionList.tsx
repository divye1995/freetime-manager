import { useState } from "react";
import { SuggestionV1 } from "../components/Suggestion";
import {
  TaskSuggestionDocument,
  useSuggestion,
  useSuggestions,
} from "../providers/context";
import TaskSuggestionEditor from "./TaskSuggestionEditor";

function TaskSuggestionListItem(props: {
  suggestion: TaskSuggestionDocument;
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="item">
      <div className="controls">
        <button className="button floating delete" onClick={props.onDelete}>
          Delete
        </button>
        <button className="button floating edit" onClick={props.onEdit}>
          Edit
        </button>
      </div>

      <div className="info">
        <SuggestionV1 task={props.suggestion} />
      </div>
    </div>
  );
}

const emptySuggestionDocument: TaskSuggestionDocument = {
  _id: "",
  _rev: "",
  suggestion: "",
  type: "",
};

function TaskSuggestionList() {
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<TaskSuggestionDocument | null>(null);
  const [suggestions] = useSuggestions();
  const { deleteSuggestion } = useSuggestion();
  function onEditOrCreateDone() {
    setSelectedSuggestion(null);
  }
  return (
    <div className="container">
      <div className="controls">
        <button onClick={() => setSelectedSuggestion(emptySuggestionDocument)}>
          Create
        </button>
      </div>
      <div className="main">
        {suggestions
          ? suggestions.map((suggestion) => (
              <TaskSuggestionListItem
                key={suggestion._id}
                onEdit={() => setSelectedSuggestion(suggestion)}
                onDelete={() => deleteSuggestion(suggestion)}
                suggestion={suggestion}
              />
            ))
          : "Please Add some tasks"}
      </div>
      <TaskSuggestionEditor
        onDone={onEditOrCreateDone}
        suggestion={selectedSuggestion}
      />
    </div>
  );
}
export default TaskSuggestionList;
