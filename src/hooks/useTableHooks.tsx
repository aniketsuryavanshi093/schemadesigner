import { useAppDispatch, useAppSelector } from "@/redux/dashboardstore/hook";
import {
  addTable,
  deleteTable,
  setEditTable,
  updateSaveTable,
  removeClearEditing,
} from "@/redux/dashboardstore/reducer/schema/schema";
import { Table } from "@/types";

const useTableHooks = () => {
  const dispatch = useAppDispatch();
  const { tables } = useAppSelector((state) => state.schemareducer);

  const DeleteTablehelper = (tableindex: string) => {
    dispatch(deleteTable({ tableIndex: tableindex }));
  };
  const setEditTablehelper = (table: Table) => {
    if (!tables.every((elem) => elem.isEditing === false)) {
      dispatch(removeClearEditing());
    }
    dispatch(setEditTable(table.tableIndex!));
  };
  const updateSaveTablehelper = (table: Table) => {
    dispatch(
      updateSaveTable({
        ...table,
      })
    );
  };
  const AddTablehelper = (table: Table) => {
    dispatch(
      addTable({
        ...table,
      })
    );
  };
  return {
    DeleteTablehelper,
    AddTablehelper,
    setEditTablehelper,
    updateSaveTablehelper,
    tables,
  };
};

export default useTableHooks;
