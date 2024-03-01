import useColumnsHook from "@/hooks/useColumnsHook";
import useTableHooks from "@/hooks/useTableHooks";
import { Table, columnindextype, relationtype } from "@/types";
import React from "react";
import ConnectPointsWrapper from "./ConnectPointsWrapper";
import { addRelation } from "@/redux/dashboardstore/reducer/relations/relationSlice";
import { useAppDispatch } from "@/redux/dashboardstore/hook";
import { getColumnId } from "@/utils";

const TableColumns: React.FC<{
  table: Table;
  isDragging: boolean;
  boxRef: any;
  dragRef: any;
  boxId: string;
}> = ({ table, isDragging, boxRef, dragRef, boxId }) => {
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
  const dispatch = useAppDispatch();
  const addArrow = ({ head, tail, tablefrom }: relationtype) => {
    dispatch(addRelation({ head, tail, tablefrom }));
  };
  return table.columns?.map((col) => (
    <div
      id={getColumnId(table.tableName, col.columnName)}
      key={col.columnIndex}
      onClick={(e) => {
        if (!isDragging) {
          e.preventDefault();
          e.stopPropagation();
          setEditTablehelper(table);
          setcolumnEditingHelper(table.tableIndex!, col);
        }
      }}
      onDrop={(e) => {
        if (
          e.dataTransfer.getData("arrow") ===
          getColumnId(table.tableName, col.columnName)
        ) {
          console.log(
            e.dataTransfer.getData("arrow"),
            getColumnId(table.tableName, col.columnName)
          );
        } else {
          const refs: relationtype = {
            head: e.dataTransfer.getData("arrow"),
            tail: getColumnId(table.tableName, col.columnName),
            tablefrom: e.dataTransfer.getData("arrow").split("^^")[0],
          };
          addArrow(refs);
          console.log("droped!", refs);
        }
      }}
      className={` ${table.tableName} flex py-1 bg-[white] px-2 relative justify-between tablecolwrapper cursor-pointer items-center`}
    >
      <div className={`${table.tableName} flex justify-center items-center`}>
        <i
          className={`fa-solid  mt-[2px]  ${table.tableName} ${getColumnicon(
            col.columnIndexType!
          )} text-[10px]`}
        ></i>
        <p className={`text-sm ml-1  mr-3 ${table.tableName} font-medium`}>
          {col.columnName}
        </p>
      </div>
      <p className={`text-sm font-normal ${table.tableName}  text-[#b2b2b2]`}>
        {col.columnDataType}
        {col.isNullable ? "?" : ""}
      </p>
      {table.isEditing && (
        <>
          <ConnectPointsWrapper
            {...{
              boxId: getColumnId(table.tableName, col.columnName),
              handler: "right",
              dragRef,
              boxRef,
            }}
          />
          <ConnectPointsWrapper
            {...{
              boxId: getColumnId(table.tableName, col.columnName),
              handler: "left",
              dragRef,
              boxRef,
            }}
          />
        </>
      )}
    </div>
  ));
};

export default TableColumns;
