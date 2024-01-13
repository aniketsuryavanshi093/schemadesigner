import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import { columntype } from "@/types";

export type optionstype = {
  label: string;
  value: string;
  img?: string;
  color?: string;
};

const CustomSelector: React.FC<{
  options: optionstype[];
  selectedvalue?: string;
  defaultValue?: string;
  classname?: string;
  searchable?: boolean;
  onDropdownSelect: (val: columntype) => void;
}> = ({
  options,
  selectedvalue,
  defaultValue,
  onDropdownSelect,
  searchable,
}) => {
  const [selectedValue, setSelectedValue] = useState(selectedvalue);
  const [_options, setoptions] = useState<optionstype[]>(options);
  useEffect(() => {
    if (selectedvalue === "") {
      setSelectedValue("");
    }
  }, [selectedvalue]);
  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);
  useEffect(() => {
    setoptions(options);
  }, [options]);
  const onSelect = (value: columntype, label: string, color?: string) => {
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
    <div className="max-h-[240px] overflow-y-scroll">
      {searchable && (
        <Search
          searchiconclass="dropdownsearchicon"
          inpClassname="dropdownsearch"
          placeholder="Search user"
          setValue={handleSearch}
          minSearchChar={0}
          waitTime={2}
        ></Search>
      )}
      {_options.map(({ label, value, color }) => (
        <div
          key={label}
          onClick={() => {
            value !== selectedValue && onSelect(value as columntype, label, color);
          }}
          className=" text-[#cbd5e1] flex items-center my-2 w-full justify-between text_primary "
        >
          {value === selectedValue ? (
            <>
              <div className="fle items-center justify-start">
                <p className="check-selected mx-4">{label}</p>
              </div>
              <i className="fa-solid check-selected fa-check mr-8" />
            </>
          ) : (
            <div className="fle items-center justify-start">
              <p className="check-selected mx-4">{label}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomSelector;
