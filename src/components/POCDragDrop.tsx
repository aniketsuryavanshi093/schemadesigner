"use client";
import { Table } from "@/types";
import React, { useState } from "react";
import Xarrow from "react-xarrows";
import TableBox from "./Table/TableBox";
import { useAppDispatch } from "@/redux/dashboardstore/hook";
import { addRelation, updateRelation } from "@/redux/dashboardstore/reducer/relations/relationSlice";

const POCDragDrop: React.FC<{ tables: Table[] }> = ({ tables }) => {
  const dispatch = useAppDispatch()

  const addArrow = ({ start, end }) => {
    dispatch(addRelation({ head: start, tail: end }));
  };
  const setArrows = () => [
    dispatch(updateRelation())
  ]
  return (
    <div>
      {tables?.map((table) => (
        <TableBox
          key={table.tableIndex}
          table={table}
          text={table.tableName}
          {...{ addArrow, setArrows, handler: "right", boxId: table.tableName }}
        />
      ))}

    </div>
  );
};

export default POCDragDrop;
