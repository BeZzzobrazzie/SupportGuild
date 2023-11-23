import { TextInput, Box, ActionIcon, Group } from "@mantine/core";
import classes from "./classes.module.css";
import { sharedTypes } from "src/05_shared/types";
import { ResetOperatorCreationForm } from "src/03_features/reset-operator-creation-form";
import { useStore } from "effector-react";
import { operatorModel } from "src/04_entities/operator";

export function OperatorCreationForm() {

  const editablePrefix = useStore(operatorModel.$editablePrefix);
  const editableNames = useStore(operatorModel.$editableNames);

  function handleChangePrefix(event: React.ChangeEvent<HTMLInputElement>) {
    operatorModel.changedEditablePrefix(event.target.value);
  }

  return (
    <Box component="form" className={classes["operator"]}>
      <Group gap="md">
        <TextInput size="xs" placeholder="prefix" value={editablePrefix} onChange={handleChangePrefix}/>
        <Names />
      </Group>

      <ActionIcon.Group className={classes["operator__command-palete"]}>
        {/* <SaveOperator id={id} />
        <ResetOperator /> */}
        <ResetOperatorCreationForm />
      </ActionIcon.Group>
    </Box>
  );
}

function Names() {
  const names = [{ id: 1, name: "test" }];

  function handleChange() {}

  const listNames = names?.map(({ id, name }) => (
    <TextInput size="xs" key={id} value={name} onChange={handleChange} />
  ));
  return (
    <Group gap="xs">
      {listNames}
      {/* {editable ? <AddName /> : <></>} */}
    </Group>
  );
}
