export interface TableQuery {
  definition: Definition;
  query: Query;
}

export interface Definition {
  fact: string;
  fields: Field[];
}

export interface Field {
  fieldName: string;
  valueName: string;
}

export interface Query {
  x: string;
  y: string;
  z: string;
  operation: Operation;
}

export interface Operation {
  field: string;
  value: string;
  aggregator: string;
}
