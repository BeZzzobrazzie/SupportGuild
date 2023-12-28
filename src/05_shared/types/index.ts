


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

export interface rootType {
  childIds: number[],
};
export interface exUnitsStoreType {
  id: number,
  title: string,
  role: string,
  childIds: number[],
  opened?: boolean,
};


export * as sharedTypes from './';