import { operatorModel } from "src/04_entities/operator";
import { ActionIcon, rem } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

export function DeleteOperator({id}: {id: number}) {
  function handleClick() {
    operatorModel.operatorDelete(id);
  }

  return (
    <ActionIcon onClick={handleClick} variant="default" size="md">
      <IconX />
    </ActionIcon>
  );
}
