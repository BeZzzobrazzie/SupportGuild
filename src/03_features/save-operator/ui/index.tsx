import { operatorModel } from "src/04_entities/operator";
import { ActionIcon } from "@mantine/core";
import { IconCheck } from '@tabler/icons-react';
import styles from "./styles.module.css";

export function SaveOperator({ id }: { id: string }) {
  function handleClick() {
  }

  return (
    <ActionIcon onClick={handleClick} variant="default" size="lg">
      <IconCheck />
    </ActionIcon>
  );
}