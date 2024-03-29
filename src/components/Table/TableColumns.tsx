import useColumnsHook from "@/hooks/useColumnsHook";
import useTableHooks from "@/hooks/useTableHooks";
import { Table, columnindextype, relationtype } from "@/types";
import React from "react";
import ConnectPointsWrapper from "./ConnectPointsWrapper";
import { addRelation } from "@/redux/dashboardstore/reducer/relations/relationSlice";
import { useAppDispatch } from "@/redux/dashboardstore/hook";
import { getColumnId } from "@/utils";
import PopoverComponent from "../Popover/PopoverComponent";

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
        <p className={`text-sm ml-1  mr-1 ${table.tableName} font-medium`}>
          {col.columnName}
        </p>
        {col.comment && <ColumnComment comment={col.comment} />}
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

export const ColumnComment: React.FC<{ comment: string }> = ({ comment }) => {
  return (
    <PopoverComponent
      classname="px-3 py-2 columtypewrapper"
      placement="right-start"
      content={
        <div className="w-56   ">
          <p className="mb-1 text-sm font-bold uppercase text-gray-400">
            <i className="fa-regular fa-comment"></i> Column Comments
          </p>
          <p className="mb-1  text-xs font-thin  text-gray-400">{comment}</p>
        </div>
      }
      trigger={
        <i className="cursor-pointer hover:text-green-600 fa-regular fa-comment text-sm"></i>
      }
    />
  );
};
