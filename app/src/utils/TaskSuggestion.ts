import {
  compose,
  either,
  filter,
  findIndex,
  flatten,
  gt,
  has,
  ifElse,
  indexOf,
  isEmpty,
  isNil,
  map,
  not,
  prop,
  propEq,
  propOr,
  reduce,
  sort,
  subtract,
} from "ramda";
import { TaskType } from "./types";

export const TaskTypeSeperator = "/";

export const DefaultTaskTypes: TaskType[] = [
  { label: "create" },
  { label: "learn" },
  { label: "practice" },
  { label: "consume" },
];
export interface TaskSuggestion {
  suggestion: string;
  type: string;
  lastPicked?: number; // some UTC timestamp .
  lastSeen?: number;
  importance?: number;
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

export const getTaskTypeFromString = (flattenedType: string) => {
  var parts = flattenedType.split("/");
  var taskTypes: TaskType[] = [];
  var current = taskTypes;
  for (var part of parts) {
    current.push({
      label: part,
      subtypes: [],
    });
    current = current[0].subtypes || [];
  }
  return taskTypes;
};

export const findIndexTypeByLabel = (key: string) =>
  findIndex(propEq("label", key));

export const mergeTypeLists = (
  typeListA: TaskType[],
  typeListB: TaskType[]
) => {
  var mergedLists = typeListA;
  typeListB.forEach((taskType) => {
    var idx = findIndexTypeByLabel(taskType.label)(mergedLists);
    if (idx > -1) {
      mergedLists[idx].subtypes = mergeTypeLists(
        mergedLists[idx].subtypes || [],
        taskType.subtypes || []
      );
    } else {
      mergedLists.push(taskType);
    }
  });
  return mergedLists;
};

export const getUniqueTypes = <T extends TaskSuggestion>(suggestions: T[]) => {
  var set = new Set<string>();
  const reducer = (s: Set<string>, current: T) => s.add(current.type);
  const uniqueSet = reduce(reducer, set)(suggestions);
  return Array.from(uniqueSet.values());
};

export const reconstructTaskTypes = <
  T extends TaskSuggestion,
  K extends TaskType
>(
  taskTypes: K[],
  suggestions: T[]
): TaskType[] => {
  const typeList = flatten(
    map(getTaskTypeFromString)(getUniqueTypes(suggestions))
  );

  return mergeTypeLists(taskTypes, typeList);
};

export type TypeToPriority = (_type: string) => number;

const getImportance: (t: { importance?: number }) => number = propOr<number>(
  0,
  "importance"
);
const getLastSeen: (t: { lastSeen?: number }) => number = propOr<number>(
  0,
  "lastSeen"
);

export const getImportanceDifference = <T extends TaskSuggestion>(A: T, B: T) =>
  getImportance(A) - getImportance(B);

export const getDiffByOr = <T, U>(
  A: T,
  B: T,
  Transformer: (obj: T) => U,
  Differntiator: (A: U, B: U) => number,
  OrF?: (A: T, B: T) => number
) => {
  const [x, y] = [Transformer(A), Transformer(B)];
  if (x === y && OrF) return OrF(A, B);
  return Differntiator(x, y);
};

const getTypePriority = (typeToPriorityTransformer: TypeToPriority) =>
  compose(typeToPriorityTransformer, prop<"type", string>("type"));

// JUMPIN
export const TaskSuggestionComparator = <T extends TaskSuggestion>(
  A: T,
  B: T,
  typeToPriorityTransformer: TypeToPriority
) => {
  return getDiffByOr(
    A,
    B,
    getTypePriority(typeToPriorityTransformer),
    subtract,
    (A: T, B: T) =>
      getDiffByOr(A, B, getLastSeen, subtract, getImportanceDifference)
  );
};

export const lastSeenBefore = (threshold: number) =>
  compose(gt(threshold), getLastSeen);

export const filterByLastSeenBefore = (threshold: number) =>
  filter(lastSeenBefore(threshold));
