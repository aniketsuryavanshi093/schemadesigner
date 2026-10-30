"use client";
import React, { useEffect } from "react";
import SchemaComponent from "@/components/Schema/SchemaComponent";
import { useAppDispatch } from "@/redux/dashboardstore/hook";
import { setIsGuestUser } from "@/redux/dashboardstore/reducer/schema/schema";

const Guest = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setIsGuestUser(true));
    return () => {
      dispatch(setIsGuestUser(false));
    }
  }, []);
  return <SchemaComponent />;
};

export default Guest;
