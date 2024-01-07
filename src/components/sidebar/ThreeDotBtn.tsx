import React from "react";
import PopoverComponent from "../Popover/PopoverComponent";
import { Table } from "@/types";
import { Button } from "@nextui-org/react";
import useTableHooks from "@/hooks/useTableHooks";
import useColumnsHook from "@/hooks/useColumnsHook";

const ThreeDotBtn: React.FC<{ table: Table, isOutsidebtn?: boolean }> = ({ table, isOutsidebtn }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { DeleteTablehelper } = useTableHooks()
    const handledeleteTable = () => {
        setIsOpen(false);
        DeleteTablehelper(table.tableIndex!)
    };
    const { addColumns } = useColumnsHook()

    return (
        <PopoverComponent
            isOpen={isOpen}
            onOpenChange={(open: boolean) => setIsOpen(open)}
            trigger={
                <Button variant="flat" className="w-6 gap-0 p-0 min-w-10 ">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </Button>
            }
            content={
                <div className="w-48 py-2">
                    <p className="text-[#94a3b8] uppercase text-md">Table Actions </p>
                    {
                        isOutsidebtn && (
                            <>
                                <Button className="w-full text-white rounded-md" variant="light">
                                    <p className="w-full text-left"> Add Index</p>
                                </Button>
                                <Button onClick={() => addColumns(table, true)} className="w-full text-white rounded-md" variant="light">
                                    <p className="w-full text-left"> Add Columns</p>
                                </Button>
                            </>
                        )
                    }
                    <Button className="w-full text-white rounded-md" variant="light">
                        <p className="w-full text-left"> Add Comment</p>
                    </Button>
                    <div className="mt-2  border-t-1 border-[rgb(51 65 85 / 1)]">
                        <Button
                            className="w-full text-white mt-2 rounded-md"
                            variant="light"
                            onClick={handledeleteTable}
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
            }
            placement="right-start"
        />
    );
};

export default ThreeDotBtn;
