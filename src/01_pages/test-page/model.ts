import { createEffect, createEvent, createStore, sample, restore } from "effector";
import { getExUnits } from "src/05_shared/api";

interface exUnitsStoreType {
  id: number,
  name: string,
  childIds: number[],
};


const getExUnitsFx = createEffect(async () => {
  const response = await getExUnits().then();
  return response;
})


export const pageMounted = createEvent();
export const createdFile = createEvent();

export const $exUnits = restore<exUnitsStoreType[]>(getExUnitsFx.doneData, []);



sample({
  clock: pageMounted,
  target: getExUnitsFx,
});










