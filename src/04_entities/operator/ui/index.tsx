import { useStore, useStoreMap } from "effector-react";
import classes from "./classes.module.css";
import { $idEditableOperator, $operators } from "../model";
import { sharedTypes } from "src/05_shared/types";
import { operatorModel } from "..";
import { EditOperator } from "src/03_features/edit-operator";
import { ResetOperator } from "src/03_features/reset-operator";
import { DeleteOperator } from "src/03_features/delete-operator";
import { TextInput, Box } from "@mantine/core";

export function Operator({ id }: sharedTypes.OperatorProps) {
  const operator = useStoreMap({
    store: $operators,
    keys: [id],
    fn: (operators, [operatorId]) =>
      operators.find(({ id }) => id === operatorId),
  });
  const editable = id === useStore($idEditableOperator);

  return (
    <>
      {editable ? (
        <Box component="form" className={classes["operator"]}>
          <TextInput placeholder="prefix" value={operator?.prefix} />
          <Names operator={operator} editable={editable} />
          <button type="button">Add name</button>
          <button type="button">Save</button>
          <ResetOperator />
        </Box>
      ) : (
        <Box className={classes["operator"]}>
          {/* <Box className={classes["operator__prefix"]}>{operator?.prefix}</Box> */}
          <TextInput placeholder="prefix" className={classes["operator__prefix"]} value={operator?.prefix} disabled/>

          {/* <div className="operator__prefix">{operator?.prefix}</div> */}
          <Names operator={operator} editable={editable} />
          <EditOperator id={id} />
          <DeleteOperator id={id} />
        </Box>
      )}
    </>
  );
}

function Names({
  operator,
  editable,
}: {
  operator?: sharedTypes.Operator;
  editable: boolean;
}) {
  const names = operator?.names;

  function handleChange() {

  }

  const listNames = names?.map(({ id, name }) =>
    editable ? (
      <TextInput key={id} value={name} onChange={handleChange}/>
    ) : (
      <div key={id}>{name}</div>
    )
  );
  return listNames;
}
