"use client";
import React from "react";
import Commonheader from "./DashboardComponent/Commonheader";
import { SnackbarProvider } from "notistack";
import { useQuery } from "@tanstack/react-query";
import { getUserSchemaAction } from "@/apiservices/userservices";
import { useSession } from "next-auth/react";
import { SchemaType } from "@/types";
import SchemaDisplayContainer from "@/components/SchemasDisplayContainer/SchemaDisplayContainer";
import "./dashboard.css";

const MyDaigram = () => {
  const { data, status } = useSession();
  const { data: userSchema, isLoading } = useQuery({
    queryFn: () => getUserSchemaAction(data?.user?.authToken),
    queryKey: ["userSchemas"],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!data?.user?.authToken,
    staleTime: 10 * 60 * 5,
  });
  const schemas = userSchema?.data?.data[0]?.schemas as SchemaType[];

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      iconVariant={{
        success: "✅",
        error: "✖️",
        warning: "⚠️",
        info: "ℹ️",
      }}
    >
      <div>
        <Commonheader title="My Daigrams" />
        <SchemaDisplayContainer
          Schemas={schemas}
          isloading={isLoading || status === "loading"}
        />
      </div>
    </SnackbarProvider>
  );
};

export default MyDaigram;
