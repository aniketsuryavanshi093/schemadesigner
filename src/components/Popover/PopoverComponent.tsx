import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";

const PopoverComponent: React.FC<{
  placement: string;
  setPopover: any;
  popoverOpen: boolean;
  classname: string;
  content: React.JSX.Element;
  trigger: React.JSX.Element;
}> = ({ popoverOpen, setPopover, placement, content, trigger, classname }) => {
  return setPopover ? (
    <Popover
      open={popoverOpen}
      handler={() => setPopover(!popoverOpen)}
      placement={placement}
      showArrow={true}
    >
      <PopoverHandler>{trigger}</PopoverHandler>
      <PopoverContent className={`bg-[#18181bdd] ${classname}  `}>
        {content}
      </PopoverContent>
    </Popover>
  ) : (
    <Popover placement={placement} showArrow={true}>
      <PopoverHandler>{trigger}</PopoverHandler>
      <PopoverContent className={`bg-[#18181bdd] ${classname}  `}>
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverComponent;