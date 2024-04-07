"use client";
import { Table } from "@/types";
import React from "react";
import TableBox from "./Table/TableBox";

const POCDragDrop: React.FC<{ tables: Table[] }> = ({ tables }) => {
  return (
    <div>
      {tables?.map((table) => (
        <TableBox
          key={table.tableIndex}
          table={table}
          {...{ boxId: table.tableName }}
        />
      ))}
    </div>
  );
};

export default POCDragDrop;
