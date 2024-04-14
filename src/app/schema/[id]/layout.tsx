"use client";
import SchemaSidebar from "@/components/sidebar/SchemaSidebar";
import { Providers } from "@/providers/Providers";
import React, { ReactNode } from "react";
import "./schema.scss";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getSchemaDetailsAction } from "@/apiservices/Schemaservices";

const layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Providers>
      <LayoutContent>{children}</LayoutContent>
    </Providers>
  );
};

const LayoutContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data } = useSession();
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

  return (
    <div className="flex w-full h-[100vh]">
      <SchemaSidebar />
      {children}
    </div>
  );
};

export default layout;
