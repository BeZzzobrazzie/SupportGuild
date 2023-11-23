import { operatorModel } from "src/04_entities/operator";
import { ActionIcon } from "@mantine/core";
import { IconPlus  } from '@tabler/icons-react';
import styles from "./styles.module.css";

export function AddName() {
  function handleClick() {
  }

  return (
    <ActionIcon onClick={handleClick} variant="default" size="md">
      <IconPlus />
    </ActionIcon>
  );
}
