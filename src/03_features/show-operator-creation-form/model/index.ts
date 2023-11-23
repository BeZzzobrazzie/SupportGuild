import { createEvent, createStore } from "effector";


export const formShown = createEvent();
export const formHidden = createEvent();

export const $showForm = createStore(false)
  .on(formShown, () => true)
  .reset(formHidden);