"use client";
import SchemaSidebar from "@/components/sidebar/SchemaSidebar";
import { Providers } from "@/providers/Providers";
import React, { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/dashboardstore/hook";
import { sidebarOpen } from "@/redux/dashboardstore/reducer/schema/schema";
import { Button } from "@nextui-org/react";
import SchemaHeader from "@/components/Schema/SchemaHeader";

const layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Providers>
      <LayoutContent>{children}</LayoutContent>
    </Providers>
  );
};

const LayoutContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { sidebarOpen: sidebaropen } = useAppSelector(
    (state) => state.schemareducer
  );
  const dispatch = useAppDispatch();
  const handleSidebar = () => {
    dispatch(sidebarOpen(true));
  };
  return (
    <>
      <SchemaHeader></SchemaHeader>
      <div className="flex w-full h-[100vh]">
        {!sidebaropen && (
          <Button
            onClick={handleSidebar}
            className="absolute left-[1%] top-[16%] rounded-[4px] w-6 gap-0 p-0 min-w-10 z-[99999999999]"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </Button>
        )}
        {sidebaropen && <SchemaSidebar />}
        {children}
      </div>
    </>
  );
};

export default layout;
