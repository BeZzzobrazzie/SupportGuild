import { operatorModel } from "src/04_entities/operator";

export function EditOperator({id}: {id: string}) {
  function handleClick() {
    operatorModel.operatorChangeInitiated(id);
  }

  return (
    <button type="button" onClick={handleClick}>
      Edit
    </button>
  );
}
