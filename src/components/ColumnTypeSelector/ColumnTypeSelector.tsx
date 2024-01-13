import React, { useEffect, useState } from "react";
import CustomSelector from "./CustomSelector";
import { columnTypeoptions } from "@/Constants";
import { Table, columns, columntype } from "@/types";
import "./selector.scss";
import useColumnsHook from "@/hooks/useColumnsHook";

const ColumnTypeSelector: React.FC<{
  close: () => void;
  table: Table;
  column: columns;
  
}> = ({ close, table, column }) => {
  const { UpdateColumn } = useColumnsHook();
  const [ColumnType, setColumnType] = useState<columntype>("bigint");

  const onDropdownselect = (value: columntype) => {
    UpdateColumn(table.tableIndex!, { ...column, columnDataType: value });
    setColumnType(value);
    close();
  };
  useEffect(() => {
      if(column.columnDataType){
        setColumnType(column.columnDataType)
      }
  }, [column.columnDataType])
  
  return (
    <CustomSelector
      searchable
      selectedvalue={ColumnType}
      defaultValue="bigint"
      onDropdownSelect={onDropdownselect}
      options={columnTypeoptions}
    />
  );
};

export default ColumnTypeSelector;
