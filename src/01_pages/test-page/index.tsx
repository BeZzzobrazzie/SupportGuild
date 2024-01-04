import { Container, Box } from "@mantine/core";
import {
  IconChevronDown,
  IconChevronRight,
  IconFolderFilled,
  IconFile,
} from "@tabler/icons-react";
import classes from "./classes.module.css";
import { ReactNode, useEffect, useState } from "react";
import { useEvent, useStore, useStoreMap } from "effector-react";
import {
  $exUnits,
  $pending,
  $root,
  dirVisibilitySwitched,
  pageMounted,
} from "./model";
import { PopUp, popUpModel } from "src/04_entities/pop-up";
import { exUnitsStoreType } from "src/05_shared/types";

export function TestPage() {
  const handlePageMount = useEvent(pageMounted);

  useEffect(() => {
    handlePageMount();
  }, []);

  return (
    <Container size="xs" mt="150">
      <Explorer />
    </Container>
  );
}

function Explorer() {
  const root = useStore($root);
  const result = [];
  for (let childId of root.childIds) {
    result.push(<ExUnit key={childId} id={childId} nestingLevel={0} />);
  }

  return (
    <>
      <PopUp>
        Error!!!
        <button onClick={() => popUpModel.popUpHidden()}>Close</button>
      </PopUp>
      <Box className={classes["explorer"]}>{result}</Box>
    </>
  );
}

function ExUnit({ id, nestingLevel }: { id: number; nestingLevel: number }) {
  const indent = [];
  for (let i = 0; i < nestingLevel; i++) {
    indent.push(<Box key={i} className={classes["ex-unit__indent"]}></Box>);
  }

  const [exUnit, dirOpened] = useStoreMap({
    store: $exUnits,
    keys: [id],
    fn: (store, [unitId]) => {
      const unit = store.find(({ id }) => id === unitId);
      const opened = unit?.opened;
      return [unit, opened];
    },
  });

  const content = [];
  if (exUnit !== undefined) {
    for (let childId of exUnit.childIds) {
      content.push(
        <ExUnit key={childId} id={childId} nestingLevel={nestingLevel + 1} />
      );
    }
  }

  if (exUnit === undefined) {
  } else if (exUnit.role === "dir") {
    return (
      <Box className={classes["ex-unit"]}>
        <Box
          className={classes["ex-unit__label-panel"]}
          onClick={() => dirVisibilitySwitched(id)}
          data-role={exUnit.role}
          data-id={exUnit.id}
        >
          {indent}
          {dirOpened ? <IconChevronDown /> : <IconChevronRight />}
          <IconFolderFilled />
          <Box className={classes["ex-unit__title"]}>{exUnit.title}</Box>
        </Box>
        {dirOpened ? <Box>{content}</Box> : <></>}
      </Box>
    );
  } else if (exUnit.role === "file") {
    return (
      <Box
        className={classes["ex-unit"]}
        data-role={exUnit.role}
        data-id={exUnit.id}
      >
        <Box className={classes["ex-unit__label-panel"]}>
          {indent}
          <Box className={classes["ex-unit__file-indent"]}></Box>
          <IconFile />
          <Box className={classes["ex-unit__title"]}>{exUnit.title}</Box>
        </Box>
      </Box>
    );
  }
}
