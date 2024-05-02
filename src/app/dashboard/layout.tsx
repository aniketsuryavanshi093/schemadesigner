"use client";
import React from "react";
import DashboardSidebar from "./DashboardComponent/DashboardSidebar";
import DashboardHeader from "./DashboardComponent/DashboardHeader";
import "./dashboard.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { SessionProvider, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getUserDetailsAction } from "@/apiservices/userservices";

type PageProps = {
  children: React.JSX.Element;
};
const Dashboardlayout: React.FC<PageProps> = ({ children }) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <QueryProvider>
        <LayoutContent>{children}</LayoutContent>
      </QueryProvider>
    </SessionProvider>
  );
};

const LayoutContent: React.FC<PageProps> = ({ children }) => {
  const { data, status } = useSession();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["userDetails"],
    queryFn: () => getUserDetailsAction(data?.user?.authToken),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!data?.user?.authToken,
    staleTime: 10 * 60 * 5,
  });

  return (
    <div className="w-full  min-h-screen bg-gray-100">
      <DashboardHeader
        user={userData?.data}
        isLoading={isLoading || status === "loading"}
      />
      <section className="-mt-32 relative">
        <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="divide-y divide-gray-300 lg:grid lg:grid-cols-12 lg:divide-x lg:divide-y-0">
              <DashboardSidebar />
              <div className="p-8 lg:col-span-9">{children}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboardlayout;
