import { operatorModel } from "src/04_entities/operator";
import { ActionIcon } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import styles from "./styles.module.css";

export function EditOperator({ id }: { id: string }) {
  function handleClick() {
    operatorModel.operatorChangeInitiated(id);
  }

  return (
    <ActionIcon onClick={handleClick} variant="default" size="md">
      <IconEdit />
    </ActionIcon>
  );
}
