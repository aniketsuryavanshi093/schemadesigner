export interface columns {
    columnName: string
    isEditing?: boolean
    columnIndex?: number
    columnIndexType?: "primary" | "unique" | "none" | "index"
    columnDataType?: "bigint" | "boolean" | "varchar" | "char" | "int" | "flaot(8,2)" | "decimal(8,2)" | "date" | "datetime" | "enum"
}

export interface Table {
    tableColor?: string
    isEditing: boolean
    isTableOpen?: boolean
    tableName: string
    columns?: columns[]
    tableComment?: string
    tableIndex?: string
}