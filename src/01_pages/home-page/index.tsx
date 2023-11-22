import { useEvent, useList } from "effector-react";
import { useEffect } from "react";
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
      {listOp}
    </div>
  );
}
