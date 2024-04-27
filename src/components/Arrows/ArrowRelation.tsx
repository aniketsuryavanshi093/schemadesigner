import React from "react";
import { IclickPosition } from "./Arrows";
import useTableRelationHook from "@/hooks/useTableRelationHook";
import { columnrelationtype } from "@/types";
import { Edge } from "reactflow";

const ArrowRelation: React.FC<{
  clickPosition: IclickPosition;
  relation: Edge;
  setClickPosition: React.Dispatch<React.SetStateAction<IclickPosition>>;
}> = ({ clickPosition, setClickPosition, relation }) => {
  let columnrelation = relation.data?.relation as columnrelationtype;
  const [editingrelatioon, setEditingRelation] = React.useState(false);
  const { updateRelationShipType, removeRelation } = useTableRelationHook();
  const relationShipString = (nmae: columnrelationtype) => {
    let temp = "";
    switch (nmae) {
      case "onetoone":
        temp = "One-To-One";
        break;
      case "onetomany":
        temp = "One-To-Many";
        break;
      case "manytomamy":
        temp = "Many-To-Many";
        break;
      default:
        break;
    }
    return temp;
  };
  const handleUpdateRelation = (elem: { name: string; value: string }) => {
    if (elem.value !== columnrelation) {
      setClickPosition({
        open: false,
        x: 0,
        y: 0,
        edge: null,
      });
      updateRelationShipType(relation, elem.value as columnrelationtype);
      setEditingRelation(false);
    }
  };
  const handleRemoveRelation = () => {
    setClickPosition({
      open: false,
      x: 0,
      y: 0,
      edge: null,
    });
    removeRelation(relation);
  };
  const relationarray: { name: string; value: string }[] = [
    {
      name: "One-To-One",
      value: "onetoone",
    },
    {
      name: "One-To-Many",
      value: "onetomany",
    },
    {
      name: "Many-To-Many",
      value: "manytomamy",
    },
  ];
  return (
    <div
      style={{
        position: "absolute",
        left: clickPosition ? clickPosition.x : 0,
        top: clickPosition ? clickPosition.y : 0,
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {!editingrelatioon ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setEditingRelation(true);
          }}
          className=" hover:bg-grey-600 text-grey-800 w-[130px] group cursor-pointer rounded border-indigo-700 px-2 py-1 focus:outline-none border-2 bg-white opacity-90"
        >
          <div className="flex w-full justify-between items-center">
            <p className="font-semibold text-[14px] capitalize text-indigo-500 text-nowrap whitespace-nowrap me-2">
              {relationShipString(columnrelation)}
            </p>
            <div className="svg-div  justify-center items-center  hidden text-gray-500 group-hover:flex">
              <i className="fa-solid fa-pen text-[14px]"></i>
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-[140px] z-[1000] absolute text-grey-800 group cursor-pointer rounded border-indigo-700 p-2 focus:outline-none border-0 bg-[#1e293b] ">
          <ul className="relative text-white">
            {relationarray?.map((elem) => (
              <li
                onClick={() => handleUpdateRelation(elem)}
                key={elem.name}
                className={` whitespace-nowrap rounded px-2 py-2 capitalize ${
                  columnrelation === elem.value && "bg-teal-500"
                } hover:bg-teal-500`}
              >
                {elem.name}
              </li>
            ))}
            <hr className="border-grey-200 my-1" />
            <li
              onClick={handleRemoveRelation}
              className="cursor-pointer flex text-[13px] justify-start items-center rounded px-2 py-2 hover:bg-red-200 hover:text-red-600"
            >
              <i className="fa-regular text-[13px] fa-trash-can me-3"></i>
              <p>RelationShip</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArrowRelation;
