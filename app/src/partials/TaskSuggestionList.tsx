import { SuggestionV2 } from "../components/Suggestion";
// import { useSuggestion, useSuggestions } from "../providers/context";
import { TaskSuggestionDocument } from "../utils/types";

function TaskSuggestionListItem(props: {
  suggestion: TaskSuggestionDocument;
  onDelete: () => void;
  onEdit: () => void;
  onReset: () => void;
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
        <button onClick={props.onReset}> Reset</button>
      </div>

      <div className="info">
        <SuggestionV2 onDelete={() => {}} mini={true} task={props.suggestion} />
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
  // const [selectedSuggestion, setSelectedSuggestion] =
  //   useState<TaskSuggestionDocument | null>(null);
  // const [suggestions] = useSuggestions();
  // const { deleteSuggestion, updateSuggestion } = useSuggestion();
  // function onEditOrCreateDone() {
  //   setSelectedSuggestion(null);
  // }
  // function onReset(suggestion: TaskSuggestionDocument) {
  //   delete suggestion["lastPicked"];
  //   updateSuggestion(suggestion).then((result) => {
  //     if (result.kind === "Error") {
  //       //TODO: handle this error
  //       return;
  //     }
  //   });
  // }
  return (
    <div>Hello World</div>
    // <div className="container">
    //   <div className="controls">
    //     <button onClick={() => setSelectedSuggestion(emptySuggestionDocument)}>
    //       Create
    //     </button>
    //   </div>
    //   <div className="main p-4 max-w-5xl grid gap-4 xs:grid-cols-2 xs:p-8 md:grid-cols-4 lg:gap-6">
    //     {suggestions
    //       ? suggestions.map((suggestion) => (
    //           <TaskSuggestionListItem
    //             key={suggestion._id}
    //             onEdit={() => setSelectedSuggestion(suggestion)}
    //             onDelete={() => deleteSuggestion(suggestion)}
    //             onReset={() => onReset(suggestion)}
    //             suggestion={suggestion}
    //           />
    //         ))
    //       : "Please Add some tasks"}
    //   </div>
    //   <TaskSuggestionEditor
    //     onDone={onEditOrCreateDone}
    //     suggestion={selectedSuggestion}
    //   />
    // </div>
  );
}
export default TaskSuggestionList;
