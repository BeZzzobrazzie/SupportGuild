import { createEffect, createEvent, createStore, sample, restore, combine } from "effector";
import { getExUnits } from "src/05_shared/api";
import { exUnitsStoreType, rootType } from "src/05_shared/types";




const getExUnitsFx = createEffect(async () => {
  const response = await getExUnits().then();

  const result = {root: response.root, exUnits: response.exUnits}
  return result;
})


export const pageMounted = createEvent();
export const createdFile = createEvent();

export const $root = createStore<rootType>({childIds: []})
  .on(getExUnitsFx.doneData, (_, payload) => payload.root);
export const $exUnits = createStore<exUnitsStoreType[]>([])
  .on(getExUnitsFx.doneData, (_, payload) => payload.exUnits);
export const $pending = combine(getExUnitsFx.pending);


sample({
  clock: pageMounted,
  target: getExUnitsFx,
});










