import { useEvent, useList, useStore } from "effector-react";
import { useEffect } from "react";
import { OperatorCreationForm } from "src/02_widgets/operator-creation-form";
import { Operator, operatorModel } from "src/04_entities/operator";
import {
  ShowOperatorCreationForm,
  showOperatorCreationFormModel,
} from "src/03_features/show-operator-creation-form";
import { SortingSelection } from "src/04_entities/sorting-selection";

export function HomePage() {
  const handlePageMount = useEvent(operatorModel.pageMounted);

  useEffect(() => {
    handlePageMount();
  }, [handlePageMount]);

  const listOp = useList(operatorModel.$operators, (operator) => (
    <Operator id={operator.id} />
  ));

  const showForm = useStore(showOperatorCreationFormModel.$showForm);

  return (
    <div className="home-page">
      <SortingSelection />
      {showForm ? <OperatorCreationForm /> : <ShowOperatorCreationForm />}
      {listOp}
    </div>
  );
}
