import { Box } from "@mantine/core";
import { useStore } from "effector-react";
import { contextMenuModel } from "..";
import classes from "./classes.module.css";
import { useEffect, useRef } from "react";

export function ContextMenu() {
  const CMVisibility = useStore(contextMenuModel.$contextMenuVisibility);

  const CMRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (CMRef.current) CMRef.current.focus();
  }, []);

  const CMCoordinates = useStore(contextMenuModel.$contextMenuCoordinates);
  const target = useStore(contextMenuModel.$contextMenuTarget);
  console.log(target);
  const options = {
    dir: [
      {
        name: "dirOne",
      },
      { 
        name: "dirTwo" 
      },
    ],
    file: [
      {
        name: "fileOne",
      },
    ],
  };

  return (
    <>
      {CMVisibility && (
        <Box
          onBlur={() => contextMenuModel.hideContextMenu()}
          ref={CMRef}
          tabIndex={0}
          className={classes["context-menu"]}
          style={{
            top: CMCoordinates.y,
            left: CMCoordinates.x,
          }}
        >
          123
        </Box>
      )}
    </>
  );
}

function MenuOption() {
  function handleClick() {}

  const optionName = "TestOptionName";

  return (
    <div className={classes["menu-option"]} onClick={handleClick}>
      <div className={classes["menu-option__name"]}>{optionName}</div>
    </div>
  );
}
