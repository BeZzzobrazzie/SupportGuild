import { Container, Box } from "@mantine/core";
import classes from "./classes.module.css";
import { ReactNode, useEffect } from "react";
import {useEvent, useStore, useStoreMap} from "effector-react";
import { $exUnits, pageMounted } from "./model";

interface ExplorerUnitProps {
  role: "root" | "dir" | "file",
  children: ReactNode,
}

interface RootProps {
  role: "root",
  children: ReactNode,
}

interface FileProps {
  role: "file",
}

interface DirPorps {
  role: "dir",
  children: ReactNode,
}

type UnitProps = RootProps | FileProps | DirPorps;

export function TestPage() {

  const handlePageMount = useEvent(pageMounted);

  useEffect(() => {
    handlePageMount();
  }, [handlePageMount]);

  return (
    <Container size="xs" mt="150">
      <Box className={classes["explorer"]}>
        <ExplorerUnit role="root">

        </ExplorerUnit>
        {/* <ExplorerUnit role="dir" /> */}
        {/* <ExplorerUnit role="file" /> */}
      </Box>
    </Container>
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
      const childIds = store.find(({id}) => id === exUnitId)?.childIds;
      return store.map((unit) => {
        if (childIds?.includes(unit.id)) {
          return (<p>{unit.id}</p>);
        }
      });
    },
  })


  switch (obj.role) {
    case 'root':

      return (<>{unitChildren}</>);
    case 'dir':
      return (<>{unitChildren}</>);
    case 'file':
      return (<p>file</p>);
  }

}
