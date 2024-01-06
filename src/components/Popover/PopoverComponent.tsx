import React from 'react'
import { Popover, PopoverContent, PopoverTrigger, } from '@nextui-org/react'

const PopoverComponent: React.FC<{ placement: string, content: React.JSX.Element, trigger: React.JSX.Element }> = ({ placement, content, trigger, }) => {
    return (
        <Popover placement={placement} showArrow={true}>
            <PopoverTrigger>
                {trigger}
            </PopoverTrigger>
            <PopoverContent className='bg-[#18181bdd]'>
                {content}
            </PopoverContent>
        </Popover>
    )
}

export default PopoverComponent