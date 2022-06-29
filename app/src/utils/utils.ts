export const circlularAdd = (range: number) => (current: number) =>
  (current + 1) % range;
export const circularSubtract = (range: number) => (current: number) =>
  current > 0 ? current - 1 : range - 1;
