import { useStore } from "effector-react";
import classes from "./styles.module.css";
import { popUpModel } from "..";
import { ReactNode } from "react";


export function PopUp({ children } : {children : ReactNode}) {
  const popUpVisibility = useStore(popUpModel.$popUpVisibility);

  return popUpVisibility ? (
    <div className={classes["pop-up__wrapper"]}>
      <div className={classes["pop-up__body"]}>{children}</div>
    </div>
  ) : (
    <></>
  );
}
