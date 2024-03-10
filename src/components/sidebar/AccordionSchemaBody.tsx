/* eslint-disable react/jsx-key */
"use client";
import { Table, columns } from "@/types";
import { Button, TableColumn, Tooltip } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import PopoverComponent from "../Popover/PopoverComponent";
import ThreeDotBtn from "./ThreeDotBtn";
import useColumnsHook from "@/hooks/useColumnsHook";
import { useAppDispatch } from "@/redux/dashboardstore/hook";
import useTableHooks from "@/hooks/useTableHooks";
import { setUpdatedColors } from "@/redux/dashboardstore/reducer/colors/colorSlice";
import ColumnTypeSelector from "../ColumnTypeSelector/ColumnTypeSelector";
import ColumnIndexTypeSelector from "./ColumnIndexTypeSelector";
import { tablecolors } from "@/Constants";
import ColumnSettingsPopover from "./ColumnSettingsPopover";
import TableComments from "./SidebarComponents/TableComments";

const AccordionSchemaBody: React.FC<{ table: Table }> = ({ table }) => {
  const { addColumns, UpdateColumn } = useColumnsHook();
  const { updateSaveTablehelper } = useTableHooks();
  const dispatch = useAppDispatch();
  const handleColorChange = (elm: string) => {
    if (elm === table.tableColor) {
      return;
    }
    updateSaveTablehelper({
      ...table,
      tableColor: elm,
    });
    dispatch(
      setUpdatedColors({ currentcolor: table.tableColor!, newcolor: elm })
    );
  };
  const content = (
    <div className="py-2 w-[180px]  h-[auto] gap-2 justify-center items-center flex flex-wrap">
      {tablecolors.map((elm) => (
        <div
          onClick={() => handleColorChange(elm)}
          key={elm}
          className={`w-9 relative cursor-pointer ${
            elm === table.tableColor && "opacity-90"
          } cursor-pointer h-9 rounded-lg bg-[${elm}] `}
          style={{ background: elm }}
        >
          {elm === table.tableColor && (
            <i className="fa-solid text-center fa-check absolute checkedcolor"></i>
          )}
        </div>
      ))}
    </div>
  );
  const handleColumnadd = () => {
    addColumns(table, false);
  };
  const handleNullable = (column: columns) => {
    UpdateColumn(table.tableIndex!, {
      ...column,
      isNullable: !column.isNullable,
    });
  };
  return (
    <div className="directionlefttoright">
      {table?.columns?.map((elem) => (
        <div
          key={elem.columnIndex}
          className="flex items-center gap-1 justify-between py-[5px]"
        >
          <AccordionBodyColumn
            table={table}
            tableIndex={table.tableIndex!}
            column={elem}
            isFocused={table?.columns?.length!}
          />
          <div className="w-[25%] flex items-center justify-center gap-[3px]">
            <Tooltip content="Nullable?">
              <Button
                onClick={() => handleNullable(elem)}
                variant="light"
                className={`py-1 ${
                  elem.isNullable && "text-[#14b8a6]"
                } rounded-sm w-full gap-0  min-w-6 h-[30px] `}
              >
                N
              </Button>
            </Tooltip>
            <ColumnIndexTypeSelector column={elem} table={table} />
            <ColumnSettingsPopover table={table} column={elem} />
          </div>
        </div>
      ))}
      <TableComments table={table} />
      <div className="border-t-small columnbottomwrapper w-full mt-[3px] flex items-center px-2 pt-[10px]  justify-between">
        <div className="flex items-center justify-center gap-2">
          <PopoverComponent
            classname="px-2 py-2"
            placement="bottom-start"
            content={content}
            trigger={
              <Button variant="ghost" className="w-6 gap-0 p-0 min-w-10 ">
                <i className="fa-solid fa-palette"></i>
              </Button>
            }
          />
          <ThreeDotBtn table={table} />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <Button variant="bordered" color="secondary">
            Add Index
          </Button>
          <Button onClick={handleColumnadd} variant="bordered" color="success">
            Add Column
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AccordionSchemaBody;

const AccordionBodyColumn: React.FC<{
  table: Table;
  column: columns;
  isFocused: number;
  tableIndex: string;
}> = ({ table, column, isFocused, tableIndex }) => {
  const inputref = useRef<React.LegacyRef<HTMLInputElement> | undefined>();
  const [ColumnTitle, setColumnTitle] = useState<string>("");
  const [open, setopen] = useState(false);
  const { handleSaveColumnTitle } = useColumnsHook();
  useEffect(() => {
    setColumnTitle(column.columnName);
    if (column.isEditing) {
      inputref?.current?.focus();
    }
  }, [column, isFocused]);
  const handleSavecolumntitle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleSaveColumnTitle(tableIndex, column, ColumnTitle);
  };
  return (
    <div className="flex w-[75%]  items-center justify-center gap-2 ">
      <input
        ref={inputref}
        onBlur={handleSavecolumntitle}
        className="ps-2 columninput w-[60%] h-[1.7rem] rounded-md focus:outline-none focus:ring focus:ring-amber-700 "
        value={ColumnTitle}
        onChange={(e) => setColumnTitle(e.target.value)}
      />
      <PopoverComponent
        popoverOpen={open}
        setPopover={setopen}
        classname="px-2 py-2 columtypewrapper"
        placement="right-end"
        content={
          <ColumnTypeSelector
            column={column}
            table={table}
            close={() => setopen(false)}
          />
        }
        trigger={
          <input
            className="ps-2 columninput w-[40%]  rounded-md focus:outline-none  h-[1.7rem] focus:ring focus:ring-amber-700"
            value={column.columnDataType}
            onChange={(e) => setColumnTitle(e.target.value)}
          />
        }
      ></PopoverComponent>
    </div>
  );
};
