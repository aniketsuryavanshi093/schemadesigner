import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverHandler,
  } from "@material-tailwind/react";

const PopoverComponent: React.FC<{ placement: string,  classname: string, content: React.JSX.Element, trigger: React.JSX.Element }> = ({ 
    placement, content, trigger,classname }) => {
    return (
        <Popover  placement={placement} showArrow={true}>
            <PopoverHandler>
                {trigger}
            </PopoverHandler>
            <PopoverContent className={`bg-[#18181bdd] ${classname}  `}>
                {content}
            </PopoverContent>
        </Popover>
    )
}

export default PopoverComponent