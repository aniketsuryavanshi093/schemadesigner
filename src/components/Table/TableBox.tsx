import { useCallback } from "react";
import { Table } from "@/types";
import useTableHooks from "@/hooks/useTableHooks";
import { concatString } from "@/utils";
import TableColumns, { ColumnComment } from "./TableColumns";
import "./tablebox.scss";

const TableBox: React.FC<any> = (props) => {
  const table: Table = props.data?.value as Table;
  const { setEditTablehelper, updateSaveTablehelper } = useTableHooks();
  const handleEdit = useCallback(() => {
    setEditTablehelper(table);
  }, [table, setEditTablehelper]);
  return (
    <>
      <div
        className={`  tablebox
        ${table.isEditing && "selectedbox"}
       shadow-lg hover:shadow-xl border-t-4 `}
        style={{ borderTopColor: table.tableColor }}
        onClick={() => handleEdit()}
      >
        <div
          className={` flex justify-center flex-col items-center hover:bg-[#ebf4ff] boxtitlewrapper transition-all  py-1 w-full hover`}
        >
          <p
            className={`  text-center    ${
              table.isEditing && "selectedboxtitle"
            } font-medium text-sm text-gray-700 `}
          >
            {table.tableName}
          </p>

          {table.tableComment && (
            <p className="font-medium text-xs w-[75%]  text-gray-800 text-center">
              {concatString(20, table.tableComment)}
              {table.tableComment.length > 20 && (
                <ColumnComment comment={table.tableComment} />
              )}
            </p>
          )}
        </div>
        <TableColumns table={table} />
      </div>
    </>
  );
};

export default TableBox;
