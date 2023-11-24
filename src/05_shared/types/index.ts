


export type OperatorProps = {
  id: string;
};

export type Operator = {
  id: string;
  prefix: string;
  names: Name[];
}

export interface Name {
  id: number;
  name: string;
  tempId?: number;
}


export * as sharedTypes from './';