import { operatorModel } from "src/04_entities/operator";
import { ActionIcon } from "@mantine/core";
import { IconCheck } from '@tabler/icons-react';
import styles from "./styles.module.css";

export function CreateOperator() {
  function handleClick() {
    operatorModel.operatorCreated();
  }

  return (
    <ActionIcon onClick={handleClick} variant="default" size="md">
      <IconCheck />
    </ActionIcon>
  );
}
