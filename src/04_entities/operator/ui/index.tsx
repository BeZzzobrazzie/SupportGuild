import { useStore, useStoreMap } from "effector-react";
import classes from "./classes.module.css";
import { $editableNames, $editablePrefix, $idEditableOperator, $operators } from "../model";
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

  if(editable) console.log(editableNames);

  return (
    <Box component={editable ? "form" : "div"} className={classes["operator"]}>
      <Group gap="md">
        <TextInput
          size="xs"
          placeholder="prefix"
          value={editable ? editablePrefix : operator?.prefix}
          onChange={(event) =>
            operatorModel.changedEditablePrefix(event.target.value)
          }
          disabled={!editable}
        />
        <Names operator={operator} editable={editable} />
      </Group>

      {editable ? (
        <ActionIcon.Group className={classes["operator__command-palete"]}>
          <SaveOperator id={id} />
          <ResetOperator />
        </ActionIcon.Group>
      ) : (
        <ActionIcon.Group className={classes["operator__command-palete"]}>
          <EditOperator id={id} />
          <DeleteOperator id={id} />
        </ActionIcon.Group>
      )}
    </Box>
  );
}

function Names({
  operator,
  editable,
}: {
  operator?: sharedTypes.Operator;
  editable: boolean;
}) {
  const names = operator?.names;

  function handleChange() {}

  const listNames = names?.map(({ id, name }) => (
    <TextInput
      size="xs"
      key={id}
      value={name}
      onChange={handleChange}
      disabled={!editable}
      rightSection={editable ? <DeleteName id={id} /> : <></>}
    />
  ));
  return (
    <Group gap="xs">
      {listNames} {editable ? <AddName /> : <></>}
    </Group>
  );
}
