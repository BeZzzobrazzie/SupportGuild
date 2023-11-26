import { useStore, useStoreMap } from "effector-react";
import classes from "./classes.module.css";
import {
  $editableNames,
  $editablePrefix,
  $idEditableOperator,
  $operators,
  $pending,
} from "../model";
import { sharedTypes } from "src/05_shared/types";
import { operatorModel } from "..";
import { EditOperator } from "src/03_features/edit-operator";
import { ResetOperator } from "src/03_features/reset-operator";
import { DeleteOperator } from "src/03_features/delete-operator";
import { TextInput, Box, ActionIcon, Group } from "@mantine/core";
import { SaveOperator } from "src/03_features/save-operator";
import { AddName } from "src/03_features/add-name";
import { DeleteName } from "src/03_features/delete-name";

export function Operator({ id }: sharedTypes.OperatorProps) {
  const operator = useStoreMap({
    store: $operators,
    keys: [id],
    fn: (operators, [operatorId]) =>
      operators.find(({ id }) => id === operatorId),
  });
  const editable = id === useStore($idEditableOperator);
  const editablePrefix = useStore($editablePrefix);
  const editableNames = useStore($editableNames);
  const pending = useStore($pending);

  return (
    <Box component={editable ? "form" : "div"} className={classes["operator"]}>
      <Group gap="md">
        <TextInput
          classNames={{input: classes["operator__prefix"]}}
          size="xs"
          placeholder="prefix"
          value={editable ? editablePrefix : operator?.prefix}
          onChange={(event) =>
            operatorModel.changedEditablePrefix(event.target.value)
          }
          disabled={!editable || pending}
        />
        <Names
          names={editable ? editableNames : operator ? operator.names : []}
          editable={editable}
          pending={pending}
        />
      </Group>

      {editable ? (
        <ActionIcon.Group className={classes["operator__command-palete"]}>
          <SaveOperator id={id} pending={pending} />
          <ResetOperator pending={pending} />
        </ActionIcon.Group>
      ) : (
        <ActionIcon.Group className={classes["operator__command-palete"]}>
          <EditOperator id={id} pending={pending} />
          <DeleteOperator id={id} pending={pending} />
        </ActionIcon.Group>
      )}
    </Box>
  );
}

function Names({
  editable,
  pending,
  names,
}: {
  editable: boolean;
  pending: boolean;
  names: sharedTypes.Name[];
}) {
  function handleChange() {}

  const listNames = names?.map(({ id, name, tempId }) => {
    return (
      <TextInput
        size="xs"
        key={tempId ? tempId : id}
        value={name}
        onChange={
          tempId
            ? (event) =>
                operatorModel.changedEditableName({
                  tempId,
                  name: event.target.value,
                })
            : handleChange
        }
        disabled={!editable || pending}
        rightSection={editable && !pending && tempId ? <DeleteName id={tempId} /> : <></>}
      />
    );
  });
  return (
    <Group gap="xs">
      {listNames} {editable && !pending ? <AddName /> : <></>}
    </Group>
  );
}
