import { Button } from "@mantine/core";
import { showOperatorCreationFormModel } from "..";

export function ShowOperatorCreationForm() {
  function handleClick() {
    showOperatorCreationFormModel.formShown();
  }
  return <Button onClick={handleClick}>Add an operator</Button>;
}
