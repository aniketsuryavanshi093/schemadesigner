import React from "react";
import { SchemaType } from "@/types";
import SchemaCard from "./SchemaCard";

const SchemaDisplayContainer: React.FC<{
  Schemas: SchemaType[];
  isloading: boolean;
}> = ({ Schemas, isloading }) => {
  return (
    <div className="mx-auto grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      {isloading ? (
        <div className="relative block">
          <div className="flex flex-col schemadivwrapper relative overflow-hidden rounded-lg border-2 border-t-0 border-gray-200 hover:shadow-lg ">
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
          </div>
        </div>
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
