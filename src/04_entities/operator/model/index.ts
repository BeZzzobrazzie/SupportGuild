import { createStore, createEvent, createEffect, sample, restore } from "effector";
import { deleteOperator, getOperators } from "src/05_shared/api";
import { sharedTypes } from "src/05_shared/types";



export const getOperatorsFx = createEffect(async () => {
  const response = await getOperators().then();
  return response;
});

export const deleteOperatorFx = createEffect(async (id: string) => {
  const response = await deleteOperator(id);
  return response;
});

export const pageMounted = createEvent();
export const operatorChangeInitiated = createEvent<string>();
export const operatorChangeCompleted = createEvent();
export const operatorChangeSaved = createEvent<sharedTypes.Operator>();
export const operatorDelete = createEvent<string>();
export const changedEditablePrefix = createEvent<string>();

export const $editablePrefix = restore(changedEditablePrefix, '');
export const $editableNames = createStore<sharedTypes.Name[]>([]);
export const $operators = restore<sharedTypes.Operator[]>(getOperatorsFx.doneData, []);
export const $idEditableOperator = restore<string>(operatorChangeInitiated, '')
  .reset(operatorChangeCompleted);


sample({
  clock: [pageMounted, deleteOperatorFx.done],
  target: getOperatorsFx,
})

sample({
  clock: operatorDelete,
  target: deleteOperatorFx,
})

