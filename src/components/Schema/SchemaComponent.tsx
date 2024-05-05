import { getSchemaDetailsAction } from "@/apiservices/Schemaservices";
import { useAppDispatch, useAppSelector } from "@/redux/dashboardstore/hook";
import { InsertTable } from "@/redux/dashboardstore/reducer/schema/schema";
import { Table } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  Connection,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import Arrow, { IclickPosition } from "../Arrows/Arrows";
import TableBox from "../Table/TableBox";
import useSchemaHook from "./useSchemaHook";

const nodeTypes = { tableBox: TableBox };
const rfStyle = {
  backgroundColor: "#ffff",
};
const SchemaComponent: React.FC<{ isShare?: boolean }> = ({ isShare }) => {
  const [isExecuted, setIsExecuted] = useState(false);
  const {
    sendDataToServer,
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
  } = useSchemaHook(isShare!);
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
    enabled: isShare ? true : !!data?.user?.authToken && !!id,
    staleTime: 10 * 60 * 5,
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      schemaDetails?.data?.data?.Schema &&
      schemaDetails.data.data.Schema.tablesdata
    ) {
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

  const [clickPosition, setClickPosition] = React.useState<IclickPosition>({
    open: false,
    x: 0,
    y: 0,
    edge: null,
  });
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => {
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
            x: -1094.4950200227331,
            y: -1179.5467872801296,
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

  const handleEdgeClick = (event: React.MouseEvent, edge: Edge) => {
    if (isShare) {
      return;
    }
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

export default SchemaComponent;
