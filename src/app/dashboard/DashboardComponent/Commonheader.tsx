import CustomDropDownButton from "@/components/CustomDropDownButton/CustomDropDownButton";
import React from "react";
import { Button } from "@nextui-org/react";

const Commonheader: React.FC<{ title: string }> = ({ title }) => {
  const options = [
    {
      label: "Date Created",
      value: "dateCreated",
    },
    {
      label: "Date Updated",
      value: "dateUpdated",
    },
    {
      label: "Alphabetical",
      value: "alphabetical",
    },
  ];
  const handleFilter = (value: string) => {
    console.log(value);
  };
  return (
    <div className="mb-2 flex items-center justify-between pb-2">
      <p className="mb-0 text-2xl font-semibold leading-6 text-gray-700">
        {title}
      </p>
      <div className="flex justify-between items-center ">
        <CustomDropDownButton
          defaultValue={"dateCreated"}
          selectedvalue={"dateCreated"}
          onDropdownSelect={handleFilter}
          Imptitle="Sort :"
          options={[...options]}
        />
        <Button className="newdaigrambtn"> New Daigram </Button>
      </div>
    </div>
  );
};

export default Commonheader;
