import { operatorModel } from "src/04_entities/operator";
import { ActionIcon } from "@mantine/core";
import { IconCheck } from '@tabler/icons-react';
import styles from "./styles.module.css";

export function SaveOperator({ id }: { id: number }) {
  function handleClick() {
    operatorModel.operatorChangeSaved(id);
  }

  return (
    <ActionIcon onClick={handleClick} variant="default" size="md">
      <IconCheck />
    </ActionIcon>
  );
}
