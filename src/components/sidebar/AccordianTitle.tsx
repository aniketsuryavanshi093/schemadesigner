import { useAppDispatch } from '@/redux/dashboardstore/hook'
import { setEditTable, updateSaveTable } from '@/redux/dashboardstore/reducer/schema/schema'
import { Table } from '@/types'
import { Button } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'

const AccordianTitle: React.FC<{ table: Table, isOpen: number }> = ({ table, isOpen }) => {
    const dispatch = useAppDispatch()
    const [TableTitle, setTableTitle] = useState<string>(table.tableName)
    const handleSaveTable = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (table.isEditing) {
            dispatch(updateSaveTable({
                ...table,
                tableName: TableTitle,
                isEditing: false
            }))
            setTableTitle("")
        }

    }
    useEffect(() => {
        setTableTitle(table.tableName)
    }, [table])

    const inputref = useRef()
    useEffect(() => {
        if (table.isEditing) {
            inputref?.current?.focus()
        }
    }, [table])
    const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        e.preventDefault()
        e.isDefaultPrevented()
    };
    const handleEdit = () => {
        dispatch(setEditTable(table.tableIndex!))
    }
    return (
        <div className='flex justify-between w-full accordianheader items-center mx-2'>
            {
                table?.isEditing ? (
                    <input type="text" ref={inputref} onClick={handleInputClick} onBlur={handleSaveTable} className='w-4/5 ps-3 z-[9999999]' onChange={(e) => setTableTitle(e.target.value)} value={TableTitle} />
                ) : <p className='text-base'>{table.tableName}</p>
            }
            {
                table?.isEditing ? (
                    <Button className='w-6 gap-0 p-0 min-w-10' onClick={(e) => {
                        if (table.isEditing) {
                            handleSaveTable(e)
                            e.preventDefault()
                            e.stopPropagation()
                        }
                    }}>
                        <i className="fa-regular fa-circle-check"></i>
                    </Button>
                )
                    :
                    (
                        <Button className={` ${isOpen === table.tableIndex && "editbtnovered"} w-6 gap-0 p-0 min-w-10 editbtn`} onClick={handleEdit} >
                            <i className="fa-solid fa-pen"></i>
                        </Button>
                    )
            }
        </div>
    )
}

export default AccordianTitle