import { createEvent, createStore, sample } from "effector";




export const showContextMenu = createEvent<MouseEvent>();
export const hideContextMenu = createEvent();

export const $contextMenuVisibility = createStore(false)
  .on(showContextMenu, () => true)
  .on(hideContextMenu, () => false);

export const $contextMenuCoordinates = createStore({x: 0, y: 0})
  .on(showContextMenu, (_, event) => ({x: event.clientX, y: event.clientY}));
export const $contextMenuTarget = createStore<EventTarget | null>(null)
  .on(showContextMenu, (_, event) => event.target);