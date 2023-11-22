import axios from "axios";

// const host = axios.create({
//   baseURL: "http://localhost:31299",
//   timeout: 1000,
// });

const host = axios.create({
  baseURL: "http://localhost:3001",
  // timeout: 1000,
});

export const getOperators = async () => {
  //await new Promise(resolve => setTimeout(resolve, 1000));
  const response = await host.get('api/operators', {});
  const {data} = response;
  return data;
}

export const deleteOperator = async (id: string) => {
  const response = await host.delete(`api/operators/${id}`);
  return response;
}