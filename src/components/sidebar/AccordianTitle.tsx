import { Table } from '@/types'
import { Button } from '@nextui-org/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useTableHooks from '@/hooks/useTableHooks'
import TableSettingDots from './TableSettingDots'

const AccordianTitle: React.FC<{ table: Table, isOpen: string }> = ({ table, isOpen }) => {
    const [TableTitle, setTableTitle] = useState<string>(table.tableName)
    const { setEditTablehelper, updateSaveTablehelper } = useTableHooks()
    const handleSaveTable = (e: any) => {
        e?.preventDefault()
        e?.stopPropagation()
        if (table.isEditing) {
            updateSaveTablehelper({
                ...table,
                tableName: TableTitle,
                isEditing: false
            })
            setTableTitle("")
        }
    }
    const inputref = useRef()
    useEffect(() => {
        setTableTitle(table.tableName)
        if (table.isEditing) {
            inputref?.current?.focus()
        }
    }, [table])
    const handleInputClick = (e: any) => {
        e.stopPropagation();
        e.preventDefault()
        e.isDefaultPrevented()
    };
    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            handleSaveTable(event)
        }
    };
    const handleEdit = useCallback(() => {
        setEditTablehelper(table)
    }, [table, setEditTablehelper])

    return (
        <div className='flex relative justify-between gap-2 w-full directionlefttoright accordianheader items-center mx-2'>
            {
                table?.isEditing ? (
                    <input type="text" ref={inputref} onKeyDown={handleKeyPress}
                        onClick={handleInputClick} className='w-4/5 ps-3 z-[100] h-[1.8rem] text-base ' onChange={(e) => {
                            e.preventDefault()
                            setTableTitle(e.target.value)
                        }} value={TableTitle} />
                ) : <p className='text-base'>{table.tableName}</p>
            }
            <div className='flex justify-between items-center gap-2'>
                {
                    table?.isEditing ? (
                        <Button size='sm' color='success' variant='bordered' style={{padding:" 15px 11px "}} className='w-5  h-6 gap-0  min-w-8' onClick={(e) => {
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
                            <Button size='sm' style={{padding:" 15px 11px "}} className={` ${isOpen === table.tableIndex && "editbtnovered"} w-5 h-6 min-w-8 gap-0   editbtn`} onClick={handleEdit} >
                                <i className="fa-solid fa-pen"></i>
                            </Button>
                        )
                }
              
                    <TableSettingDots table={table} />

            </div>
        </div >
    )
}

export default AccordianTitle