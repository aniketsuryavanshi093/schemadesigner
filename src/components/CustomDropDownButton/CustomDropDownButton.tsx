import React, { useEffect, useState } from "react";

import "./CustomDropDownButton.css";
import Image from "next/image";
import Search from "../Search/Search";
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/react";

export type optionstype = {
  label: string;
  value: string;
  img?: string;
  color?: string;
};

type Pageprops = {
  title?: string;
  Imptitle?: string;
  icon?: string;
  options: optionstype[];
  onselectIcon?: boolean;
  disabled?: boolean;
  selectedvalue?: any;
  classname?: string;
  searchable?: boolean;
  onDropdownSelect: (val: any) => void;
  defaultValue?: string;
  reset_value?: boolean;
};
const CustomDropDownButton: React.FC<Pageprops> = ({
  title,
  Imptitle,
  icon,
  classname,
  options,
  selectedvalue,
  onselectIcon,
  onDropdownSelect,
  searchable,
  defaultValue,
  disabled,
  reset_value,
}) => {
  const [_options, setoptions] = useState<optionstype[]>(options);
  const handleSearch = (e: string) => {
    if (e) {
      setoptions(options.filter((elem) => elem.label.includes(e)) || []);
    } else {
      setoptions(options);
    }
  };
  const selectedValue = React.useMemo(
    () => Array.from(selectedvalue).join(", ").replaceAll("_", " "),
    [selectedvalue]
  );
  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="wrapper justify-between p-2 rounded-md hover:bg-gray-100 w-100">
          <div className="wrapper ">
            {icon && (
              <Image
                className={"me-2 darkmode_icon"}
                src={icon}
                alt="Wallet"
                height={14}
                width={14}
              />
            )}
            {Imptitle && (
              <span className="text-sm font-semibold text-gray-400 me-2">
                {Imptitle}
              </span>
            )}
            {reset_value ? (
              <span className="filter_label text-grey-600 font-semibold  align-middle">
                {title}
              </span>
            ) : (
              <div className="wrapper justify-start">
                <span className="filter_laebl text-[12px] align-middle text-grey-600 font-semibold  textcapitilize">
                  {selectedValue}
                </span>
              </div>
            )}
          </div>
          <i className=" ms-1 text-sm fa-solid fa-chevron-down" />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedvalue}
        onSelectionChange={onDropdownSelect}
      >
        {_options.map(({ label, value, img, color }: optionstype) => (
          <DropdownItem key={value}>{label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default React.memo(CustomDropDownButton);
