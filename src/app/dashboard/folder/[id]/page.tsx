"use client";
import { useParams } from "next/navigation";
import React from "react";
import Commonheader from "../../DashboardComponent/Commonheader";

const Folder = () => {
  const { id } = useParams();
  const HeaderComponnet = () => {
    return (
      <p className="mb-0 text-2xl font-semibold leading-6 text-gray-700">
        FolderName
      </p>
    );
  };
  return (
    <div>
      <Commonheader HeaderComponent={HeaderComponnet} />
    </div>
  );
};

export default Folder;
