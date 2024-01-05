import { Box } from "@mantine/core";
import { useStore } from "effector-react";
import { contextMenuModel } from "..";
import classes from "./classes.module.css";
import { useEffect, useRef } from "react";
import { deletedExUnit } from "src/01_pages/test-page/model";
import { Event } from "effector";

export function ContextMenu() {
  const CMVisibility = useStore(contextMenuModel.$contextMenuVisibility);

  const CMRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (CMRef.current) CMRef.current.focus();
  }, []);

  const CMCoordinates = useStore(contextMenuModel.$contextMenuCoordinates);
  const target = useStore(contextMenuModel.$contextMenuTarget);

  let role : string | null = null;
  let targetId : number = -1;
  if (target instanceof HTMLElement) {
    let parent = target.closest("[data-role]");
    if (parent instanceof HTMLElement) {
      if (parent.dataset.role === undefined) role = null;
      else role = parent.dataset.role;
      if (parent.dataset.id === undefined) targetId = -1;
      else targetId = parseInt(parent.dataset.id);
    }
  }


  let result : JSX.Element[] = [<MenuOption optionName="none" />];
  const dirOptions = [{name: "delete", func: deletedExUnit}];
  const fileOptions = ["4", "5", "6"];
  const noneOptions = ["none"];


  switch(role) {
    case 'dir':
      result = dirOptions.map((item) => <MenuOption optionName={item.name} func={item.func} id={targetId} />)
      break;
    case 'file':
      result = fileOptions.map((item) => <MenuOption optionName={item} />)
      break;
    default:
      result = noneOptions.map((item) => <MenuOption optionName={item} />)
      break;
    
  }




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
          {result}
        </Box>
      )}
    </>
  );
}

function MenuOption({optionName, func, id} : {optionName : string, func?: Event<number>, id?: number}) {
  function handleClick() {
    if(func && id) {
      func(id);
    }
  }

  return (
    <div className={classes["menu-option"]} onClick={handleClick}>
      <div className={classes["menu-option__name"]}>{optionName}</div>
    </div>
  );
}
