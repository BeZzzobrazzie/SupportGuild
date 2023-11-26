import { operatorModel } from "src/04_entities/operator";
import { ActionIcon } from "@mantine/core";
import { IconCheck } from '@tabler/icons-react';
import styles from "./styles.module.css";

export function SaveOperator({ id, pending}: { id: number, pending: boolean}) {
  function handleClick() {
    operatorModel.operatorChangeSaved(id);
  }

  return (
    <ActionIcon onClick={handleClick} loading={pending} variant="default" size="md">
      <IconCheck />
    </ActionIcon>
  );
}
