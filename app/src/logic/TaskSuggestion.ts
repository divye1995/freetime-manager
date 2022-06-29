import {
  compose,
  curry,
  flatten,
  ifElse,
  indexOf,
  isEmpty,
  isNil,
  map,
  prop,
  propOr,
  sort,
} from "ramda";

export interface TaskType {
  label: string;
  subtypes?: TaskType[];
}

export const TaskTypeSeperator = "/";

export interface TaskSuggestion {
  suggestion: string;
  type: string;
}

const isEmptyOrNil = (taskType: TaskType) =>
  isEmpty(taskType.subtypes) || isNil(taskType.subtypes);
// takes a list of taskTypes and returns a flattened list with order of priority
const joinPrefixAndPostFix = (prefix: string) => (postfix: string) =>
  prefix + "/" + postfix;
const applyPrefix = (prefix: string) => map(joinPrefixAndPostFix(prefix));

export const flattenTaskTypes = (taskTypes: TaskType[]): string[] =>
  flattenTypes(taskTypes);

const getPostFixes = compose(flattenTaskTypes, propOr([], "subtypes"));

const applyPrefixToPostfix = (taskType: TaskType) => [
  ...applyPrefix(prop("label")(taskType))(getPostFixes(taskType)),
  prop("label")(taskType),
];

const getTypes = ifElse(isEmptyOrNil, prop("label"), applyPrefixToPostfix);

export const flattenTypes = compose(flatten, map(getTypes));

const taskComparator = (
  flattendOrderList: string[],
  taskA: TaskSuggestion,
  taskB: TaskSuggestion
) =>
  indexOf(taskA.type)(flattendOrderList) -
  indexOf(taskB.type)(flattendOrderList);

const curriedTaskComparator = curry(taskComparator);

export const sortTask = (
  items: TaskSuggestion[],
  flattendOrderList: string[]
) => sort<TaskSuggestion>(curriedTaskComparator(flattendOrderList))(items);
