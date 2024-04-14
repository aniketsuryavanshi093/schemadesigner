"use client";
import POCDragDrop from "@/components/POCDragDrop";
import { useAppSelector } from "@/redux/dashboardstore/hook";
import React from "react";

const TablesContainer = () => {
  const { tables } = useAppSelector((state) => state.schemareducer);

  return (
    <div className="schemamainwrapper h-[100vh] p-11">
      <POCDragDrop tables={tables} />
    </div>
  );
};

export default TablesContainer;
