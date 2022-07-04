import {
  add,
  both,
  compose,
  curry,
  either,
  filter,
  flatten,
  gt,
  has,
  identity,
  ifElse,
  indexOf,
  isEmpty,
  isNil,
  lt,
  lte,
  map,
  not,
  prop,
  propOr,
  sort,
  subtract,
  __,
} from "ramda";

export interface TaskType {
  label: string;
  subtypes?: TaskType[];
}

export const TaskTypeSeperator = "/";

export type TaskSuggestion = {
  suggestion: string;
  type: string;
  lastPicked?: number; // some UTC timestamp .
};

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

const taskComparator =
  <T extends TaskSuggestion>(flattendOrderList: string[]) =>
  (taskA: T, taskB: T) =>
    indexOf(taskA.type)(flattendOrderList) -
    indexOf(taskB.type)(flattendOrderList);

export const sortTask = <T extends TaskSuggestion>(
  items: T[],
  flattendOrderList: string[]
) => sort<T>(taskComparator(flattendOrderList))(items);

export const getLastPicked: (obj: any) => number = prop("lastPicked");
export const lastPickedBefore = (time: number): ((obj: any) => boolean) =>
  compose(gt(time), getLastPicked);
export const hasLastPicked = has("lastPicked");
export const predicateByLastPickedBefore = (
  time: number
): ((obj: any) => boolean) =>
  either(compose(not, hasLastPicked), lastPickedBefore(time));

export const filterByLastPickedBefore = (
  time: number
): ((list: any[]) => any[]) => filter(predicateByLastPickedBefore(time));
