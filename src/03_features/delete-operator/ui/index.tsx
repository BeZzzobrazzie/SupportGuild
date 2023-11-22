import { operatorModel } from "src/04_entities/operator";

export function DeleteOperator({id}: {id: string}) {
  function handleClick() {
    operatorModel.operatorDelete(id);
  }

  return (
    <button type="button" onClick={handleClick}>
      Delete
    </button>
  );
}
