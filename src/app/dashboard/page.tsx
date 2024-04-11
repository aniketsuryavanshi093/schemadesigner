"use client";
import React from "react";
import Commonheader from "./DashboardComponent/Commonheader";
import Link from "next/link";
import "./dashboard.css";
import PopoverComponent from "@/components/Popover/PopoverComponent";
import { SnackbarProvider } from "notistack";
import OptionsContent from "@/components/OptionsContainer/OptionsContainer";

const MyDaigram = () => {

  return (

    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      iconVariant={{
        success: '✅',
        error: '✖️',
        warning: '⚠️',
        info: 'ℹ️',
      }}
    >
      <div>
        <Commonheader title="My Daigrams" />
        <div className="mx-auto grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          <div className="relative block">
            <Link
              className="flex flex-col schemadivwrapper relative overflow-hidden rounded-lg border-2 border-t-0 border-gray-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              href="/dashboard/favourites"
            >
              <button className="" onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}>
                <PopoverComponent
                  classname="px-2 py-2"
                  placement="right-start"
                  content={<OptionsContent />}
                  trigger={
                    <button className="opacity-0 absolute wrapper schemaoption p-2 bg-gray-700 rounded-sm top-2 right-2">
                      <i className="fa-solid fa-ellipsis text-white"></i>
                    </button>
                  }
                />
              </button>
              <div className="w-full bg-gradient-to-r from-emerald-500 to-emerald-300 h-[2px]"></div>
              <div className="relative block h-48 shrink-0 bg-gray-200">
                <img
                  className="h-48 w-full object-cover"
                  src="https://drawsql-media.s3-us-east-2.amazonaws.com/screenshots/5792557/conversions/1712579057-352068-thumbnail.jpg"
                  alt=""
                />
              </div>
              <div className="flex flex-1 flex-col justify-between border-t border-gray-200 bg-white px-3 pt-2.5 pb-2">
                <h3 className="mt-2 flex-1 text-lg font-semibold leading-none text-gray-800">
                  scaler schema
                </h3>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="my-0.5 flex items-center space-x-2">
                      <p className="mb-0 text-xs text-gray-500">
                        Edited 6 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </SnackbarProvider>

  );
};

export default MyDaigram;
