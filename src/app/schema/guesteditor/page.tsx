"use client";
import SchemaComponent from "@/components/Schema/SchemaComponent";
import { useAppDispatch } from "@/redux/dashboardstore/hook";
import { setIsGuestUser } from "@/redux/dashboardstore/reducer/schema/schema";
import React, { useEffect } from "react";

const Guest = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setIsGuestUser(true));
  }, []);
  return <SchemaComponent />;
};

export default Guest;
