import { TaskSuggestion } from "../logic/TaskSuggestion";
import { TaskSuggestionDocument } from "../providers/context";

export function SuggestionV1({ task }: { task: TaskSuggestionDocument }) {
  const lastPickedDateString = task.lastPicked
    ? new Date(task.lastPicked).toLocaleString()
    : null;
  return (
    <div>
      <div> type: {task.type}</div>
      <br />
      <div> suggestion : {`${task.suggestion}`}</div>
      {lastPickedDateString ? (
        <div> last Picked : {lastPickedDateString} </div>
      ) : (
        <></>
      )}
    </div>
  );
}
