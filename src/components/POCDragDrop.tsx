"use client";
import { Table } from "@/types";
import React, { useState } from "react";
import Xarrow from "react-xarrows";
import TableBox from "./Table/TableBox";

const POCDragDrop: React.FC<{ tables: Table[] }> = ({ tables }) => {
  const [arrows, setArrows] = useState([]);
  const addArrow = ({ start, end }) => {
    setArrows([...arrows, { start, end }]);
  };
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
      {arrows.map((ar) => (
        <Xarrow
          onClick={() => console.log("clicked")}
          start={ar.start}
          end={ar.end}
          key={ar.start + "-." + ar.start}
        />
      ))}
    </div>
  );
};

export default POCDragDrop;
