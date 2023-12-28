import { createEffect, createEvent, createStore, sample, restore, combine } from "effector";
import { getExUnits } from "src/05_shared/api";
import { exUnitsStoreType, rootType } from "src/05_shared/types";




const getExUnitsFx = createEffect(async () => {
  const response = await getExUnits().then();
  response.exUnits = response.exUnits.map((unit : exUnitsStoreType) => {
    if(unit.role === "file") return unit;
    else if (unit.role === "dir") {
      unit.opened = false;
      return unit;
    }
  })
  const result = {root: response.root, exUnits: response.exUnits}
  console.log(result);
  return result;
})


export const pageMounted = createEvent();
export const createdFile = createEvent();
export const dirVisibilitySwitched = createEvent<number>();

export const $root = createStore<rootType>({childIds: []})
  .on(getExUnitsFx.doneData, (_, payload) => payload.root);
export const $exUnits = createStore<exUnitsStoreType[]>([])
  .on(getExUnitsFx.doneData, (_, payload) => payload.exUnits);
export const $pending = combine(getExUnitsFx.pending);


sample({
  clock: pageMounted,
  target: getExUnitsFx,
});

sample({
  clock: dirVisibilitySwitched,
  source: $exUnits,
  fn: (store, unitId) => store.map((unit) => {
    if(unit.id === unitId) {
      unit.opened = !unit.opened;
      return unit;
    }
    else return unit;
  }),
  target: $exUnits,
})










