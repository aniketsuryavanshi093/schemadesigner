import useColumnsHook from "@/hooks/useColumnsHook";
import useTableHooks from "@/hooks/useTableHooks";
import { Table } from "@/types";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { Button } from "@nextui-org/react";
import React  from "react";

const TableSettingDots: React.FC<{
  table: Table;
}> = ({ table }) => {
  const { DeleteTablehelper } = useTableHooks();
  const handledeleteTable = () => {
    DeleteTablehelper(table.tableIndex!);
  };
  const { addColumns } = useColumnsHook();
  return (
    <Popover 
      placement="right-end"
    >
      <PopoverHandler>
        <Button
          size="sm"
          variant="flat"
          className="w-5 h-6 gap-0 p-[13px] min-w-8 "
        >
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </Button>
      </PopoverHandler>
      <PopoverContent className="p-0">
        <div className={`w-48 py-2 popoverwrapper `}>
          <p className="text-[#94a3b8] px-1 pt-1 capitalize text-[14px]">
          TABLE ACTIONS
          </p>
          <Button className="w-full text-white rounded-md" variant="light">
            <p className="w-full text-left"> Add Comment</p>
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addColumns(table, true);
            }}
            className="w-full text-white rounded-md"
            variant="light"
          >
            <p className="w-full text-left"> Add Columns</p>
          </Button>
          <div className="mt-2  border-t-1 border-[rgb(51 65 85 / 1)]">
            <Button
              onClick={handledeleteTable}
              className="w-full text-white mt-2 rounded-md"
              variant="light"
            >
              <div className="flex w-full items-center justify-between">
                <p className="text-white">Delete table</p>
                <i
                  className="fa-solid fa-trash"
                  style={{ color: "#fb0404" }}
                ></i>
              </div>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TableSettingDots;
