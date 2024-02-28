import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import { columntype } from "@/types";

export type optionstype = {
  label: string;
  value: string;
  icon?: React.JSX.Element;
  color?: string;
};

const CustomSelector: React.FC<{
  options: optionstype[];
  selectedvalue?: string;
  title?: string;
  defaultValue?: string;
  classname?: string;
  searchable?: boolean;
  onDropdownSelect: (val: columntype) => void;
}> = ({
  options,
  selectedvalue,
  classname,
  title,
  defaultValue,
  onDropdownSelect,
  searchable,
}) => {
  const [selectedValue, setSelectedValue] = useState(selectedvalue);
  const [_options, setoptions] = useState<optionstype[]>(options);
  useEffect(() => {
    if (selectedvalue === "") {
      setSelectedValue(defaultValue);
    } else {
      setSelectedValue(selectedvalue);
    }
  }, [selectedvalue, defaultValue]);

  useEffect(() => {
    setoptions(options);
  }, [options]);
  const onSelect = (value: columntype, label: string) => {
    if (selectedValue !== "" && selectedValue === value) {
      setSelectedValue("");
      onDropdownSelect(value);
    } else {
      setSelectedValue(value);
      onDropdownSelect(value);
    }
    setoptions(options);
  };
  const handleSearch = (e: string) => {
    if (e) {
      setoptions(options.filter((elem) => elem.label.includes(e)) || []);
    } else {
      setoptions(options);
    }
  };
  return (
    <div className={` ${classname} max-h-[240px] overflow-y-scroll`}>
      <p className="my-1 px-2 text-left text-xs cursor-pointer font-bold uppercase text-gray-400">
        {title}
      </p>
      {searchable && (
        <Search
          searchiconclass="dropdownsearchicon"
          inpClassname="dropdownsearch"
          placeholder="Search datatypes..."
          setValue={handleSearch}
          minSearchChar={0}
          waitTime={2}
        ></Search>
      )}
      {_options.map(({ label, value, icon }) => (
        <div
          key={label}
          onClick={() => {
            value !== selectedValue && onSelect(value as columntype, label);
          }}
          className={` text-[#cbd5e1]  ${
            value === selectedValue && "bg-[#a47e52] text-[white]"
          } cursor-pointer  hover:bg-[#14b8a6] hover:text-[white] rounded-md transition-all flex pointer items-center py-2 w-full justify-between text_primary `}
        >
          {value === selectedValue ? (
            <>
              <div className="flex items-center ms-4 justify-start">
                {icon || ""}
                <p className="check-selected">{label}</p>
              </div>
              <i className="fa-solid check-selected fa-check mr-8" />
            </>
          ) : (
            <div className="flex items-center ms-4 justify-start">
              {icon || ""}
              <p className="check-selected">{label}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomSelector;
