import { SuggestionV2 } from "../../components/Suggestion";
import { useSuggestionList } from "../../providers/hooks";

function TaskSuggestionList() {
  const [suggestions] = useSuggestionList();

  const suggestionList = (
    <>
      {suggestions.map((suggestion) => (
        <SuggestionV2
          key={suggestion._id}
          task={suggestion}
          onDelete={() => {}}
        ></SuggestionV2>
      ))}
    </>
  );
  // TODO : now decorate list view with responsiveness
  return (
    <div className="outer-container h-full w-full md:m-4 md:p-4 border-2 border-gray-800 overflow-scroll">
      {suggestionList}
    </div>
  );
}
export default TaskSuggestionList;
