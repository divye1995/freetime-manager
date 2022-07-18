/* 
This file helps us create a easy to use theme and color combination 
*/

import { curry, identity, map, range, reduce } from "ramda";

// the format here is trying to help you say things like
// I choose (dark/light ) primary-[50 ,100,200,900] [lightest to darkest]

/*

primary - Main Color - used to attract focus , and in main parts of the app. 
secondary - Complimenting to primary , in parts of application where you want to use colors other than black and white 
neutral - Grey scale that gives colors for background , text , borders etc . Where you dont want to use much colors. 

*/

export type ThemeGroupDefinitionKey =
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | "text"
  | "bg";

export type ThemeGroupDefinition = {
  [Key in ThemeGroupDefinitionKey]?: string; // strings should css classes.
};
export type ThemeGroup = "primary" | "secondary" | "neutral" | "semantic";

export type Theme = { [Key in ThemeGroup]: ThemeGroupDefinition };

export const getColorMap = (color: string) =>
  reduce(
    (acc, curr) => ({ ...acc, [curr * 100]: `${color}-${curr * 100}` }),
    {},
    range(1, 10)
  );

export const lightTheme: Theme = {
  primary: { ...getColorMap("violet"), bg: "neutral-50", text: "neutral-900" },
  secondary: {
    ...getColorMap("yellow"),
    bg: "neutral-50",
    text: "neutral-900",
  },
  neutral: { ...getColorMap("neutral"), bg: "neutral-50", text: "neutral-900" },
  semantic: {},
};

export const theme = lightTheme;

export default theme;
