import { Container, Box } from "@mantine/core";
import {
  IconChevronDown,
  IconChevronRight,
  IconFolderFilled,
  IconFile,
} from "@tabler/icons-react";
import classes from "./classes.module.css";
import { ReactNode, useEffect } from "react";
import { useEvent, useStore, useStoreMap } from "effector-react";
import { $exUnits, $pending, $root, pageMounted } from "./model";
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

// function Explorer() {
//   let nestingLevel = 0;
//   function renderExUnits(childIds: number[]): ReactNode {
    
//     return childIds.map((item) => {
//       const elem = exUnits.find((unit) => unit.id === item);
//       if (elem === undefined) return <></>;
//       const children = elem.childIds;
//       nestingLevel = nestingLevel + 1;
//       const renderNestingLevel = nestingLevel;
//       const result = renderExUnits(children);
//       nestingLevel = nestingLevel - 1;
//       return (
//         <ExUnit key={elem.id} unit={elem} content={result} nestingLevel={renderNestingLevel} />
//       );
//     });
//   }

//   const root = useStore($root);
//   const exUnits = useStore($exUnits);

//   const result = renderExUnits(root.childIds);

//   return (
//     <>
//       <PopUp>
//         Error!!!
//         <button onClick={() => popUpModel.popUpHidden()}>Close</button>
//       </PopUp>
//       <Box className={classes["explorer"]}>{result}</Box>
//     </>
//   );
// }

// function ExUnit({
//   unit,
//   content,
//   nestingLevel,
// }: {
//   unit: exUnitsStoreType;
//   content: ReactNode;
//   nestingLevel: number;
// }) {
//   const indent = [];
//   for (let i = 0; i < nestingLevel; i++) {
//     indent.push(<Box className={classes["ex-unit__indent"]}></Box>);
//   }

//   if (unit.role === "dir") {
//     return (
//       <Box className={classes["ex-unit"]}>
//         <Box className={classes["ex-unit__label-panel"]}>
//           {indent}
//           <IconChevronRight />
//           <IconFolderFilled />
//           {unit.title}
//         </Box>
//         <Box>{content}</Box>
//       </Box>
//     );
//   } else if (unit.role === "file") {
//     return (
//       <Box className={classes["ex-unit"]}>
//         <Box className={classes["ex-unit__label-panel"]}>
//           {indent}
//           <IconFile />
//           {unit.title} {content}
//         </Box>
//       </Box>
//     );
//   }
// }


function Explorer() {


  const root = useStore($root);
  const result = [];
  for (let childId of root.childIds) {
    result.push(<ExUnit key={childId} id={childId} nestingLevel={0}/>);

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

function ExUnit({
  id,
  nestingLevel,
}: {
  id: number;
  nestingLevel: number;
}) {
  const indent = [];
  for (let i = 0; i < nestingLevel; i++) {
    indent.push(<Box key={i} className={classes["ex-unit__indent"]}></Box>);
  }

  const exUnit = useStoreMap({
    store: $exUnits,
    keys: [id],
    fn: (store, [unitId]) => store.find(({id}) => id === unitId),
  });

  const content = [];
  if (exUnit !== undefined) {
    for (let childId of exUnit.childIds) {
      content.push(<ExUnit key={childId} id={childId} nestingLevel={nestingLevel + 1}/>);
    }
  }


  if(exUnit === undefined) {

  }
  else if (exUnit.role === "dir") {
    return (
      <Box className={classes["ex-unit"]}>
        <Box className={classes["ex-unit__label-panel"]}>
          {indent}
          <IconChevronRight />
          <IconFolderFilled />
          {exUnit.title}
        </Box>
        <Box>{content}</Box>
      </Box>
    );
  } else if (exUnit.role === "file") {
    return (
      <Box className={classes["ex-unit"]}>
        <Box className={classes["ex-unit__label-panel"]}>
          {indent}
          <IconFile />
          {exUnit.title} {content}
        </Box>
      </Box>
    );
  }
}