import React, { useState } from "react";
import { TaskSuggestion } from "../utils/TaskSuggestion";

function TaskSuggesionFormV1<T extends TaskSuggestion>({
  taskSuggestion,
  onSubmit,
}: {
  taskSuggestion: T;
  onSubmit: (task: T) => void;
}) {
  const [editedSuggestion, setTaskSuggestion] = useState<T>(taskSuggestion);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(editedSuggestion);
  }
  const { suggestion = "", type = "" } = editedSuggestion;
  return (
    <form className="suggestion" onSubmit={handleSubmit}>
      <label>
        Suggestion:
        <input
          type="text"
          value={suggestion}
          onChange={(e) =>
            setTaskSuggestion({
              ...editedSuggestion,
              suggestion: e.target.value,
            })
          }
        />
      </label>
      <label>
        Type:
        <input
          type="text"
          value={type}
          onChange={(e) =>
            setTaskSuggestion({
              ...editedSuggestion,
              type: e.target.value,
            })
          }
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
export default TaskSuggesionFormV1;
