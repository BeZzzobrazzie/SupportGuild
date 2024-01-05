import { createEffect, createEvent, createStore, sample, restore, combine } from "effector";
import { deleteExUnit, getExUnits } from "src/05_shared/api";
import { exDirOpenedType, exUnitsStoreType, rootType } from "src/05_shared/types";




const getExUnitsFx = createEffect(async () => {
  const response = await getExUnits().then();
  // response.responseExUnits = response.responseExUnits.map((unit : exUnitsStoreType) => {

  //   if(unit.role === "file") return unit;
  //   else if (unit.role === "dir") {
  //     unit.opened = false;
  //     return unit;
  //   }
  // })

  const result = {root: response.responseExRoot, exUnits: response.responseExUnits};
  console.log(result);
  return result;
})

const deleteExUnitFx = createEffect(async(id: number) => {
  const response = await deleteExUnit(id).then();
  return response;
})


export const pageMounted = createEvent();
export const createdFile = createEvent();
export const deletedExUnit = createEvent<number>();
export const dirVisibilitySwitched = createEvent<number>();

export const $root = createStore<rootType>({childIds: []})
  .on(getExUnitsFx.doneData, (_, payload) => payload.root);
export const $exUnits = createStore<exUnitsStoreType[]>([])
  .on(getExUnitsFx.doneData, (_, payload) => payload.exUnits);
export const $exDirOpened = createStore<exDirOpenedType[] | null>(null);
export const $pending = combine(getExUnitsFx.pending);


sample({
  clock: [pageMounted, deleteExUnitFx.done],
  target: getExUnitsFx,
});

sample({
  clock: dirVisibilitySwitched,
  source: $exDirOpened,
  fn: (store, unitId) => store === null ? null : store.map((unit) => {
    if(unit.id === unitId) {
      unit.opened = !unit.opened;
      return unit;
    }
    else return unit;
  }),
  target: $exDirOpened,
})

sample({
  clock: deletedExUnit,
  target: deleteExUnitFx,
})

sample({
  clock: getExUnitsFx.doneData,
  source: $exDirOpened,
  fn: (store, payload) => {
    if (store === null) return payload.exUnits.map((item) => ({id: item.id, opened: false}));
    else {
      return payload.exUnits.map((item) => {
        const storeItem = store.find(elem => elem.id === item.id);
        if(storeItem) {
          return {
            id: item.id,
            opened: storeItem.opened,
          };
        }
        else {
          return {
            id: item.id,
            opened: false,
          };
        }
      })
    }

  },
  target: $exDirOpened,
})









