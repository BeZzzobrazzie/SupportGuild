


export type OperatorProps = {
  id: string;
};

export type Operator = {
  id: string;
  prefix: string;
  names: Name[];
}

export interface Name {
  id: string;
  name: string;
}


export * as sharedTypes from './';