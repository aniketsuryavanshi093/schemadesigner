import { Table } from '@/types'
import { Button } from '@nextui-org/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ThreeDotBtn from './ThreeDotBtn'
import useTableHooks from '@/hooks/useTableHooks'
import useColumnsHook from '@/hooks/useColumnsHook'
import TableSettingDots from './TableSettingDots'

const AccordianTitle: React.FC<{ table: Table, isOpen: string }> = ({ table, isOpen }) => {
    const [TableTitle, setTableTitle] = useState<string>(table.tableName)
    const [PopoverOpen, setPopoverOpen] = useState(false)
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
                        onClick={handleInputClick} className='w-4/5 ps-3 z-[9999999] h-[2.5rem]' onChange={(e) => {
                            e.preventDefault()
                            setTableTitle(e.target.value)
                        }} value={TableTitle} />
                ) : <p className='text-base'>{table.tableName}</p>
            }
            <div className='flex justify-between items-center gap-2'>
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
                <Button variant="flat" onClick={() => setPopoverOpen(!PopoverOpen)} className="w-6 gap-0 p-0 min-w-10 ">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </Button>
                {
                    PopoverOpen && (
                        <TableSettingDots table={table} PopoverOpen={PopoverOpen} setPopoverOpen={setPopoverOpen} />
                    )
                }
            </div>
        </div >
    )
}

export default AccordianTitle