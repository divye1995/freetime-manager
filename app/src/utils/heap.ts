/**
 * A function that returns > 0 when A > B , 0 - when A == B , <0 when A < B
 */
export type ComparatorFn<T> = (A: T, B: T) => number;

export const swap = <T>(from: number, to: number, heap: T[]) => {
  var temp = heap[from];
  heap[from] = heap[to];
  heap[to] = temp;
};

export const bubbleUp = <T>(
  currentIdx: number,
  heap: T[],
  comparator: ComparatorFn<T>
) => {
  var parentIdx = Math.floor((currentIdx - 1) / 2);
  while (parentIdx > 0 && comparator(heap[parentIdx], heap[currentIdx]) < 0) {
    swap(currentIdx, parentIdx, heap);
    currentIdx = parentIdx;
    parentIdx = Math.floor((currentIdx - 1) / 2);
  }
};

export const getGreaterBy = <T>(comparator: ComparatorFn<T>, A: T, B: T) =>
  comparator(A, B) > 0 ? A : B;

export const bubbleDown = <T>(
  currenIdx: number,
  lastIdx: number,
  heap: T[],
  comparator: ComparatorFn<T>
) => {
  var largerChildIdx = 2 * currenIdx + 1;
  while (largerChildIdx <= lastIdx) {
    if (largerChildIdx + 1 <= lastIdx) {
      if (
        getGreaterBy<T>(
          comparator,
          heap[largerChildIdx],
          heap[largerChildIdx + 1]
        ) !== heap[largerChildIdx]
      ) {
        largerChildIdx = largerChildIdx + 1;
      }
    }
    // if largest child is larger than parent then swap them and move current to the largest child pos
    if (comparator(heap[largerChildIdx], heap[currenIdx]) > 0) {
      swap(largerChildIdx, currenIdx, heap);
      currenIdx = largerChildIdx;
      largerChildIdx = 2 * currenIdx + 1;
    } else {
      break;
    }
  }
};
export const createHeap = <T>(heap: T[], comparator: ComparatorFn<T>): T[] => {
  if (heap.length === 0) return [];
  var firstParentIdx = Math.floor((heap.length - 2) / 2);
  for (var currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
    bubbleDown(currentIdx, heap.length - 1, heap, comparator);
  }
  return heap;
};

export class MaxHeap<T> {
  comparator: ComparatorFn<T> = () => 0;
  heap: T[] = [];

  constructor(array: T[], comparator: ComparatorFn<T>) {
    this.comparator = comparator;
    this.heap = array;
    this.heapify();
  }

  clear() {
    this.heap = [];
  }

  peek(): T | null {
    if (this.heap.length) {
      return this.heap[0];
    }
    return null;
  }
  heapify() {
    this.heap = createHeap<T>(this.heap, this.comparator);
  }

  next(): T | null {
    if (this.peek() == null) return null;
    swap(0, this.heap.length - 1, this.heap);
    var value = this.heap.pop();
    bubbleDown(0, this.heap.length - 1, this.heap, this.comparator);
    return value ? value : null;
  }

  insert(v: T) {
    this.heap.push(v);
    bubbleUp(this.heap.length - 1, this.heap, this.comparator);
  }
}

// const heap = new MaxHeap<number>([5, 4, 8, 1, 10], (a, b) => a - b);
