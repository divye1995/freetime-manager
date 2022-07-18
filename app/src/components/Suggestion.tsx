import { TaskSuggestion } from "../utils/TaskSuggestion";
import { TaskSuggestionDocument } from "../utils/types";
import CardHolder from "./CardHolder";

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

export function SuggestionV2({
  task,
  mini = false,
  onDelete,
}: {
  task: TaskSuggestionDocument | null;
  mini?: boolean;
  onDelete: () => void;
}) {
  const deleteBtn = (
    <div className="delete-btn">
      <svg
        onClick={onDelete}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 stroke-primary hover:stroke-negative`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </div>
  );
  const NoSuggestionsView = (
    <div>
      <p className="inline-flex">
        <span> We have no Suggestions for you ! </span>
      </p>
    </div>
  );
  const singleView = (
    <CardHolder>
      <div className="w-4/5 md:w-96 h-80 divide-y divide-gray-300/50">
        {task ? (
          <div className="grid grid-rows-6 h-full space-y-6 py-8 text-base leading-7 text-gray-600">
            <div className="row-span-5">
              <div className="actions">{deleteBtn}</div>
              <p>{task.suggestion}</p>
            </div>
            <div className="row-span-1 w-full inline-flex justify-between">
              <p className="text-base text-gray-500">{task?.type}</p>
            </div>
          </div>
        ) : (
          NoSuggestionsView
        )}
      </div>
    </CardHolder>
  );

  const miniView = (
    <CardHolder>
      <div className="h-40 divide-y divide-gray-300/50">
        <div className="grid grid-rows-2 h-full space-y-6 py-2 text-base leading-7 text-gray-600">
          <div className="row-span-1">
            <p>{task?.suggestion}</p>
          </div>
          <div className="row-span-1 w-full inline-flex justify-between">
            <p className="text-base text-gray-500">{task?.type}</p>
          </div>
        </div>
      </div>
    </CardHolder>
  );

  return mini ? miniView : singleView;
}
