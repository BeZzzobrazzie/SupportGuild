import { createEvent, createStore, sample, split } from "effector";


export const clickedSort = createEvent<string>();
const changedPrefix = createEvent();
const changedName = createEvent();
const unknownEntry = createEvent();

export const $category = createStore(['prefix', 'name']);
export const $activeCategory = createStore<string | null>('');
export const $prefixSortedReversed = createStore([false, false]);
export const $nameSorted = createStore(false);
export const $nameReversed = createStore(false);

{
  prefix: {
    sorted: false,
    reversed: false,
  }
}

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
  fn: (store) => if (store === 'prefix') 
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






