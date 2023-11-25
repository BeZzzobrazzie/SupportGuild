import { TextInput, Box, ActionIcon, Group } from "@mantine/core";
import classes from "./classes.module.css";
import { sharedTypes } from "src/05_shared/types";
import { ResetOperatorCreationForm } from "src/03_features/reset-operator-creation-form";
import { useStore } from "effector-react";
import { operatorModel } from "src/04_entities/operator";
import { AddName } from "src/03_features/add-name";
import { CreateOperator } from "src/03_features/create-operator";
import { NewAddName } from "src/03_features/new-add-name";
import { DeleteName } from "src/03_features/delete-name";

export function OperatorCreationForm() {
  const editablePrefix = useStore(operatorModel.$newEditablePrefix);
  const editableNames = useStore(operatorModel.$newEditableNames);

  function handleChangePrefix(event: React.ChangeEvent<HTMLInputElement>) {
    operatorModel.changedNewEditablePrefix(event.target.value);
  }

  return (
    <Box component="form" className={classes["operator"]}>
      <Group gap="md">
        <TextInput
          size="xs"
          placeholder="prefix"
          value={editablePrefix}
          onChange={handleChangePrefix}
        />
        <Names names={editableNames} />
      </Group>

      <ActionIcon.Group className={classes["operator__command-palete"]}>
        {/* <SaveOperator id={id} />
        <ResetOperator /> */}
        <CreateOperator />
        <ResetOperatorCreationForm />
      </ActionIcon.Group>
    </Box>
  );
}

function Names({ names }: { names?: sharedTypes.Name[] }) {

  const listNames = names?.map(({ id, name }) => {
    return (
      id && (
        <TextInput
          size="xs"
          key={id}
          value={name}
          onChange={(event) =>
            operatorModel.changedNewEditableName({
              id,
              name: event.target.value,
            })
          }
          rightSection={id && <DeleteName id={id} creationForm />}
        />
      )
    );
  });
  return (
    <Group gap="xs">
      {listNames}
      <NewAddName />
    </Group>
  );
}
