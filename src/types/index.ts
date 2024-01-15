export type columntype =
  | "bigint"
  | "boolean"
  | "varchar"
  | "char"
  | "int"
  | "flaot(8,2)"
  | "decimal(8,2)"
  | "date"
  | "datetime"
  | "enum";
export type columnindextype = "primary" | "unique" | "none" | "index";
export interface columns {
  columnName: string;
  isEditing?: boolean;
  columnIndex?: number;
  columnIndexType?: columnindextype;
  isNullable?: boolean;
  columnDataType?: columntype;
}

export interface Table {
  tableColor?: string;
  isEditing: boolean;
  isTableOpen?: boolean;
  tableName: string;
  columns?: columns[];
  tableComment?: string;
  tableIndex?: string;
  tablePosition: {
    x: number;
    y: number;
  };
}
