/* eslint-disable react/jsx-key */
"use client"
import { tablecolors } from '@/Constants'
import { Table, columns } from '@/types'
import { Button, } from '@nextui-org/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import PopoverComponent from '../Popover/PopoverComponent'
import ThreeDotBtn from './ThreeDotBtn'
import useColumnsHook from '@/hooks/useColumnsHook'

const AccordionSchemaBody: React.FC<{ table: Table }> = ({ table }) => {
    const { addColumns } = useColumnsHook()
    const content = (
        <div className="py-2 w-[180px]  h-[auto] gap-2 justify-center items-center flex flex-wrap">
            {
                tablecolors.map((elm) => (
                    <div className={`w-9 cursor-pointer h-9 rounded-lg bg-[${elm}] `} style={{ background: elm }} ></div>
                ))
            }
        </div>
    );
    const handleColumnadd = () => {
        addColumns(table, false)
    }

    return (
        <div className='directionlefttoright'>
            {
                table?.columns?.map((elem) => (
                    <div key={elem.columnIndex} className='flex items-center gap-1 justify-between'>
                        <AccordionBodyColumn table={table} tableIndex={table.tableIndex!} column={elem} isFocused={table?.columns?.length!} />
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
                    <ThreeDotBtn table={table} />
                </div>
                <div className='flex gap-2 justify-center items-center'>
                    <Button variant='bordered' color='secondary' >Add Index</Button>
                    <Button onClick={handleColumnadd} variant='bordered' color='success' >Add Column</Button>
                </div>
            </div >
        </div>
    )
}
export default AccordionSchemaBody


const AccordionBodyColumn: React.FC<{ table: Table, column: columns, isFocused: number, tableIndex: string }> = ({ table, column, isFocused, tableIndex }) => {
    const inputref = useRef<React.LegacyRef<HTMLInputElement> | undefined>()
    const [ColumnTitle, setColumnTitle] = useState<string>("")
    const { handleSaveColumnTitle } = useColumnsHook()
    useEffect(() => {
        setColumnTitle(column.columnName)
        if (isFocused > 1 && isFocused === column.columnIndex) {
            inputref?.current?.focus()
        }
    }, [])
    const handleSavecolumntitle = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (table.isEditing) {
            handleSaveColumnTitle(tableIndex, column, ColumnTitle)
        }
    }
    return (
        <div className='flex flex-[3] mb-2 items-center justify-center gap-2 '>
            <input ref={inputref} onBlur={handleSavecolumntitle} className='ps-2 columninput w-[60%] h-10 rounded-md focus:outline-none focus:ring focus:ring-amber-700 ' value={ColumnTitle} onChange={(e) => setColumnTitle(e.target.value)} />
            <PopoverComponent placement='right' content={<p>hello</p>} trigger={
                <input className='ps-2 columninput w-[40%] h-10 rounded-md focus:outline-none focus:ring focus:ring-amber-700' value={column.columnDataType} onChange={(e) => setColumnTitle(e.target.value)} />
            }>
            </PopoverComponent>
        </div>
    )
}