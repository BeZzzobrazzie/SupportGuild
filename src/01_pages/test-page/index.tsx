import { Container, Box } from "@mantine/core";
import classes from "./classes.module.css";
import { ReactNode, useEffect } from "react";
import { useEvent, useStore, useStoreMap } from "effector-react";
import { $exUnits, $pending, $root, pageMounted } from "./model";
import { PopUp, popUpModel } from "src/04_entities/pop-up";

interface ExplorerUnitProps {
  role: "root" | "dir" | "file";
  children: ReactNode;
}

interface RootProps {
  role: "root";
}

interface FileProps {
  role: "file";
}

interface DirPorps {
  role: "dir";
}

type UnitProps = RootProps | FileProps | DirPorps;

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
  function i(childIds: number[]): ReactNode {
    return childIds.map((item) => {
      const elem = exUnits.find((unit) => unit.id === item);
      if (elem === undefined) {
        return <div></div>;
      }
      const children = elem?.childIds;
      let result = i(children);

      return (
        <div>
          {elem?.title} {result}
        </div>
      );
    });
  }

  const root = useStore($root);
  console.log(root);
  const exUnits = useStore($exUnits);
  console.log(exUnits);

  const result = i(root.childIds);

  return (
    <>
      <PopUp>Error!!!
        <button onClick={() => popUpModel.popUpHidden()}>Close</button>
      </PopUp>
      <Box className={classes["explorer"]}>{result}</Box>
    </>
  );
}

function ExplorerUnit(obj: UnitProps) {
  const exUnits = useStore($exUnits);
  const id = 0;
  // const childIds = useStoreMap({
  //   store: $exUnits,
  //   keys: [id],
  //   fn: (store, [exUnitId]) => store.find(({id}) => id === exUnitId)?.childIds,
  // })

  // const unitChildren = useStoreMap({
  //   store: $exUnits,
  //   keys: [id],
  //   fn: (store, [exUnitId]) => {
  //     const childIds = store.find(({id}) => id === exUnitId)?.childIds;
  //     return store.map((unit) => childIds?.includes(unit.id));
  //   },
  // })

  const unitChildren = useStoreMap({
    store: $exUnits,
    keys: [id],
    fn: (store, [exUnitId]) => {
      const childIds = store.find(({ id }) => id === exUnitId)?.childIds;
      const result = store.map((unit) => {
        if (childIds?.includes(unit.id)) {
          return <p>{unit.id}</p>;
        }
      });
      return result;
    },
  });

  // const unitChildren:string[] = [];

  switch (obj.role) {
    case "root":
      return <>{unitChildren}</>;
    case "dir":
      return <>{unitChildren}</>;
    case "file":
      return <p>file</p>;
  }
}
