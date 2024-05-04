"use client";
import { useEffect } from "react";
import SchemaComponent from "@/components/Schema/SchemaComponent";
import { useAppDispatch } from "@/redux/dashboardstore/hook";
import { setIsSharestate } from "@/redux/dashboardstore/reducer/schema/schema";

const SharePage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setIsSharestate(true));
  }, []);
  return <SchemaComponent isShare />;
};

export default SharePage;
