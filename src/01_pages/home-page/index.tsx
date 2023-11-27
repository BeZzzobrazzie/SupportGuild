import { useEvent, useList, useStore } from "effector-react";
import { useEffect } from "react";
import { OperatorCreationForm } from "src/02_widgets/operator-creation-form";
import { Operator, operatorModel } from "src/04_entities/operator";
import {
  ShowOperatorCreationForm,
  showOperatorCreationFormModel,
} from "src/03_features/show-operator-creation-form";
import { SortingSelection, SortingSelectionModel } from "src/04_entities/sorting-selection";
import { Box } from "@mantine/core";

export function HomePage() {
  const handlePageMount = useEvent(operatorModel.pageMounted);

  useEffect(() => {
    handlePageMount();
  }, [handlePageMount]);

  const listOp = useList(operatorModel.$sortedOperators, (operator) => (
    <Operator id={operator.id} />
  ));

  const showForm = useStore(showOperatorCreationFormModel.$showForm);
  return (
    <div className="home-page">
      <Box display="flex">
        <SortingSelection />
        {showForm ? <></> : <ShowOperatorCreationForm />}
      </Box>
      {showForm ? <OperatorCreationForm /> : <></>}
      {listOp}
    </div>
  );
}


