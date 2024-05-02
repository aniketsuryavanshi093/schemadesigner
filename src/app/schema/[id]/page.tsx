"use client";
import { getSchemaDetailsAction } from "@/apiservices/Schemaservices";
import Arrow, { IclickPosition } from "@/components/Arrows/Arrows";
import TableBox from "@/components/Table/TableBox";
import { useAppDispatch, useAppSelector } from "@/redux/dashboardstore/hook";
import { InsertTable } from "@/redux/dashboardstore/reducer/schema/schema";
import { Table } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

const nodeTypes = { tableBox: TableBox };
const rfStyle = {
  backgroundColor: "#ffff",
};

const Schema = () => {
  const [isExecuted, setIsExecuted] = useState(false);
  const { data } = useSession();
  const { tables } = useAppSelector((state) => state.schemareducer);
  const { id } = useParams();
  const { data: schemaDetails } = useQuery({
    queryKey: ["schema", id],
    queryFn: () =>
      getSchemaDetailsAction({ id: id, authToken: data?.user?.authToken }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!data?.user?.authToken && !!id,
    staleTime: 10 * 60 * 5,
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      schemaDetails?.data?.data?.Schema &&
      schemaDetails.data.data.Schema.tablesdata
    ) {
      console.log(
        JSON.parse(schemaDetails?.data?.data?.Schema?.tablesdata || [])
      );
      const data = JSON.parse(
        schemaDetails?.data?.data?.Schema?.tablesdata || []
      ) as Table[];
      const temp: Table[] = data.map((elem) => {
        return elem?.data?.value;
      });
      dispatch(InsertTable(temp));
      setNodes(data);
      setEdges(
        JSON.parse(
          schemaDetails?.data?.data?.Schema?.tablesrelations || []
        ) as Edge[]
      );
    }
  }, [schemaDetails]);
  const [nodes, setNodes, onNodesChange] = useNodesState<{ value: Table }>([]);
  console.log(nodes, tables);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [clickPosition, setClickPosition] = React.useState<IclickPosition>({
    open: false,
    x: 0,
    y: 0,
    edge: null,
  });
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => {
        console.log("connection", connection, eds);
        return addEdge(
          {
            ...connection,
            data: {
              relation: "onetoone",
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 10,
              height: 10,
              color: "black",
            },
            style: {
              strokeWidth: 1.8,
              stroke: "#a0aec0",
            },
          },
          eds
        );
      });
    },
    [setEdges]
  );

  useEffect(() => {
    if (tables.length > 0) {
      const tempNodes: Node[] = [];
      tables.forEach((element) => {
        let tableid = element.tableIndex;
        tempNodes.push({
          id: tableid,
          type: "tableBox",
          position: nodes.find((node) => node.id === tableid)?.position || {
            x: 0,
            y: 0,
          },
          data: { value: element },
        });
      });
      setNodes(tempNodes);
    }
  }, [tables]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isExecuted) {
        sendDataToServer();
        setIsExecuted(isExecuted);
        event.preventDefault();
        event.returnValue = "";
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && !isExecuted) {
        sendDataToServer();
        setIsExecuted(isExecuted);
      }
    };

    const handlePageHide = () => {
      if (!isExecuted) {
        sendDataToServer();
        setIsExecuted(isExecuted);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [id, data?.user?.authToken, nodes, edges]);

  const sendDataToServer = () => {
    console.log("Logging data...");

    const _data = {
      token: data?.user?.authToken,
      schema: {
        tablesdata: JSON.stringify(nodes),
        tablesrelations: JSON.stringify(edges),
      },
    };

    // Try using navigator.sendBeacon() first
    const url = `${process.env.NEXT_SERVERURL}schema/update/${id}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  const handleEdgeClick = (event: React.MouseEvent, edge: Edge) => {
    setClickPosition({
      open: !clickPosition.open,
      x: event.clientX,
      y: event.clientY,
      edge,
    });
  };

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={handleEdgeClick}
        nodeTypes={nodeTypes}
        fitView
        style={rfStyle}
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
      <Arrow
        clickPosition={clickPosition}
        setClickPosition={setClickPosition}
      />
    </ReactFlowProvider>
  );
};

export default Schema;
