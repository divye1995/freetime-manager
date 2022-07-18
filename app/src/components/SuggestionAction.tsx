import { PropsWithChildren } from "react";
import { TaskSuggestionDocument } from "../utils/types";

export const SuggestionAction = ({
  suggestion,
  onAccept,
  onNext,
  onAdd,
}: PropsWithChildren & {
  suggestion: TaskSuggestionDocument | null;
  onAccept: () => void;
  onNext: () => void;
  onAdd: () => void;
}) => {
  const AcceptBtn = (
    <div className="accept">
      <svg
        onClick={onAccept}
        className={`h-12 w-12 stroke-primary hover:stroke-positive`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
  const RejectBtn = (
    <div className="reject">
      <svg
        onClick={onNext}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-12 w-12 stroke-primary hover:stroke-negative`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );

  const AddBtn = (
    <div className="add">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={onAdd}
        className={`h-12 w-12 stroke-primary hover:stroke-positive`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </div>
  );
  return (
    <div className="flex flex-row w-full controls justify-evenly">
      {suggestion ? AcceptBtn : <></>}
      {suggestion ? RejectBtn : <></>}
      {AddBtn}
    </div>
  );
};
