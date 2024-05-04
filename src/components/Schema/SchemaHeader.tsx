import { Button } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import "./schema.scss";
import ShareSchemaModal from "./ShareSchemaModal";
import { useAppSelector } from "@/redux/dashboardstore/hook";
import ViewOnlybutton from "./ViewOnlybutton";

const SchemaHeader = () => {
  const [shareModal, setShareModal] = useState(false);
  const { isShare } = useAppSelector((state) => state.schemareducer);
  return (
    <div className="top-navbar  flex w-full flex-wrap items-center justify-between bg-[#6366f1] px-4 py-1 leading-tight min-h-[55px] shadow-md">
      <div className="flex justify-start items-center">
        <div className="flex justify-start items-center">
          <Image
            alt="logo"
            src="/logoschema.svg"
            className="z-[50]"
            width={25}
            height={25}
          />
          <p className="text-lg mx-3 text-yellow-700">Schema Designer</p>
          <Button
            radius="none"
            variant="light"
            className="mx-4 text-[16px] text-white headerbtn"
          >
            File
          </Button>
          <Button
            variant="light"
            radius="none"
            className=" text-white  text-[16px] headerbtn"
            onClick={() => setShareModal(true)}
          >
            Share
          </Button>
        </div>
      </div>
      <div className="flex justify-start items-center mr-[100px]">
        <div className="flex hidden shrink-0 items-center text-lg text-white md:block">
          <a
            href="https://drawsql.app/diagrams"
            className="text-[#b2b7ff] hover:text-white hover:underline"
          >
            Diagrams
          </a>
          <span className="mx-1 text-indigo-lighter">&gt;</span> scaler schema
        </div>
      </div>
      <div className="flex justify-start items-center">
        {isShare && (
          <span data-v-1ff9a3f3="" className="text-yellow-400 mx-3">
            Saves disallowed
          </span>
        )}
        {isShare ? (
          <ViewOnlybutton />
        ) : (
          <div className="inline-flex">
            <a
              href="#"
              data-testid="canvas-navbar-save-btn"
              className="nav-button mt-0 flex items-center rounded rounded-r-none border px-4 py-2 text-lg leading-none text-white no-underline hover:bg-white hover:text-indigo-500 border-white"
            >
              <svg
                data-v-1ff9a3f3=""
                className="mr-2 inline-block h-3 w-2 stroke-current"
                viewBox="0 0 22 22"
              >
                <circle
                  data-v-1ff9a3f3=""
                  cx="11"
                  cy="11"
                  r="9"
                  fill="none"
                  stroke-width="3"
                ></circle>
              </svg>
              <span>Save</span>
            </a>
            <div>
              <button
                className="nav-button h-full mt-0 flex items-center rounded rounded-l-none border border-l-0 border-white px-1 py-1 leading-none text-white no-underline hover:bg-white hover:text-indigo-500 focus:outline-none"
                id="headlessui-menu-button-5"
                type="button"
              >
                <div className="svg-div h-[16px] w-[16px]  inline-block align-middle">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
      {shareModal && (
        <ShareSchemaModal
          isOpen={shareModal}
          onClose={() => setShareModal(false)}
        />
      )}
    </div>
  );
};

export default SchemaHeader;
