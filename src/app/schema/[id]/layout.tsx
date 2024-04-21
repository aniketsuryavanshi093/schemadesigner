"use client";
import SchemaSidebar from "@/components/sidebar/SchemaSidebar";
import { Providers } from "@/providers/Providers";
import React, { ReactNode, useEffect, useState } from "react";
import "./schema.scss";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getSchemaDetailsAction } from "@/apiservices/Schemaservices";
import { useAppDispatch, useAppSelector } from "@/redux/dashboardstore/hook";
import { InsertTable } from "@/redux/dashboardstore/reducer/schema/schema";
import { InsertRelation } from "@/redux/dashboardstore/reducer/relations/relationSlice";

const layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Providers>
      <LayoutContent>{children}</LayoutContent>
    </Providers>
  );
};

const LayoutContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data } = useSession();
  const tablesdata = useAppSelector((state) => state.schemareducer.tables);
  const tablesrelations = useAppSelector(
    (state) => state.relationreducer.relations
  );
  const [isLogging, setIsLogging] = useState(false);
  const { id } = useParams();
  const { data: schemaDetails } = useQuery({
    queryKey: ["schema", id],
    queryFn: () =>
      getSchemaDetailsAction({ id: id, authToken: data?.user?.authToken }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!data?.user?.authToken && !!id,
    staleTime: 10 * 60 * 5,
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      schemaDetails?.data?.data?.Schema &&
      schemaDetails.data.data.Schema.tablesdata
    ) {
      dispatch(
        InsertTable(JSON.parse(schemaDetails.data.data.Schema.tablesdata))
      );
      dispatch(
        InsertRelation(
          JSON.parse(schemaDetails.data.data.Schema.tablesrelations)
        )
      );
    }
  }, [schemaDetails]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && !isLogging) {
        setIsLogging(true);
        console.log("Logging data...");
        // Replace the following line with your actual API request
        // fetch(`${REACT_APP_SCREEN_SORT_URL}/generateScreenSort/122`, { method: 'POST' })
        navigator.sendBeacon(
          `${process.env.NEXT_SERVERURL}schema/update/${id}`,
          JSON.stringify({
            token: data?.user?.authToken,
            schema: {
              tablesdata: JSON.stringify(tablesdata),
              tablesrelations: JSON.stringify(tablesrelations),
            },
          })
        );
      } else if (document.visibilityState === "visible") {
        setIsLogging(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("unload", handleVisibilityChange);

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      window.removeEventListener("unload", handleVisibilityChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isLogging, id, data?.user?.authToken, tablesdata, tablesrelations]); // Dependency array includes isLogging

  return (
    <div className="flex w-full h-[100vh]">
      <SchemaSidebar />
      {children}
    </div>
  );
};

export default layout;
