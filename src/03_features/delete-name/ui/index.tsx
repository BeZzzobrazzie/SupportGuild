import { operatorModel } from "src/04_entities/operator";
import { ActionIcon, rem } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

export function DeleteName({id, creationForm}: {id: number, creationForm?: boolean}) {
  function handleClick() {
    operatorModel.deletedName({id, creationForm});
  }


  return (
    <ActionIcon onClick={handleClick} variant="subtle" size="xs">
      <IconX />
    </ActionIcon>
  );
}
