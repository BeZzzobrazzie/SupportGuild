import axios from "axios";
import { sharedTypes } from "../types";

// const host = axios.create({
//   baseURL: "http://localhost:31299",
//   timeout: 1000,
// });

const host = axios.create({
  baseURL: "http://localhost:3001",
  // timeout: 1000,
});

export const getOperators = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const response = await host.get("api/operators", {});
  const { data } = response;
  return data;
};

export const createOperator = async ({ prefix, names }: {prefix: string, names: sharedTypes.Name[]}) => {
  const response = await host.post("api/operators", { prefix, names });
  return response;
};

export const updateOperator = async ({ id, prefix, names }: {id: number, prefix: string, names: sharedTypes.Name[]}) => {
  const response = await host.put(`api/operators/${id}`, { id, prefix, names });
  return response;
};

export const deleteOperator = async (id: number) => {
  const response = await host.delete(`api/operators/${id}`);
  return response;
};
