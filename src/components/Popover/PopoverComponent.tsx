import React from 'react'
import { Popover, PopoverContent, PopoverTrigger, } from '@nextui-org/react'

const PopoverComponent: React.FC<{ placement: string, isOpen?: boolean, onOpenChange?: (e: boolean) => void, content: React.JSX.Element, trigger: React.JSX.Element }> = ({ onOpenChange, isOpen,
    placement, content, trigger, }) => {
    return (
        <Popover isOpen={isOpen} onOpenChange={onOpenChange} placement={placement} showArrow={true}>
            <PopoverTrigger>
                {trigger}
            </PopoverTrigger>
            <PopoverContent className='bg-[#18181bdd] '>
                {content}
            </PopoverContent>
        </Popover>
    )
}

export default PopoverComponent