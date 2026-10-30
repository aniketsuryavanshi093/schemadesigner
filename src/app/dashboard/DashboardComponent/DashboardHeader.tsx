"use client";
import React from "react";
import {
  Avatar,
  AvatarIcon,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { UserType } from "@/types";

const DashboardHeader: React.FC<{
  user: UserType;
  isLoading: boolean;
}> = ({ user, isLoading }) => {
  console.log(user);
  const handleLogout = () => {
    signOut();
  };
  return (
    <div className="relative overflow-hidden  bg-indigo-700 pb-[19rem]">
      <div className="mx-auto flex justify-between max-w-7xl px-4  mt-4  sm:px-6 lg:px-8">
        <Image
          alt="logo"
          src="/logoschema.svg"
          className="z-[50]"
          width={40}
          height={40}
        />
        <Dropdown>
          <DropdownTrigger>
            <div className="flex justify-between cursor-pointer items-center">
              {isLoading ? (
                <Skeleton
                  as="p"
                  className=" w-[150px] h-[15px] bg-[#8f9193] rounded-md mx-3"
                />
              ) : (
                <p className="text-[#ebf4ff]  font-medium text-medium mx-3">
                  {user?.name || user?.email}
                </p>
              )}

              <Avatar
                icon={<AvatarIcon />}
                classNames={{
                  base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                  icon: "text-black/80",
                }}
              />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dropdown Variants" variant={"flat"}>
            <DropdownItem
              onClick={handleLogout}
              startContent={<i className="fa-solid  fa-right-from-bracket"></i>}
            >
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-y-0 inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0"
      >
        <div className="absolute inset-0 flex">
          <div className="h-full w-1/2 bg-[#3e3977]"></div>
          <div className="h-full w-1/2 bg-[#434190]"></div>
        </div>
        <div className="relative flex justify-center">
          <svg
            className="shrink-0"
            width="1750"
            height="308"
            viewBox="0 0 1750 308"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
              fill="#3c366b"
            ></path>
            <path
              d="M1465.84 308L16.816 0H1750v308h-284.16z"
              fill="#434190"
            ></path>
            <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#3E3977"></path>
            <path
              d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
              fill="#3C366B"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
