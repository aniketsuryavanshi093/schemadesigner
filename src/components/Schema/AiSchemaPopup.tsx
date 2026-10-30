"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Spinner,
} from "@nextui-org/react";
import { Bot, SendHorizonal, Sparkles } from "lucide-react";
import { AISchemaResponse, Table } from "@/types";
import useSchemaHook from "./useSchemaHook";
import { v1 as uuidv1 } from "uuid";

import enqueSnackBar from "@/utils/enqueSnackBar";
import { Edge } from "reactflow";
import { InsertTable } from "@/redux/dashboardstore/reducer/schema/schema";
import { useAppDispatch } from "@/redux/dashboardstore/hook";
const dummy = {
  success: true,
  data: {
    tables: [
      {
        tableName: "departments",
        tableColor: "#6366f1",
        isEditing: false,
        columns: [
          {
            columnName: "id",
            columnDataType: "bigint",
            columnIndexType: "primary",
            isNullable: false,
            comment: "Unique identifier for the department",
          },
          {
            columnName: "name",
            columnDataType: "varchar",
            columnIndexType: "unique",
            isNullable: false,
            comment: "Name of the department",
          },
          {
            columnName: "building_location",
            columnDataType: "varchar",
            columnIndexType: "none",
            isNullable: true,
            comment: "Physical location of the department",
          },
        ],
        tableComment: "Stores hospital departments information",
      },
      {
        tableName: "doctors",
        tableColor: "#10b981",
        isEditing: false,
        columns: [
          {
            columnName: "id",
            columnDataType: "bigint",
            columnIndexType: "primary",
            isNullable: false,
            comment: "Unique identifier for the doctor",
          },
          {
            columnName: "department_id",
            columnDataType: "bigint",
            columnIndexType: "index",
            isNullable: false,
            comment: "Foreign key to departments",
          },
          {
            columnName: "first_name",
            columnDataType: "varchar",
            columnIndexType: "none",
            isNullable: false,
            comment: "Doctor's first name",
          },
          {
            columnName: "last_name",
            columnDataType: "varchar",
            columnIndexType: "none",
            isNullable: false,
            comment: "Doctor's last name",
          },
          {
            columnName: "specialization",
            columnDataType: "varchar",
            columnIndexType: "none",
            isNullable: false,
            comment: "Area of medical expertise",
          },
          {
            columnName: "license_number",
            columnDataType: "varchar",
            columnIndexType: "unique",
            isNullable: false,
            comment: "Medical license identifier",
          },
        ],
        tableComment: "Details of medical practitioners",
      },
      {
        tableName: "patients",
        tableColor: "#f59e0b",
        isEditing: false,
        columns: [
          {
            columnName: "id",
            columnDataType: "bigint",
            columnIndexType: "primary",
            isNullable: false,
            comment: "Unique identifier for the patient",
          },
          {
            columnName: "first_name",
            columnDataType: "varchar",
            columnIndexType: "none",
            isNullable: false,
            comment: "Patient's first name",
          },
          {
            columnName: "last_name",
            columnDataType: "varchar",
            columnIndexType: "none",
            isNullable: false,
            comment: "Patient's last name",
          },
          {
            columnName: "date_of_birth",
            columnDataType: "date",
            columnIndexType: "none",
            isNullable: false,
            comment: "Patient's birth date",
          },
          {
            columnName: "gender",
            columnDataType: "enum",
            columnIndexType: "none",
            isNullable: false,
            comment: "Patient gender",
          },
          {
            columnName: "phone",
            columnDataType: "varchar",
            columnIndexType: "none",
            isNullable: true,
            comment: "Contact number",
          },
        ],
        tableComment: "Stores patient personal information",
      },
      {
        tableName: "appointments",
        tableColor: "#ef4444",
        isEditing: false,
        columns: [
          {
            columnName: "id",
            columnDataType: "bigint",
            columnIndexType: "primary",
            isNullable: false,
            comment: "Unique identifier for the appointment",
          },
          {
            columnName: "patient_id",
            columnDataType: "bigint",
            columnIndexType: "index",
            isNullable: false,
            comment: "Reference to patient",
          },
          {
            columnName: "doctor_id",
            columnDataType: "bigint",
            columnIndexType: "index",
            isNullable: false,
            comment: "Reference to doctor",
          },
          {
            columnName: "appointment_time",
            columnDataType: "datetime",
            columnIndexType: "none",
            isNullable: false,
            comment: "Scheduled date and time",
          },
          {
            columnName: "status",
            columnDataType: "enum",
            columnIndexType: "none",
            isNullable: false,
            comment: "Current status of appointment",
          },
        ],
        tableComment: "Manages patient-doctor scheduled meetings",
      },
      {
        tableName: "medical_records",
        tableColor: "#8b5cf6",
        isEditing: false,
        columns: [
          {
            columnName: "id",
            columnDataType: "bigint",
            columnIndexType: "primary",
            isNullable: false,
            comment: "Unique record identifier",
          },
          {
            columnName: "patient_id",
            columnDataType: "bigint",
            columnIndexType: "index",
            isNullable: false,
            comment: "Patient associated with record",
          },
          {
            columnName: "doctor_id",
            columnDataType: "bigint",
            columnIndexType: "index",
            isNullable: false,
            comment: "Doctor who created the record",
          },
          {
            columnName: "diagnosis",
            columnDataType: "varchar",
            columnIndexType: "none",
            isNullable: false,
            comment: "Medical diagnosis details",
          },
          {
            columnName: "treatment_plan",
            columnDataType: "varchar",
            columnIndexType: "none",
            isNullable: true,
            comment: "Proposed treatment",
          },
          {
            columnName: "created_at",
            columnDataType: "datetime",
            columnIndexType: "none",
            isNullable: false,
            comment: "Timestamp of record creation",
          },
        ],
        tableComment: "Historical medical data for patients",
      },
      {
        tableName: "rooms",
        tableColor: "#6366f1",
        isEditing: false,
        columns: [
          {
            columnName: "id",
            columnDataType: "bigint",
            columnIndexType: "primary",
            isNullable: false,
            comment: "Unique identifier for the room",
          },
          {
            columnName: "room_number",
            columnDataType: "varchar",
            columnIndexType: "unique",
            isNullable: false,
            comment: "Physical room number",
          },
          {
            columnName: "room_type",
            columnDataType: "enum",
            columnIndexType: "none",
            isNullable: false,
            comment: "Type of room (ICU, General, Private)",
          },
          {
            columnName: "is_occupied",
            columnDataType: "boolean",
            columnIndexType: "none",
            isNullable: false,
            comment: "Current occupancy status",
          },
        ],
        tableComment: "Hospital room inventory",
      },
    ],
    relations: [
      {
        id: "rel_dept_doc",
        tablefrom: "departments",
        tableto: "doctors",
        head: "id",
        tail: "department_id",
        relation: "onetomany",
      },
      {
        id: "rel_patient_app",
        tablefrom: "patients",
        tableto: "appointments",
        head: "id",
        tail: "patient_id",
        relation: "onetomany",
      },
      {
        id: "rel_doc_app",
        tablefrom: "doctors",
        tableto: "appointments",
        head: "id",
        tail: "doctor_id",
        relation: "onetomany",
      },
      {
        id: "rel_patient_rec",
        tablefrom: "patients",
        tableto: "medical_records",
        head: "id",
        tail: "patient_id",
        relation: "onetomany",
      },
      {
        id: "rel_doc_rec",
        tablefrom: "doctors",
        tableto: "medical_records",
        head: "id",
        tail: "doctor_id",
        relation: "onetomany",
      },
    ],
    schemaTitle: "Hospital Management System",
    description:
      "A comprehensive database schema for managing hospital operations including patients, doctors, departments, appointments, and medical records.",
  },
  message: "Schema generated successfully",
};
export default function AiSchemaPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AISchemaResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {
    sendDataToServer,
    nodes,
    setNodes,
    onNodesChange,
    getNodes,
    getEdges,
    edges,
    setEdges,
    updateGuestUserData,
    onEdgesChange,
  } = useSchemaHook(false);
  const handleSubmit = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      debugger;
      // const res = await fetch("/api/ai-schema", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ prompt }),
      // });

      // const data: AISchemaResponse = await res.json();
      const data = dummy;

      if (!data.success) {
        throw new Error(data.error || "Failed to generate schema");
      }
      if (data?.success) {
        enqueSnackBar({
          type: "success",
          message: "Schema generated successfully!",
        });
      }
      setResponse(data);
      handleUpdateSchema(data);
      setPrompt("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error calling AI API:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  const handleUpdateSchema = (data: AISchemaResponse) => {
    debugger;
    // const data = JSON.parse(
    //         schemaDetails?.data?.data?.Schema?.tablesdata || [],
    //       ) as Table[];
    // const temp: Table[] = data.map((elem: any) => {
    //   return elem?.data?.value;
    // });
    // dispatch(InsertTable(temp));
    //       setNodes(data);
    //       setEdges(
    //         JSON.parse(
    //           schemaDetails?.data?.data?.Schema?.tablesrelations || [],
    //         ) as Edge[],
    //       );
    //       setisNodesChecked(true);
    // id: "86b50660-15b1-11ef-8d6f-01bf5d2c3b49";
    // type: "tableBox";
    // position;
    // data;
    // width: 170;
    // height: 117;
    // positionAbsolute;

    const tables = data?.data?.tables as Table[];
    const relations = data?.data?.relations;
    const tempNodes: Node[] = [];
    tables.forEach((element) => {
      const _id = uuidv1();
      tempNodes.push({
        id: _id,
        type: "tableBox",
        position: nodes.find((node) => node.id === tableid)?.position || {
          x: -1094.4950200227331,
          y: -1179.5467872801296,
        },
        data: { value: { ...element, tableIndex: _id } },
        width: 170,
        height: 117,
        positionAbsolute: {
          x: -1912.6803000832465,
          y: -828.8959529684811,
        },
      });
    });
    // dispatch(InsertTable(tables));
    const temp: Table[] = tempNodes.map((elem: any) => {
      return elem?.data?.value;
    });
    dispatch(InsertTable(temp));
    setNodes(tempNodes);
    updateGuestUserData(tempNodes);
    setEdges(relations as any);
  };
  return (
    <>
      {/* Floating AI Button */}
      <Button
        isIconOnly
        radius="full"
        className="fixed bottom-6 right-6 z-50 h-16 w-16 bg-gradient-to-br from-violet-600 to-indigo-600 shadow-2xl hover:scale-105 transition-all duration-200"
        onPress={() => setIsOpen(true)}
      >
        <Bot className="text-white" size={28} />
      </Button>

      {/* AI Popup */}
      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        size="2xl"
        placement="bottom-center"
        backdrop="blur"
        classNames={{
          base: "bg-white text-black border border-[#6366f1]/20 shadow-2xl",
          header: "border-b border-[#6366f1]/10",
          footer: "border-t border-[#6366f1]/10",
          body: "py-6",
          closeButton: "hover:bg-[#6366f1]/10 text-[#6366f1]",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* Header */}
              <ModalHeader className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#6366f1] shadow-lg">
                  <Sparkles size={20} className="text-white" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-[#6366f1]">
                    AI Schema Assistant
                  </h2>

                  <p className="text-sm text-gray-500 font-normal">
                    Generate SQL schemas using prompts
                  </p>
                </div>
              </ModalHeader>

              {/* Body */}
              <ModalBody>
                {/* Suggestions */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    "Create ecommerce schema",
                    "Blog database design",
                    "Hospital management schema",
                    "Chat application DB",
                  ].map((item) => (
                    <button
                      key={item}
                      onClick={() => setPrompt(item)}
                      disabled={isLoading}
                      className="rounded-full border border-[#6366f1]/20 bg-[#6366f1]/5 px-4 py-2 text-sm text-[#6366f1] hover:bg-[#6366f1]/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {item}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <div className="flex items-center gap-3">
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe the schema you want to create..."
                    variant="bordered"
                    size="lg"
                    disabled={isLoading}
                    classNames={{
                      inputWrapper:
                        "border border-[#6366f1]/20 bg-white hover:border-[#6366f1] focus-within:border-[#6366f1]",
                    }}
                  />

                  <Button
                    isIconOnly
                    size="lg"
                    onPress={handleSubmit}
                    isLoading={isLoading}
                    disabled={isLoading || !prompt.trim()}
                    className="bg-[#6366f1] text-white shadow-md hover:scale-105 transition disabled:opacity-50"
                  >
                    {!isLoading && <SendHorizonal size={20} />}
                  </Button>
                </div>

                {/* Chat/Response Area */}
                <div className="mt-6 h-[250px] overflow-y-auto rounded-2xl border border-[#6366f1]/10 bg-[#6366f1]/5 p-4">
                  {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full gap-3">
                      <Spinner size="lg" color="secondary" />
                      <p className="text-sm text-gray-600">
                        Generating schema...
                      </p>
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm text-red-600 font-medium">
                        Error: {error}
                      </p>
                    </div>
                  )}

                  {response && response.success && response.data && (
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 border border-[#6366f1]/20">
                        <h3 className="font-semibold text-[#6366f1] mb-2">
                          {response.data.schemaTitle}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {response.data.description}
                        </p>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">
                            Tables: {response.data.tables.length}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {response.data.tables.map((table, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-[#6366f1]/10 text-[#6366f1] rounded-full text-xs font-medium"
                              >
                                {table.tableName}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 text-center">
                        Schema generated successfully! You can now use this in
                        your project.
                      </p>
                    </div>
                  )}

                  {!isLoading && !error && !response && (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-sm text-gray-500">
                        AI responses will appear here...
                      </p>
                    </div>
                  )}
                </div>
              </ModalBody>

              {/* Footer */}
              <ModalFooter>
                <Button
                  variant="light"
                  className="text-gray-600"
                  onPress={onClose}
                  disabled={isLoading}
                >
                  Close
                </Button>

                <Button
                  onPress={handleSubmit}
                  isLoading={isLoading}
                  disabled={isLoading || !prompt.trim()}
                  className="bg-[#6366f1] text-white disabled:opacity-50"
                >
                  Generate Schema
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
