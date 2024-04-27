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
export type columnrelationtype = "onetoone" | "onetomany" | "manytomamy";
export interface columns {
  columnName: string;
  isEditing?: boolean;
  columnIndex?: number;
  columnIndexType?: columnindextype;
  isNullable?: boolean;
  columnDataType?: columntype;
  comment?: string;
}

export interface Table {
  tableColor?: string;
  isEditing: boolean;
  isTableOpen?: boolean;
  isCommentOpen?: boolean;
  tableName: string;
  columns?: columns[];
  tableComment?: string;
  tableIndex?: string;
}

export type relationtype = {
  head: string;
  tail: string;
  id: string;
  tablefrom: string;
  tableto: string;
  relation: columnrelationtype;
};

export type FormSignupvalueType = {
  profilePic?: string;
  isGoogleLogin?: boolean;
  name?: string;
  cpassword?: string;
  email?: string;
  password?: string;
};

export type errorType = "success" | "error";

export type SchemaType = {
  title: string;
  user: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  tablesdata: string | Table;
  tablesrelations: string | relationtype;
};

export type FolderType = {
  name: string;
  _id: string;
  schemaIds: SchemaType[];
  createdAt: string;
};

export type UserType = {
  _id: string;
  schemaIds: SchemaType[];
  createdAt: string;
  name: string;
  folder: FolderType[];
  profilePic: string;
  email: string;
  updatedAt: string;
};
