import { useAppDispatch, useAppSelector } from "@/redux/dashboardstore/hook";
import { removeRelationofTable } from "@/redux/dashboardstore/reducer/relations/relationSlice";
import {
  addTable,
  deleteTable,
  setEditTable,
  updateSaveTable,
  addCommentOpenAction,
  removeClearEditing,
  addTablecommentAction,
} from "@/redux/dashboardstore/reducer/schema/schema";
import { Table } from "@/types";

const useTableHooks = () => {
  const dispatch = useAppDispatch();
  const { tables } = useAppSelector((state) => state.schemareducer);

  const DeleteTablehelper = (table: Table) => {
    dispatch(deleteTable({ tableIndex: table.tableIndex! }));
    dispatch(removeRelationofTable(table.tableName));
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
  const AddCommentOpenAction = (tableIndex: string) => {
    dispatch(
      addCommentOpenAction({
        tableIndex,
        isCommentOpen: true,
      })
    );
  };
  const AddtableComment = (tableIndex: string, comment: string) => {
    dispatch(
      addTablecommentAction({
        tableIndex,
        comment,
      })
    );
  };
  return {
    DeleteTablehelper,
    AddTablehelper,
    setEditTablehelper,
    updateSaveTablehelper,
    tables,
    AddCommentOpenAction,
    AddtableComment,
  };
};

export default useTableHooks;
