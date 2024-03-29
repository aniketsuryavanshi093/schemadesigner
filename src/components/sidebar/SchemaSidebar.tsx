"use client";
import React, { useEffect, useState } from "react";
import CreateTableSidebar from "./CreateTable";
import { useAppSelector } from "@/redux/dashboardstore/hook";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import "./sidebar.scss";
import AccordianTitle from "./AccordianTitle";
import AccordionSchemaBody from "./AccordionSchemaBody";

const SchemaSidebar = () => {
  const { tables } = useAppSelector((state) => state.schemareducer);
  const [isOpen, sethandleOpen] = useState<string>("");
  useEffect(() => {
    if (tables.length) {
      const temp = tables.find((elem) => elem.isEditing);
      if (temp) {
        sethandleOpen(temp.tableIndex!);
      }
    }
  }, [tables]);

  return (
    <div className="w-[30%] schemawrapper">
      <CreateTableSidebar tables={tables} />
      <div className="sidebarschemawrtapper">
        {[...tables].reverse().map((table, index) => (
          <Accordion
            key={index}
            open={isOpen === table.tableIndex}
            style={{ borderColor: table.tableColor }}
            className={`directionchange border-l-8 relative`}
            icon={<Icon id={table.tableIndex!} open={isOpen} />}
          >
            <AccordionHeader
              className="pt-[8px] pb-[8px]"
              onClick={(e) => {
                sethandleOpen(
                  isOpen === table.tableIndex! ? "" : table.tableIndex!
                );
              }}
            >
              <AccordianTitle table={table} isOpen={isOpen} />
            </AccordionHeader>
            <AccordionBody className="pb-2 pt-0 px-2 bg-white tablecolumnwrapper">
              <AccordionSchemaBody table={table} />
            </AccordionBody>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default SchemaSidebar;

const Icon: React.FC<{ id: string; open: string }> = ({ id, open }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};
