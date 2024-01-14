import { useAppDispatch } from "@/redux/dashboardstore/hook";
import {
  addColumnsAction,
  setcolumnEditing,
  updateColumnAction,
} from "@/redux/dashboardstore/reducer/schema/schema";
import { Table, columns } from "@/types";

const useColumnsHook = () => {
  const dispatch = useAppDispatch();
  const addColumns = (table: Table, fromOutside: boolean) => {
    dispatch(
      addColumnsAction({
        fromOutside: fromOutside ? true : false,
        tableIndex: table.tableIndex!,
        column: {
          columnName: "",
          isEditing: true,
          columnDataType: "bigint",
          columnIndexType: "none",
          columnIndex: table?.columns?.length! + 1,
        },
      })
    );
  };
  const handleSaveColumnTitle = (
    tableIndex: string,
    column: columns,
    ColumnTitle: string
  ) => {
    dispatch(
      updateColumnAction({
        tableIndex,
        column: {
          ...column,
          columnName: ColumnTitle,
        },
      })
    );
  };
  const UpdateColumn = (tableIndex: string, column: columns) => {
    dispatch(
      updateColumnAction({
        tableIndex,
        column,
      })
    );
  };
  const setcolumnEditingHelper = (tableIndex: string, column: columns) => {
    dispatch(
      setcolumnEditing({
        tableIndex,
        columnIndex: column.columnIndex!,
      })
    );
  };
  return {
    addColumns,
    handleSaveColumnTitle,
    UpdateColumn,
    setcolumnEditingHelper,
  };
};

export default useColumnsHook;
