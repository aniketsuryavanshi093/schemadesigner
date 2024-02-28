import { Table, columns } from "@/types";
import React from "react";
import PopoverComponent from "../Popover/PopoverComponent";
import { Button } from "@nextui-org/react";
import useColumnsHook from "@/hooks/useColumnsHook";

const ColumnSettingsPopover: React.FC<{
  table: Table;
  column: columns;
}> = ({ table, column }) => {
  const { deleteColumn } = useColumnsHook();
  const handleDeleteColumn = () => {
    deleteColumn(table.tableIndex!, column);
  };
  return (
    <PopoverComponent
      classname="px-2 py-2 columtypewrapper"
      placement="bottom-start"
      content={
        <div className="w-72  px-4 py-2">
          <p className="mb-1 text-md font-bold uppercase text-gray-400">
            Column Actions
          </p>
          <p className="mb-1 mt-3 text-xs font-bold uppercase text-gray-400">
            Comments <i className="fa-regular fa-comment"></i>
          </p>
          <textarea
            className="commenttextarea canvas-sidebar-comment-text-area w-full px-2 py-1 text-sm text-sm leading-tight text-gray-200 block w-full rounded-md shadow-sm focus-visible:border-teal-500 focus-visible:ring-teal-500 resize-none border-gray-500 bg-gray-700 text-gray-200 placeholder-gray-400"
            placeholder="Optional description for this column"
          />

          <p className="mb-1 mt-3 text-xs font-bold uppercase text-gray-400">
            Actions
          </p>
          <Button
            className="w-[130px] p-0  text-white deletecolumnbtn rounded-md"
            variant="bordered"
            onClick={handleDeleteColumn}
          >
            <div className="flex w-full items-center justify-start">
              <i className="fa-solid fa-trash px-2 text-gray-200"></i>
              <p className="text-white pe-1">Delete Column</p>
            </div>
          </Button>
        </div>
      }
      trigger={
        <Button
          variant="light"
          className="py-1 rounded-sm w-full gap-0 min-w-6 h-[30px] "
        >
          <i className="fa-solid fa-ellipsis"></i>
        </Button>
      }
    />
  );
};

export default ColumnSettingsPopover;
