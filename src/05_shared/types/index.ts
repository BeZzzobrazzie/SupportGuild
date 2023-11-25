


export type OperatorProps = {
  id: number;
};

export type Operator = {
  id: number;
  prefix: string;
  names: Name[];
}

export interface Name {
  id?: number;
  name: string;
  tempId?: number;
}


export * as sharedTypes from './';