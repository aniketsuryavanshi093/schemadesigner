import useColumnsHook from '@/hooks/useColumnsHook';
import useTableHooks from '@/hooks/useTableHooks';
import { Table } from '@/types';
import { Button } from '@nextui-org/react';
import React, { useEffect, useRef } from 'react'

const TableSettingDots: React.FC<{ table: Table, setPopoverOpen: (e: boolean) => void, PopoverOpen: boolean }> = ({ setPopoverOpen, PopoverOpen, table }) => {
    const { DeleteTablehelper } = useTableHooks()
    const handledeleteTable = () => {
        setPopoverOpen(!PopoverOpen)
        DeleteTablehelper(table.tableIndex!)
    };
    useEffect(() => {
        const handleClickOutside = (event) => {

            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                console.log("adwawwd");
                setPopoverOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const { addColumns } = useColumnsHook()
    const popoverRef = useRef(null);

    return (
        <div ref={popoverRef} className={`w-48 py-2 absolute popoverwrapper `}>
            <p className="text-[#94a3b8] uppercase text-md">Table Actions </p>
            <Button className="w-full text-white rounded-md" variant="light">
                <p className="w-full text-left"> Add Comment</p>
            </Button>
            <Button onClick={() => {
                setPopoverOpen(!PopoverOpen)
                addColumns(table, true)
            }} className="w-full text-white rounded-md" variant="light">
                <p className="w-full text-left"> Add Columns</p>
            </Button>
            <div className="mt-2  border-t-1 border-[rgb(51 65 85 / 1)]">
                <Button
                    onClick={handledeleteTable}
                    className="w-full text-white mt-2 rounded-md"
                    variant="light"
                >
                    <div className="flex w-full items-center justify-between">
                        <p className="text-white">Delete table</p>
                        <i
                            className="fa-solid fa-trash"
                            style={{ color: "#fb0404" }}
                        ></i>
                    </div>
                </Button>
            </div>
        </div>
    )
}

export default TableSettingDots