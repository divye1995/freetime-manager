import { TaskSuggestion } from "./TaskSuggestion";
import { TaskType } from "./types";

const tasks: TaskSuggestion[] = [
  {
    suggestion: "Watch Netflix",
    type: "consume/watch/netflix",
  },
  {
    suggestion: "Create a Free time manager application",
    type: "create/code",
  },
  {
    suggestion: "Make A new Song",
    type: "create/music",
  },
  {
    suggestion: "Watch Random youtube",
    type: "consume/watch",
  },
];
const example: TaskType[] = [
  {
    label: "consume",
    subtypes: [{ label: "watch", subtypes: [{ label: "netflix" }] }],
  },
  { label: "create", subtypes: [{ label: "code" }, { label: "music" }] },
];
// console.log(flattenTaskTypes(example));
// console.log(sortTask(tasks, flattenTaskTypes(example)));
