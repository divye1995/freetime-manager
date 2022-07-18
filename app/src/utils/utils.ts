import { compose, findIndex, identity, propEq, tap } from "ramda";
import { TaskSuggestionDocument } from "./types";

export const circlularAdd = (range: number) => (current: number) =>
  (current + 1) % range;
export const circularSubtract = (range: number) => (current: number) =>
  current > 0 ? current - 1 : range - 1;

export const findCurrentIndex = (currentSuggestion: TaskSuggestionDocument) =>
  findIndex(propEq("_id", currentSuggestion?._id));

export const printAndReturn = compose(tap(console.log), identity);
