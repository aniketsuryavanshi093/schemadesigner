import { SchemaType } from "@/types";
import Link from "next/link";
import React from "react";
import PopoverComponent from "../Popover/PopoverComponent";
import OptionsContent from "../OptionsContainer/OptionsContainer";
import { getTimeAgo } from "@/utils";

const SchemaCard: React.FC<{ schema: SchemaType; key: string }> = ({
  schema,
  key,
}) => {
  return (
    <div key={key} className="relative block">
      <Link
        className="flex flex-col schemadivwrapper relative overflow-hidden rounded-lg border-2 border-t-0 border-gray-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        href={`/schema/${schema._id}`}
        prefetch={false}
      >
        <button
          className=""
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <PopoverComponent
            classname="px-2 py-2"
            placement="right-start"
            content={<OptionsContent schemaId={schema._id} />}
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
            src="https://drawsql-media.s3-us-east-2.amazonaws.com/screenshots/6444557/conversions/1714918853-352068-thumbnail.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-1 flex-col justify-between border-t border-gray-200 bg-white px-3 pt-2.5 pb-2">
          <h3 className="mt-2 flex-1 text-lg font-semibold leading-none text-gray-800">
            {schema.title}
          </h3>
          <div>
            <div className="flex items-center justify-between">
              <div className="my-0.5 flex items-center space-x-2">
                <p className="mb-0 text-xs text-gray-500">
                  Edited {getTimeAgo(schema.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SchemaCard;
