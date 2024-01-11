import React, { useState } from "react";
import CustomSelector from "./CustomSelector";
import { columnTypeoptions } from "@/Constants";
import "./selector.scss";

const ColumnTypeSelector = ({ close }) => {
  const [ColumnType, setColumnType] = useState("");
    
  return (
    <CustomSelector
      searchable
      selectedvalue={ColumnType}
      defaultValue="bigint"
      onDropdownSelect={(value) => {
        setColumnType(value);
        close();
      }}
      options={columnTypeoptions}
    />
  );
};

export default ColumnTypeSelector;
