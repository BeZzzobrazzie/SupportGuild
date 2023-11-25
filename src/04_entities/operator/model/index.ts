import {
  createStore,
  createEvent,
  createEffect,
  sample,
  restore,
  split,
} from "effector";
import {
  deleteOperator,
  getOperators,
  createOperator,
  updateOperator,
} from "src/05_shared/api";
import { sharedTypes } from "src/05_shared/types";

export const getOperatorsFx = createEffect(async () => {
  const response = await getOperators().then();
  return response;
});
export const createOperatorsFx = createEffect(
  async (params: { prefix: string; names: sharedTypes.Name[] }) => {
    const response = await createOperator(params);
    return response;
  }
);
export const updateOperatorsFx = createEffect(
  async (params: { id: number; prefix: string; names: sharedTypes.Name[] }) => {
    const response = await updateOperator(params);
    return response;
  }
);
export const deleteOperatorFx = createEffect(async (id: number) => {
  const response = await deleteOperator(id);
  return response;
});

export const pageMounted = createEvent();
export const operatorChangeInitiated = createEvent<number>();
export const operatorChangeCompleted = createEvent();
export const operatorChangeSaved = createEvent<number>();
export const operatorDelete = createEvent<number>();
export const changedEditablePrefix = createEvent<string>();
export const changedEditableName = createEvent<{
  tempId: number;
  name: string;
}>();
export const addedName = createEvent();
export const resetChanges = createEvent();

export const deletedName = createEvent<{
  id: number;
  creationForm?: boolean;
}>();
const deletedNameFromEditableNames = createEvent<{
  id: number;
  creationForm?: boolean;
}>();
const deletedNameFromNewEditableNames = createEvent<{
  id: number;
  creationForm?: boolean;
}>();

export const changedNewEditablePrefix = createEvent<string>();
export const changedNewEditableName = createEvent<{
  id: number;
  name: string;
}>();
export const newAddedName = createEvent();
export const resetChangesFormCreation = createEvent();
export const operatorCreated = createEvent();

export const $operators = restore<sharedTypes.Operator[]>(
  getOperatorsFx.doneData,
  []
);
export const $idEditableOperator = restore<number>(
  operatorChangeInitiated,
  null
).reset(resetChanges);
export const $editablePrefix = restore<string>(changedEditablePrefix, "").reset(
  resetChanges
);
export const $editableNames = createStore<sharedTypes.Name[]>([]).reset(
  resetChanges
);
const $idName = createStore(0).reset(resetChanges);

export const $newEditablePrefix = restore(changedNewEditablePrefix, "").reset(
  resetChangesFormCreation
);
export const $newEditableNames = createStore<sharedTypes.Name[]>([]).reset(
  resetChangesFormCreation
);
const $idNewName = createStore(0).reset(resetChangesFormCreation);

sample({
  clock: newAddedName,
  source: $idNewName,
  fn: (store) => store + 1,
  target: $idNewName,
});

sample({
  clock: newAddedName,
  source: { $idNewName, $newEditableNames },
  fn: ({ $idNewName, $newEditableNames }) => [
    ...$newEditableNames,
    { id: $idNewName, name: "" },
  ],
  target: $newEditableNames,
});

sample({
  clock: changedNewEditableName,
  source: $newEditableNames,
  fn: (store, { id, name }) =>
    store.map((item) => {
      if (item.id === id) return { ...item, name };
      else return item;
    }),
  target: $newEditableNames,
});

sample({
  clock: operatorCreated,
  source: { prefix: $newEditablePrefix, names: $newEditableNames },
  fn: ({ prefix, names }) => ({ prefix, names }),
  target: createOperatorsFx,
});

sample({
  clock: createOperatorsFx.done,
  target: resetChangesFormCreation,
});

sample({
  clock: operatorChangeInitiated,
  source: $operators,
  fn: (store, id) => {
    const prefix = store.find((item) => item.id === id)?.prefix;
    if (prefix === undefined) return "";
    else return prefix;
  },
  target: $editablePrefix,
});

sample({
  clock: operatorChangeInitiated,
  source: { op: $operators, startId: $idName },
  fn: ({ op, startId }, id) => {
    const names = op.find((item) => item.id === id)?.names;
    if (names === undefined) return [];
    return names?.map(({ id, name }, index) => ({
      id: id,
      name: name,
      tempId: startId + index + 1,
    }));
  },
  target: $editableNames,
});

sample({
  clock: operatorChangeInitiated,
  source: $editableNames,
  fn: (store) => (store === undefined ? 0 : store?.length),
  target: $idName,
});

sample({
  clock: addedName,
  source: $idName,
  fn: (store) => store + 1,
  target: $idName,
});

sample({
  clock: addedName,
  source: { $idName, $editableNames },
  fn: ({ $idName, $editableNames }) => [
    ...$editableNames,
    { name: "", tempId: $idName },
  ],
  target: $editableNames,
});

sample({
  clock: changedEditableName,
  source: $editableNames,
  fn: (store, { tempId, name }) =>
    store.map((item) => {
      if (item.tempId === tempId) return { ...item, name };
      else return item;
    }),
  target: $editableNames,
});

sample({
  clock: operatorChangeSaved,
  source: { prefix: $editablePrefix, names: $editableNames },
  fn: ({ prefix, names }, id) => ({ id, prefix, names }),
  target: updateOperatorsFx,
});

sample({
  clock: deletedNameFromEditableNames,
  source: $editableNames,
  fn: (store, { id }) => store?.filter((item) => item.tempId !== id),
  target: $editableNames,
});

sample({
  clock: deletedNameFromNewEditableNames,
  source: $newEditableNames,
  fn: (store, { id }) => store.filter((item) => item.id !== id),
  target: $newEditableNames,
});

sample({
  clock: operatorDelete,
  target: deleteOperatorFx,
});

sample({
  clock: [
    pageMounted,
    deleteOperatorFx.done,
    createOperatorsFx.done,
    updateOperatorsFx.done,
  ],
  target: getOperatorsFx,
});

sample({
  clock: getOperatorsFx.done,
  target: resetChanges,
});

split({
  source: deletedName,
  match: {
    edit: (obj) => obj.creationForm === undefined,
    form: (obj) => obj.creationForm !== undefined,
  },
  cases: {
    edit: deletedNameFromEditableNames,
    form: deletedNameFromNewEditableNames,
  },
});
