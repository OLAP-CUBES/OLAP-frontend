import { Field } from './table-query';

export interface DataStructure {
  facts: string[];
  fields: DataField[];
}

export interface DataField extends Field {
  humanReadableName: string;
}
