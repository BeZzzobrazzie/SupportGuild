import { createEvent, createStore, sample } from "effector";




export const showContextMenu = createEvent();
export const hideContextMenu = createEvent();

export const $contextMenuVisibility = createStore(false)
  .on(showContextMenu, () => true)
  .on(hideContextMenu, () => false);

