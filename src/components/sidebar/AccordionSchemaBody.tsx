/* eslint-disable react/jsx-key */
"use client"
import { tablecolors } from '@/Constants'
import { useAppDispatch } from '@/redux/dashboardstore/hook'
import { addColumnsAction, saveColumn } from '@/redux/dashboardstore/reducer/schema/schema'
import { Table, columns } from '@/types'
import { Button, } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import PopoverComponent from '../Popover/PopoverComponent'

const AccordionSchemaBody: React.FC<{ table: Table }> = ({ table }) => {
    const dispatch = useAppDispatch()
    const addColumns = () => {
        dispatch(addColumnsAction({
            tableIndex: table.tableIndex!,
            column: { columnName: "", columnDataType: "bigint", columnIndexType: 'none', columnIndex: table?.columns?.length! + 1 }
        }))
    }
    const content = (
        <div className="py-2 w-[180px] h-[auto] gap-2 justify-center items-center flex flex-wrap">
            {
                tablecolors.map((elm) => (
                    <div className={`w-9 cursor-pointer h-9 rounded-lg bg-[${elm}] `} style={{ background: elm }} ></div>
                ))
            }
        </div>
    );
    return (
        <>
            {
                table?.columns?.map((elem) => (
                    <div key={elem.columnIndex} className='flex items-center gap-1 justify-between'>
                        <AccordionBodyColumn tableIndex={table.tableIndex!} column={elem} isFocused={table?.columns?.length!} />
                        <div className='flex-1 flex items-center justify-center gap-[3px]'>
                            <Button className='w-4 gap-0 p-0 min-w-6 '  >
                                <i className="fa-solid fa-pen"></i>
                            </Button>
                            <Button className='w-4 gap-0 p-0 min-w-6 '  >
                                <i className="fa-solid fa-pen"></i>
                            </Button>
                            <Button className='w-4 gap-0 p-0 min-w-6 '  >
                                <i className="fa-solid fa-pen"></i>
                            </Button>
                        </div>
                    </div>
                ))
            }
            <div className='border-t-small columnbottomwrapper w-full flex items-center px-2 pt-[10px]  justify-between'>
                <div className='flex items-center justify-center gap-2'>
                    <PopoverComponent placement='top' content={content} trigger={(
                        <Button variant='ghost' className='w-6 gap-0 p-0 min-w-10 '  >
                            <i className="fa-solid fa-palette"></i>
                        </Button>
                    )} />
                    <PopoverComponent
                        trigger={<Button variant='flat' className='w-6 gap-0 p-0 min-w-10 '  >
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </Button>}
                        content={<div className='w-48 py-2'>
                            <p className='text-[#94a3b8] uppercase text-md'>Table Actions </p>
                            <Button className='w-full text-white rounded-md' variant='light'   >
                                <p className='w-full text-left'> Add Comment</p>
                            </Button>
                            <div className='mt-2  border-t-1 border-[rgb(51 65 85 / 1)]'>
                                <Button className='w-full text-white mt-2 rounded-md' variant='light' >
                                    <div className='flex w-full items-center justify-between'>
                                        <p className='text-white'>
                                            Delete table
                                        </p>
                                        <i className="fa-solid fa-trash" style={{ "color": "#fb0404" }}></i>
                                    </div>
                                </Button>
                            </div>
                        </div>}
                        placement="right" />
                </div>
                <div className='flex gap-2 justify-center items-center'>
                    <Button variant='bordered' color='secondary' >Add Index</Button>
                    <Button onClick={addColumns} variant='bordered' color='success' >Add Column</Button>
                </div>
            </div >
        </>
    )
}

export default AccordionSchemaBody


const AccordionBodyColumn: React.FC<{ column: columns, isFocused: number, tableIndex: number }> = ({ column, isFocused, tableIndex }) => {
    const inputref = useRef()
    const dispatch = useAppDispatch()
    const [ColumnTitle, setColumnTitle] = useState<string>("")
    useEffect(() => {
        setColumnTitle(column.columnName)
        if (isFocused > 1 && isFocused === column.columnIndex) {
            inputref?.current?.focus()
        }
    }, [])
    const handleSaveColumnTitle = () => {
        dispatch(saveColumn({
            tableIndex,
            column: {
                ...column, columnName: ColumnTitle
            }
        }))
    }
    return (
        <div className='flex flex-[3] mb-2 items-center justify-center gap-2 '>
            <input ref={inputref} onBlur={handleSaveColumnTitle} className='ps-2 columninput w-[60%] h-10 rounded-md focus:outline-none focus:ring focus:ring-amber-700 ' value={ColumnTitle} onChange={(e) => setColumnTitle(e.target.value)} />
            <PopoverComponent placement='right' content={<p>hello</p>} trigger={
                <input className='ps-2 columninput w-[40%] h-10 rounded-md focus:outline-none focus:ring focus:ring-amber-700' value={column.columnDataType} onChange={(e) => setColumnTitle(e.target.value)} />
            }>
            </PopoverComponent>
        </div>
    )
}