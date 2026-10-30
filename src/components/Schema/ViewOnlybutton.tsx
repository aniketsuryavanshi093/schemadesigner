import React from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

const ViewOnlybutton = () => {
  const router = useRouter();
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button
          radius="sm"
          variant="ghost"
          className="hover:!bg-[white] text-white hover:!text-black "
          startContent={<i className="fa-regular fa-eye text-orange-800"></i>}
          endContent={<i className="fa-solid  fa-chevron-down"></i>}
        >
          View Only
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4">
        <p className="text-start text-lg w-[300px]">
          You're not logged in. You can view this public diagram, but will need
          to login to save changes.
        </p>
        <div className="w-full flex justify-end items-center">
          <Button
            radius="sm"
            variant="solid"
            className=" text-white text-lg"
            onClick={() => router.push("/login")}
            color="success"
          >
            Login
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ViewOnlybutton;
