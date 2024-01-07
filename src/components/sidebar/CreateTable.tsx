import { Table } from '@/types'
import { v1 as uuidv1 } from 'uuid';
import { Button } from '@nextui-org/react'
import React from 'react'
import useTableHooks from '@/hooks/useTableHooks';

const CreateTableSidebar: React.FC<{ tables: Table[] }> = ({ tables }) => {
    const { AddTablehelper } = useTableHooks()
    const handleCreateTable = (e: any) => {
        e.stopPropagation()
        AddTablehelper({
            tableName: `table_${tables.length + 1}`,
            isEditing: true,
            tableIndex: uuidv1(),
            columns: [{ columnName: "id", columnDataType: "bigint", columnIndexType: 'none', columnIndex: 1 }]
        })
    }
    return (
        <div className='flex justify-between shadow-md items-center p-3 sidebartop relative'>
            <p className='text-lg'>Tables</p>
            <Button onClick={handleCreateTable} className="topsidebtn" variant='ghost'><i className="fa-solid fa-plus"></i> New Table</Button>
            <Button className='absolute right-[-11%] rounded-[4px] w-6 gap-0 p-0 min-w-10 z-[99999999999]'><i className="fa-solid fa-chevron-left"></i></Button>
        </div>
    )
}

export default CreateTableSidebar