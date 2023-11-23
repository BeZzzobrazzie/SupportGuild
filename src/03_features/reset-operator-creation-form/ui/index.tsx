import { operatorModel } from "src/04_entities/operator";
import { IconArrowBackUp } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";
import { showOperatorCreationFormModel } from "src/03_features/show-operator-creation-form";

export function ResetOperatorCreationForm() {
  function handleClick() {
    showOperatorCreationFormModel.formHidden();
  }

  return (
    <ActionIcon onClick={handleClick} variant="default" size="md">
      <IconArrowBackUp />
    </ActionIcon>
  );
}
