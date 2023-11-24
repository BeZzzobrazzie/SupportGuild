import { createStore, createEvent, createEffect, sample, restore, split } from "effector";
import { deleteOperator, getOperators, createOperator } from "src/05_shared/api";
import { sharedTypes } from "src/05_shared/types";



export const getOperatorsFx = createEffect(async () => {
  const response = await getOperators().then();
  return response;
});

export const createOperatorsFx = createEffect(async (params: {prefix: string, names: sharedTypes.Name[]}) => {
  const response = await createOperator(params);
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
export const changedEditablePrefix = createEvent<string | undefined>();
export const addedName = createEvent();
const prependEditableNames = createEvent();

export const deletedName = createEvent<{id: number, creationForm?: boolean}>();
const deletedNameFromEditableNames = createEvent<{id: number, creationForm?: boolean}>();
const deletedNameFromNewEditableNames = createEvent<{id: number, creationForm?: boolean}>();


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
})


export const $editablePrefix = restore<string | undefined>(changedEditablePrefix, '')
  .reset(operatorChangeCompleted);
export const $editableNames = createStore<sharedTypes.Name[] | undefined>([])
  .reset(operatorChangeCompleted);
export const $operators = restore<sharedTypes.Operator[]>(getOperatorsFx.doneData, []);
export const $idEditableOperator = restore<string>(operatorChangeInitiated, '')
  .reset(operatorChangeCompleted);
const $idName = createStore(0)
  .reset(operatorChangeCompleted);


export const changedNewEditablePrefix = createEvent<string>();
export const changedNewEditableName = createEvent<{id: string, name: string}>();
export const newAddedName = createEvent();
export const resetChanges = createEvent();
export const operatorCreated = createEvent();


const $idNewName = createStore(0)
  .reset(resetChanges);
export const $newEditablePrefix = restore(changedNewEditablePrefix, '');
export const $newEditableNames = createStore<sharedTypes.Name[]>([]);

// sample({
//   clock: changedNewEditableName,
//   source: $newEditableNames,
//   fn: (store, {id, name}) => [...store, {id, name}],
//   target: $newEditableNames,
// })

sample({
  clock: operatorCreated,
  source: {prefix: $newEditablePrefix, names: $newEditableNames},
  fn: ({prefix, names}) => ({prefix, names}),
  target: createOperatorsFx,
})

sample({
  clock: newAddedName,
  source: $idNewName,
  fn: (store) => store + 1,
  target: $idNewName,
})

sample({
  clock: newAddedName,
  source: {$idNewName, $newEditableNames},
  fn: ({$idNewName, $newEditableNames}) => [...$newEditableNames, {id: $idNewName, name: ''}],
  target: $newEditableNames,
})

sample({
  clock: deletedNameFromEditableNames,
  source: $editableNames,
  fn: (store, {id}) => store?.filter((item) => item.id !== id),
  target: $editableNames,
})

sample({
  clock: deletedNameFromNewEditableNames,
  source: $newEditableNames,
  fn: (store, {id}) => store.filter((item) => item.id !== id),
  target: $newEditableNames,
})

sample({
  clock: operatorChangeInitiated,
  source: $operators,
  fn: (store, id) => store.find((item) => item.id === id)?.prefix,
  target: $editablePrefix,
})

sample({
  clock: operatorChangeInitiated,
  source: {op: $operators, startId: $idName},
  fn: ({op, startId}, id) => {
    const names = op.find((item) => item.id === id)?.names;
    return names?.map(({id, name}, index) => ({id: id, name: name, tempId: startId + index + 1}));
  },
  target: $editableNames,
})

sample({
  clock: operatorChangeInitiated,
  source: $editableNames,
  fn: (store) => store === undefined ? 0 : store?.length,
  target: $idName,
})

sample({
  clock: addedName,
  source: $idName,
  fn: (store) => store + 1,
  target: $idName,
})

sample({
  clock: addedName,
  source: {$idName, $editableNames},
  fn: ({$idName, $editableNames}) => [...$editableNames, {name: '', tempId: $idName}],
  target: $editableNames,
})
// возможно это решение:
// https://bobbyhadz.com/blog/typescript-type-object-must-have-symbol-iterator-method
// https://bobbyhadz.com/blog/typescript-make-property-required



sample({
  clock: [pageMounted, deleteOperatorFx.done, createOperatorsFx.done],
  target: getOperatorsFx,
})

sample({
  clock: operatorDelete,
  target: deleteOperatorFx,
})

