"use client";
import React from "react";
import Commonheader from "./DashboardComponent/Commonheader";
import { SnackbarProvider } from "notistack";
import { useSession } from "next-auth/react";
import useGetUserDaigrams from "@/hooks/useGetUserDaigrams";
import { SchemaType } from "@/types";
import SchemaDisplayContainer from "@/components/SchemasDisplayContainer/SchemaDisplayContainer";
import "./dashboard.css";

const MyDaigram = () => {
  const { status } = useSession();
  const [filtervalue, setfiltervalue] = React.useState("LastCreatedAt");
  const { userSchema, isLoading } = useGetUserDaigrams(filtervalue)
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
        <Commonheader filterChanged={(e) => setfiltervalue(e)} title="My Daigrams" />
        <SchemaDisplayContainer
          Schemas={schemas}
          isloading={isLoading || status === "loading"}
        />
      </div>
    </SnackbarProvider>
  );
};

export default MyDaigram;
