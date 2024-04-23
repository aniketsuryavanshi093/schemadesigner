import CustomDropDownButton from "@/components/CustomDropDownButton/CustomDropDownButton";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import CreateNewDaigramModal from "./CreateNewDaigramModal";

const Commonheader: React.FC<{
  title?: string;
  filterChanged: (value: string) => void
  HeaderComponent?: () => JSX.Element; // Make HeaderComponent optional
}> = ({ title, HeaderComponent, filterChanged }) => {
  const [isOpen, setIsopen] = useState(false);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["LastCreatedAt"]));
  const options = [
    {
      label: "Date Created",
      value: "LastCreatedAt",
    },
    {
      label: "Date Updated",
      value: "LastUpdatedAt",
    },
    {
      label: "Alphabetical",
      value: "Alphabetical",
    },
  ];
  const handleNewDaigram = () => {
    setIsopen(true);
  };
  return (
    <div className="mb-2 flex items-center justify-between pb-2">
      {HeaderComponent ? (
        HeaderComponent()
      ) : (
        <p className="mb-0 text-2xl font-semibold leading-6 text-gray-700">
          {title}
        </p>
      )}

      <div className="flex justify-between items-center ">
        <CustomDropDownButton
          defaultValue={"LastCreatedAt"}
          selectedvalue={selectedKeys}
          onDropdownSelect={(e) => {
            setSelectedKeys(e)
            filterChanged(e.anchorKey)
          }}
          Imptitle="Sort :"
          options={[...options]}
        />
        <Button onClick={handleNewDaigram} className=" ms-3 newdaigrambtn">
          {" "}
          New Daigram{" "}
        </Button>
      </div>
      {isOpen && (
        <CreateNewDaigramModal
          isOpen={isOpen}
          setIsopen={() => setIsopen(false)}
        />
      )}
    </div>
  );
};

export default Commonheader;
