"use client";
import { useParams } from "next/navigation";
import React from "react";
import Commonheader from "../../DashboardComponent/Commonheader";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getUserFolderDetailsAction } from "@/apiservices/userservices";
import { FolderType, SchemaType } from "@/types";
import SchemaDisplayContainer from "@/components/SchemasDisplayContainer/SchemaDisplayContainer";

const Folder = () => {
  const { id } = useParams();
  const { data, status } = useSession();
  const { data: FolderDetail, isLoading } = useQuery({
    queryFn: () =>
      getUserFolderDetailsAction({ id, authToken: data?.user?.authToken }),
    queryKey: ["folder", id],
    refetchOnMount: false,
    staleTime: 10 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id && !!data?.user?.authToken,
  });
  const Folder = FolderDetail?.data?.folder[0]?.folder as FolderType;
  const schemas = FolderDetail?.data?.folder[0].schemas as SchemaType[];
  const HeaderComponnet = () => {
    return (
      <p className="mb-0 text-2xl font-semibold leading-6 text-gray-700">
        {Folder?.name}
      </p>
    );
  };
  return (
    <div>
      <Commonheader HeaderComponent={HeaderComponnet} />
      <SchemaDisplayContainer
        Schemas={schemas}
        isloading={isLoading || status === "loading"}
      />
    </div>
  );
};

export default Folder;
