import { operatorModel } from "src/04_entities/operator";

export function ResetOperator() {
  function handleClick() {
    operatorModel.operatorChangeCompleted();
  }

  return (
    <button type="button" onClick={handleClick}>
      Reset
    </button>
  );
}
