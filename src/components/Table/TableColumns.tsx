import useColumnsHook from "@/hooks/useColumnsHook";
import useTableHooks from "@/hooks/useTableHooks";
import { Table, columnindextype } from "@/types";
import React from "react";

const TableColumns: React.FC<{ table: Table; isDragging: boolean }> = ({
  table,
  isDragging,
}) => {
  const { setEditTablehelper } = useTableHooks();
  const { setcolumnEditingHelper } = useColumnsHook();
  const getColumnicon = (type: columnindextype) => {
    switch (type) {
      case "primary":
        return "fa-key text-[#14b8a6]";
      case "none":
        return "";
      case "index":
        return "text-[#14b8a6] fa-neuter";
      case "unique":
        return "text-[#14b8a6] fa-snowflake";
    }
  };
  return table.columns?.map((col) => (
    <div
      key={col.columnIndex}
      onClick={(e) => {
        if (!isDragging) {
          e.preventDefault();
          e.stopPropagation();
          setEditTablehelper(table);
          setcolumnEditingHelper(table.tableIndex!, col);
        }
      }}
      className={` ${table.tableName} flex py-1 bg-[white] px-2 justify-between tablecolwrapper cursor-pointer items-center`}
    >
      <div className={`  ${table.tableName} flex justify-center items-center`}>
        <i
          className={`fa-solid text-[#b2b2b2] mt-[2px]  ${
            table.tableName
          } ${getColumnicon(col.columnIndexType!)} text-[10px]`}
        ></i>
        <p className={`text-sm ml-1  ${table.tableName} font-medium`}>
          {col.columnName}
        </p>
      </div>
      <p className={`text-sm font-normal ${table.tableName}  text-[#b2b2b2]`}>
        {col.columnDataType}
        {col.isNullable ? "?" : ""}
      </p>
    </div>
  ));
};

export default TableColumns;
