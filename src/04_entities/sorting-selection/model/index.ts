import { createEvent, createStore, sample, split } from "effector";
import { operatorModel } from "src/04_entities/operator"; // кросс-импорт ??


export const clickedSort = createEvent<string>();
const changedPrefix = createEvent();
const changedName = createEvent();
const unknownEntry = createEvent();

export const $activeCategory = createStore<string | null>(null);
export const $activeDirection = createStore(false);
export const $prefixSortedReversed = createStore([false, false])
  .reset(changedName);
export const $nameSortedReversed = createStore([false, false])
  .reset(changedPrefix);

split({
  source: clickedSort,
  match: {
    prefix: (entry) => entry === 'prefix',
    name: (entry) => entry === 'name',
  },
  cases: {
    prefix: changedPrefix,
    name: changedName,
    __: unknownEntry,
  }
})

sample({
  clock: changedPrefix,
  source: $activeCategory,
  fn: (_) => 'prefix',
  target: $activeCategory,
})

sample({
  clock: changedPrefix,
  source: $prefixSortedReversed,
  fn: ([sorted, reversed]) => {
    if (sorted) return [true, !reversed];
    else return [true, false];
  },
  target: $prefixSortedReversed
})

sample({
  clock: changedPrefix,
  source: $prefixSortedReversed,
  fn: ([_, reversed]) => reversed,
  target: $activeDirection,
})

sample({
  clock: changedName,
  source: $activeCategory,
  fn: (_) => 'name',
  target: $activeCategory,
})

sample({
  clock: changedName,
  source: $nameSortedReversed,
  fn: ([sorted, reversed]) => {
    if (sorted) return [true, !reversed];
    else return [true, false];
  },
  target: $nameSortedReversed
})

sample({
  clock: changedName,
  source: $nameSortedReversed,
  fn: ([_, reversed]) => reversed,
  target: $activeDirection,
})

sample({ 
  clock: [$activeCategory, $activeDirection],
  source: {category: $activeCategory, direction: $activeDirection},
  fn: ({category, direction}) => ({category: category, direction: direction}),
  target: operatorModel.changedSorting
})

