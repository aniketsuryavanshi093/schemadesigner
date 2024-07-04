import { useAppDispatch, useAppSelector } from "@/redux/dashboardstore/hook";
import { InsertTable, setClearAll, setGuestUserState } from "@/redux/dashboardstore/reducer/schema/schema";
import { Table } from "@/types";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEdgesState, useNodesState, useReactFlow } from "reactflow";

const useSchemaHook = (isShare: boolean) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<{ value: Table }>([]);
  const { id } = useParams();
  const IsGuestUser = useAppSelector((state) => state.schemareducer.IsGuestUser)
  const { data } = useSession();
  const { getEdges, getNodes, } = useReactFlow();
  const dispatch = useAppDispatch()
  const [edges, setEdges, onEdgesChange,] = useEdgesState([]);
  const sendDataToServer = (callback?: () => any) => {
    if (isShare) {
      return;
    }
    const _data = {
      token: data?.user?.authToken,
      schema: {
        tablesdata: JSON.stringify(getNodes()),
        tablesrelations: JSON.stringify(getEdges()),
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
  const updateGuestUserData = (nodes?: any) => {
    if (IsGuestUser) {
      dispatch(setGuestUserState({
        edges: getEdges(),
        nodes: nodes ? nodes : getNodes(),
      }))
    }
  }
  const clearAll = () => {
    setNodes([])
    setEdges([])
    dispatch(InsertTable([]))
    dispatch(setGuestUserState({
      edges: [],
      nodes: [],
    }))
    dispatch(setClearAll(true))
  }
  return {
    sendDataToServer,
    nodes,
    setNodes,
    onNodesChange,
    updateGuestUserData,
    edges,
    setEdges,
    getEdges, getNodes,
    clearAll,
    onEdgesChange,
  };
};

export default useSchemaHook;
