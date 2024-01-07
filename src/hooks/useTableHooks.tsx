import { useAppDispatch } from '@/redux/dashboardstore/hook';
import { addTable, deleteTable, setEditTable, updateSaveTable } from '@/redux/dashboardstore/reducer/schema/schema';
import { Table } from '@/types';

const useTableHooks = () => {
    const dispatch = useAppDispatch();

    const DeleteTablehelper = (tableindex: string) => {
        dispatch(deleteTable({ tableIndex: tableindex }));
    }
    const setEditTablehelper = (table: Table) => {
        dispatch(setEditTable(table.tableIndex!))
    }
    const updateSaveTablehelper = (table: Table) => {
        dispatch(updateSaveTable({
            ...table
        }))
    }
    const AddTablehelper = (table: Table) => {
        dispatch(addTable({
            ...table
        }))
    }
    return { DeleteTablehelper, AddTablehelper, setEditTablehelper, updateSaveTablehelper }
}

export default useTableHooks