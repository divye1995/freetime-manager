import { DocumentId, DocumentPrototype } from "../services/database";
import { TaskSuggestion } from "./TaskSuggestion";

export interface CardModel {
  title: string;
  category: string;
  icon?: string;
}

export interface TaskType {
  label: string;
  subtypes?: TaskType[];
}

export type SettingsValue = TaskType;
export type SettingType = "hierarchy";
export type Settings = SettingTaskType | GeneralSettingsType;

export type GeneralSettingsType = {
  kind: "general";
  value: any;
};

export type SettingTaskType = {
  kind: "hierarchy";
  value: TaskType[];
};

export type SettingsDocument = Settings & DocumentPrototype;

export type TaskSuggestionDocument = TaskSuggestion & DocumentPrototype;

export type IncompleteTaskSuggestionDocument =
  | TaskSuggestionDocument
  | (TaskSuggestion & { _id?: DocumentId });

export type Some<T> = {
  kind: "SomeOption";
  value: T;
};
export type None = {
  kind: "NoneOption";
};
export type Option<T> = Some<T> | None;
