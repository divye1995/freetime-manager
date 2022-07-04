import { BasicTemplate } from "../components/BasicTemplate";
import { SuggestionV1 } from "../components/Suggestion";
import { useHeirarchy, useSuggestion } from "../providers/context";
import "./View.css";

function ViewV1() {
  const { currentSuggestion, filteredSuggestions, nextSuggestion, setPick } =
    useSuggestion();
  const [hierarchy, setHeirarchy] = useHeirarchy();

  const leftClickHandler = () => nextSuggestion();
  const rightClickHandler = () => onPick();
  const onPick = () => {
    if (currentSuggestion)
      setPick(currentSuggestion).then((result) => {
        if (result.kind === "Error") {
          // respond with error
        } else {
          // dont respond at all
        }
      });
  };
  return (
    <BasicTemplate title="Basic V1">
      <div className="basic">
        <div
          className="left cursor-pointer"
          onClick={(e) => leftClickHandler()}
        >
          {filteredSuggestions.length > 1 ? "Next" : <></>}
        </div>
        <div
          className="right cursor-pointer"
          onClick={(e) => rightClickHandler()}
        >
          {"Pick"}
        </div>
        <div className="main">
          {currentSuggestion ? (
            <SuggestionV1 task={currentSuggestion} />
          ) : filteredSuggestions.length ? (
            <span>
              {" "}
              We have some suggestions for you. Click{" "}
              <button onClick={() => nextSuggestion()}>Next</button> to find
              out!"{" "}
            </span>
          ) : (
            "No Suggestions. You should do what you want !"
          )}
        </div>
      </div>
    </BasicTemplate>
  );
}

export default ViewV1;
