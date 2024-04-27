"use client";
import SchemaSidebar from "@/components/sidebar/SchemaSidebar";
import { Providers } from "@/providers/Providers";
import React, { ReactNode } from "react";
import "./schema.scss";
import { useAppDispatch, useAppSelector } from "@/redux/dashboardstore/hook";
import { sidebarOpen } from "@/redux/dashboardstore/reducer/schema/schema";
import { Button } from "@nextui-org/react";

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
  // Dependency array includes isLogging
  const handleSidebar = () => {
    dispatch(sidebarOpen(true));
  };
  return (
    <div className="flex w-full h-[100vh]">
      {!sidebaropen && (
        <Button
          onClick={handleSidebar}
          className="absolute left-[2%] top-[3%] rounded-[4px] w-6 gap-0 p-0 min-w-10 z-[99999999999]"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </Button>
      )}
      {sidebaropen && <SchemaSidebar />}
      {children}
    </div>
  );
};

export default layout;
