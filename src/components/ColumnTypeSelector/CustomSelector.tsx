import React, { useEffect, useState } from "react";
import Search from "../Search/Search";

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
  onDropdownSelect: (val: string) => void;
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
  const onSelect = (value: string, label: string, color?: string) => {
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
    <>
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
            value !== selectedValue && onSelect(value, label, color);
          }}
          className="wrapper text_primary justify-content-between"
        >
          {value === selectedValue ? (
            <>
              <div className="wrapper justify-start">
                <p className="check-selected mx-2">{label}</p>
              </div>
              <i className="fa-solid check-selected fa-check ms-2" />
            </>
          ) : (
            <div className="wrapper justify-start">
              <p className="check-selected mx-2">{label}</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default CustomSelector;
