import React, { useEffect, useState } from "react";
import { Table, columns, columnindextype } from "@/types";
import "./selector.scss";
import useColumnsHook from "@/hooks/useColumnsHook";
import CustomSelector from "../ColumnTypeSelector/CustomSelector";

const ColumnIndexSelector: React.FC<{
  close: () => void;
  table: Table;
  column: columns;
}> = ({ close, table, column }) => {
  const { UpdateColumn } = useColumnsHook();
  const [ColumnIndexType, setColumnIndexType] =
    useState<columnindextype>("none");
  const columnindexTypeoptions = [
    {
      label: "Primary",
      value: "primary",
      icon: <i className="fa-solid mr-3  fa-key "></i>,
    },
    {
      label: "Unique",
      value: "unique",
      icon: <i className="fa-regular mr-3 fa-snowflake"></i>,
    },
    {
      label: "None",
      value: "none",
      icon: <i className="fa-regular mr-3 fa-circle"></i>,
    },
    {
      label: "Index",
      value: "index",
      icon: <i className="fa-solid mr-3 fa-neuter"></i>,
    },
  ];
  const onDropdownselect = (value: columnindextype) => {
    UpdateColumn(table.tableIndex!, { ...column, columnIndexType: value });
    setColumnIndexType(value);
    close();
  };
  useEffect(() => {
    if (column.columnIndexType) {
      setColumnIndexType(column?.columnIndexType!);
    }
  }, [column.columnIndexType]);
  console.log(ColumnIndexType);

  return (
    <CustomSelector
      // searchable
      title="Index Type"
      selectedvalue={ColumnIndexType}
      defaultValue="none"
      classname="min-w-[215px]"
      onDropdownSelect={onDropdownselect}
      options={columnindexTypeoptions}
    />
  );
};

export default ColumnIndexSelector;
