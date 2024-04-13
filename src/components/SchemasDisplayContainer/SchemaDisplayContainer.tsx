import React from "react";
import { SchemaType } from "@/types";
import SchemaCard from "./SchemaCard";
import { Skeleton } from "@nextui-org/react";

const SchemaDisplayContainer: React.FC<{
  Schemas: SchemaType[];
  isloading: boolean;
}> = ({ Schemas, isloading }) => {
  return (
    <div className="mx-auto grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      {isloading ? (
        Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="relative block">
              <div className="flex flex-col schemadivwrapper relative overflow-hidden rounded-lg border-2 border-t-0 border-gray-200 hover:shadow-lg ">
                <Skeleton className="px-2 py-2">
                  <div className="relative block h-48 shrink-0 bg-gray-200"></div>
                </Skeleton>
                <div className="flex flex-1 flex-col justify-between border-t border-gray-200 bg-white px-3 pt-2.5 pb-2">
                  <Skeleton className="rounded-md">
                    <h3 className="rounded-md h-2 flex-1 text-lg font-semibold leading-none text-gray-800 w-8"></h3>
                  </Skeleton>
                  <div className="flex items-center justify-between w-100">
                    <div className="my-0.5 w-100 flex items-center space-x-2">
                      <Skeleton className="rounded-md w-100 w-20 mt-2">
                        <p className="mb-0 text-xs text-gray-500 h-2 w-7"></p>
                      </Skeleton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
      ) : Schemas?.length === 0 ? (
        <div>
          <p>No Schema found </p>
        </div>
      ) : (
        Schemas?.map((schema) => (
          <SchemaCard key={schema._id} schema={schema} />
        ))
      )}
    </div>
  );
};

export default SchemaDisplayContainer;
