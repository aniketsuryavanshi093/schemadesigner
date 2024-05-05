import { Table } from "@/types";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEdgesState, useNodesState } from "reactflow";

const useSchemaHook = (isShare: boolean) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<{ value: Table }>([]);
  const { id } = useParams();
  const { data } = useSession();
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const sendDataToServer = (callback?: () => any) => {
    if (isShare) {
      return;
    }
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
        if (callback) {
          callback();
        }
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };
  return {
    sendDataToServer,
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
  };
};

export default useSchemaHook;
