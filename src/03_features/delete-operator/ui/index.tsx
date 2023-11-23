import { operatorModel } from "src/04_entities/operator";
import { ActionIcon, rem } from '@mantine/core';
import { IconSquareX } from '@tabler/icons-react';

export function DeleteOperator({id}: {id: string}) {
  function handleClick() {
    operatorModel.operatorDelete(id);
  }

  return (
    <ActionIcon onClick={handleClick} variant="default" size="lg">
      <IconSquareX />
    </ActionIcon>
  );
}