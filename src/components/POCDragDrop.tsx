"use client";
import { Table } from "@/types";
import React from "react";
import TableBox from "./Table/TableBox";
import { useAppDispatch } from "@/redux/dashboardstore/hook";
import { updateRelation } from "@/redux/dashboardstore/reducer/relations/relationSlice";

const POCDragDrop: React.FC<{ tables: Table[] }> = ({ tables }) => {
  const dispatch = useAppDispatch();

  const setArrows = () => [dispatch(updateRelation())];
  return (
    <div>
      {tables?.map((table) => (
        <TableBox
          key={table.tableIndex}
          table={table}
          text={table.tableName}
          {...{ setArrows, boxId: table.tableName }}
        />
      ))}
    </div>
  );
};

export default POCDragDrop;
