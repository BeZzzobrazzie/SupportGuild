import { useEvent, useList } from "effector-react";
import { useEffect } from "react";
import { OperatorCreationForm } from "src/02_widgets/operator-creation-form";
import { Operator, operatorModel } from "src/04_entities/operator";

export function HomePage() {
  const handlePageMount = useEvent(operatorModel.pageMounted);

  useEffect(() => {
    handlePageMount();
  }, [handlePageMount]);

  const listOp = useList(operatorModel.$operators, (operator) => (
    <>
      <Operator id={operator.id}/>
    </>
  ));

  return (
    <div className="home-page">
      <OperatorCreationForm />
      {listOp}
    </div>
  );
}
