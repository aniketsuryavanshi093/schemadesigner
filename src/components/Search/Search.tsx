/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useState } from "react";
import "./search.scss";
import Image from "next/image";

type PageProps = {
  setValue?: (e: string) => void;
  placeholder: string;
  searchwrapperclass?: string;
  waitTime: number;
  minSearchChar?: number;
  inpClassname?: string;
  searchiconclass?: string;
};

const Search: React.FC<PageProps> = ({
  setValue,
  placeholder,
  waitTime,
  minSearchChar = 2,
  inpClassname,
  searchiconclass,
  searchwrapperclass,
}) => {
  const [searchval, setsearchval] = useState("");
  let tempInterval: any;
  const handleChanges = useCallback(
    (val: React.ChangeEvent<HTMLInputElement>) => {
      setsearchval(val.target.value);
      const searchedKeywrod = val.target.value.trim();
      clearTimeout(tempInterval);
      tempInterval = setTimeout(() => {
        const qp =
          searchedKeywrod.length > minSearchChar ? searchedKeywrod : "";
        setValue!(qp);
      }, waitTime || 500);
    },
    []
  );
  return (
    <div className={`search text_primary ${searchwrapperclass} `}>
      <Image
        height={22}
        width={22}
        src="/images/searchicon.svg"
        alt="seacrh"
        className={searchiconclass || "search-icon"}
      />
      <input
        type="text"
        value={searchval}
        placeholder={placeholder || "Search..."}
        className={`dashboard-header_search ${inpClassname}`}
        onChange={handleChanges}
      />
      <i
        className="fa-solid fa-xmark searchclose"
        onClick={() => {
          setValue!("");
          setsearchval("");
        }}
      />
    </div>
  );
};

export default memo(Search);
