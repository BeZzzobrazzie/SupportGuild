import { operatorModel } from "src/04_entities/operator";
import { IconArrowBackUp } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";

export function ResetOperator({ pending }: { pending: boolean }) {
  function handleClick() {
    operatorModel.resetChanges();
  }

  return (
    <ActionIcon onClick={handleClick} loading={pending} variant="default" size="md">
      <IconArrowBackUp />
    </ActionIcon>
  );
}
