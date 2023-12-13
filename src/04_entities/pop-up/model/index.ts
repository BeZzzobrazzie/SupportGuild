import { createEvent, createStore, restore } from "effector";


export const popUpShown = createEvent();
export const popUpHidden = createEvent();

export const $popUpVisibility = createStore(false)
  .on(popUpShown, () => true)
  .on(popUpHidden, () => false);

