export interface CardModel {
  title: string;
  category: string;
  icon?: string;
}

export type Some<T> = {
  kind: "SomeOption";
  value: T;
};
export type None = {
  kind: "NoneOption";
};
export type Option<T> = Some<T> | None;
