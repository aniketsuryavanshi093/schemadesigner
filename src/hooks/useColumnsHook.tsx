import { useAppDispatch } from '@/redux/dashboardstore/hook'
import { addColumnsAction, saveColumn } from '@/redux/dashboardstore/reducer/schema/schema'
import { Table, columns } from '@/types'

const useColumnsHook = () => {
    const dispatch = useAppDispatch()
    const addColumns = (table: Table, fromOutside: boolean) => {
        dispatch(addColumnsAction({
            fromOutside: fromOutside ? true : false,
            tableIndex: table.tableIndex!,
            column: { columnName: "", columnDataType: "bigint", columnIndexType: 'none', columnIndex: table?.columns?.length! + 1 }
        }))
    }
    const handleSaveColumnTitle = (tableIndex: string, column: columns, ColumnTitle: string) => {
        dispatch(saveColumn({
            tableIndex,
            column: {
                ...column, columnName: ColumnTitle
            }
        }))
    }
    return {
        addColumns,
        handleSaveColumnTitle
    }
}

export default useColumnsHook