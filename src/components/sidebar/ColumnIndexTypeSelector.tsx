import React, { useState } from "react";
import PopoverComponent from "../Popover/PopoverComponent";
import { Button } from "@nextui-org/react";
import { Table, columnindextype, columns } from "@/types";
import ColumnIndexSelector from "../ColumnIndexSelector/ColumnIndexSelector";

const ColumnIndexTypeSelector: React.FC<{ column: columns; table: Table }> = ({
  column,
  table,
}) => {
  const [open, setopen] = useState(false);
  const getColumnicon = (type: columnindextype) => {
    switch (type) {
      case "primary":
        return "fa-key text-[#14b8a6]";
      case "none":
        return "fa-circle";
      case "index":
        return "text-[#14b8a6] fa-neuter";
      case "unique":
        return "text-[#14b8a6] fa-snowflake";
    }
  };
  return (
    <PopoverComponent
      popoverOpen={open}
      setPopover={setopen}
      classname="px-2 py-2 columtypewrapper"
      placement="right-start"
      content={
        <ColumnIndexSelector
          column={column}
          table={table}
          close={() => setopen(false)}
        />
      }
      trigger={
        <Button
          variant="light"
          className="py-1 rounded-sm w-full gap-0 min-w-6 h-[30px] "
        >
          <i
            className={`fa-solid text-[#b2b2b2] ${getColumnicon(
              column.columnIndexType!
            )} text-[12px]`}
          ></i>
        </Button>
      }
    ></PopoverComponent>
  );
};

export default ColumnIndexTypeSelector;
