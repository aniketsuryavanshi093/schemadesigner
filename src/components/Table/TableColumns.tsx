import useColumnsHook from "@/hooks/useColumnsHook";
import useTableHooks from "@/hooks/useTableHooks";
import { Table } from "@/types";
import React from "react";

const TableColumns: React.FC<{ table: Table }> = ({ table }) => {
  const { setEditTablehelper } = useTableHooks();
  const { setcolumnEditingHelper } = useColumnsHook();
  return table.columns?.map((col) => (
    <div
      key={col.columnIndex}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setEditTablehelper(table);
        setcolumnEditingHelper(table.tableIndex!, col);
      }}
      className="flex py-1 bg-[white] px-2 justify-between tablecolwrapper cursor-pointer items-center"
    >
      <div className="flex justify-center items-center">
        <i className="fa-solid text-[#b2b2b2] mt-[2px] fa-key text-[10px]"></i>
        <p className="text-sm ml-1 font-medium">{col.columnName}</p>
      </div>
      <p className="text-sm font-normal text-[#b2b2b2]">{col.columnDataType}</p>
    </div>
  ));
};

export default TableColumns;
