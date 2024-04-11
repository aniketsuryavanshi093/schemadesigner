"use client";
import { useParams } from "next/navigation";
import React from "react";
import Commonheader from "../../DashboardComponent/Commonheader";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getUserFolderDetailsAction } from "@/apiservices/userservices";

const Folder = () => {
  const { id } = useParams();
  const { data } = useSession();
  const { data: FolderDetail, isLoading } = useQuery({
    queryFn: () =>
      getUserFolderDetailsAction({ id, authToken: data?.user?.authToken }),
    queryKey: ["folder", id],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id && !!data?.user?.authToken,
  });
  console.log(FolderDetail, isLoading);
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
