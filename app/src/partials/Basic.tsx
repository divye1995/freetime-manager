import { useEffect, useState } from "react";
import { BasicTemplate } from "../components/BasicTemplate";
import {
  flattenTaskTypes,
  sortTask,
  TaskSuggestion,
  TaskType,
} from "../logic/TaskSuggestion";
import { circlularAdd, circularSubtract } from "../utils/utils";
import "./Basic.css";

function BasicTaskView({ task }: { task: TaskSuggestion }) {
  return (
    <div>
      <div>{task.type}</div>
      <br />
      <div>{task.suggestion}</div>
    </div>
  );
}

function BasicView() {
  const [suggestions, setSuggestions] = useState<TaskSuggestion[]>([]);
  const [hierarchy, setHeirarchy] = useState<TaskType[]>([]);
  const [currenSuggestionIdx, setCurrent] = useState(0);
  useEffect(() => {
    fetch("/assets/tasktypehierarchy.json")
      .then((res) => res.json())
      .then((_hierarchy) => setHeirarchy(_hierarchy));
  });
  useEffect(() => {
    // load the task list and type hierarchy from assets
    fetch("/assets/tasklist.json")
      .then((res) => res.json())
      .then((_suggestions: TaskSuggestion[]) => setSuggestions(_suggestions));
  }, []);

  const sortedSuggestions = sortTask(suggestions, flattenTaskTypes(hierarchy));
  const leftClickHandler = () =>
    setCurrent(circularSubtract(suggestions.length)(currenSuggestionIdx));
  const rightClickHandler = () =>
    setCurrent(circlularAdd(suggestions.length)(currenSuggestionIdx));

  return (
    <BasicTemplate title="Basic V1">
      <div className="basic">
        <div
          className="left pointer-cursor"
          onClick={(e) => leftClickHandler()}
        >
          {"No"}
        </div>
        <div
          className="right pointer-cursor"
          onClick={(e) => rightClickHandler()}
        >
          {"Yes"}
        </div>
        <div className="main">
          {suggestions.length ? (
            <BasicTaskView task={sortedSuggestions[currenSuggestionIdx]} />
          ) : (
            "None Found "
          )}
        </div>
      </div>
    </BasicTemplate>
  );
}

export default BasicView;
