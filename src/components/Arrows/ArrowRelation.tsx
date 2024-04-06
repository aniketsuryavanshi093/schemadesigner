import React from "react";
import { IclickPosition } from "./Arrows";

const ArrowRelation: React.FC<{
  clickPosition: IclickPosition;
  setClickPosition: React.Dispatch<React.SetStateAction<IclickPosition>>;
}> = ({ clickPosition, setClickPosition }) => {
  const [editingrelatioon, setEditingRelation] = React.useState(false);
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
              One-To-One
            </p>
            <div className="svg-div  justify-center items-center  hidden text-gray-500 group-hover:flex">
              <i className="fa-solid fa-pen text-[14px]"></i>
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-[140px] z-[1000] absolute text-grey-800 group cursor-pointer rounded border-indigo-700 p-2 focus:outline-none border-0 bg-[#1e293b] ">
          <ul className="relative text-white">
            <li className="rounded px-2 py-2 capitalize hover:bg-teal-500">
              one-to-one
            </li>
            <li className="rounded px-2 py-2 capitalize hover:bg-teal-500">
              one-to-many
            </li>
            <li className="rounded px-2 py-2 capitalize hover:bg-teal-500">
              many-to-one
            </li>
            <hr className="border-grey-200 my-1" />
            <li className="cursor-pointer flex text-[13px] justify-start items-center rounded px-2 py-2 hover:bg-red-200 hover:text-red-600">
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
