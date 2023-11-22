// /** @type {import('mock-config-server').MockServerConfig} */

import type { MockServerConfig } from "mock-config-server";

export const mockServerConfig: MockServerConfig = {
  rest: {
    baseUrl: "/api",
    configs: [
      {
        path: "/user",
        method: "get",
        routes: [
          {
            data: {error: "unvalid data"},
            interceptors: {
              response: (data, {setStatusCode}) => {
                setStatusCode(400);
                return data;
              },
            },
          },
          {
            data: { emoji: "🦁", name: "Nursultan12" },
          },
        ],
      },
    ],
  },
  database: {
    data: {
      operators: [
        {
          id: 1,
          prefix: "3AB",
          names: [
            {
              id: 1,
              name: "abc",
            },
            {
              id: 2,
              name: "bcd",
            },
          ],
        },
        {
          id: 2,
          prefix: "3BC",
          names: [
            {
              id: 1,
              name: "xyz",
            },
          ],
        },
      ],
    },
    routes: {
      "/api/operators": "/operators",
    },
  },
};
