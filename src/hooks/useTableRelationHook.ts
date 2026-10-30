import { useAppDispatch } from "@/redux/dashboardstore/hook";
import { columnrelationtype } from "@/types";
import { Edge, MarkerType, useReactFlow } from "reactflow";

const useTableRelationHook = () => {
  const { getEdges, setEdges, } = useReactFlow();

  const updateRelationShipType = (
    relation: Edge,
    relationType: columnrelationtype
  ) => {
    console.log(relation, relationType);

    let temp: any = {};
    if (relationType === "onetoone") {
      temp.markerEnd = {
        type: MarkerType.ArrowClosed,
        width: 10,
        height: 10,
        color: "black",
      };
      temp.markerStart = "";
    }
    if (relationType === "manytomamy") {
      temp.markerEnd = {
        type: MarkerType.ArrowClosed,
        width: 10,
        height: 10,
        color: "black",
      };
      temp.markerStart = {
        type: MarkerType.ArrowClosed,
        width: 10,
        height: 10,
        color: "black",
      };
    }
    if (relationType === "onetomany") {
      temp.markerEnd = {
        type: MarkerType.ArrowClosed,
        width: 10,
        height: 10,
        color: "orange",
      };
      temp.markerStart = {
        type: MarkerType.ArrowClosed,
        width: 15,
        color: "black",
        height: 15,
      };
    }
    setEdges(
      getEdges().map((elem) =>
        elem.id !== relation.id
          ? elem
          : {
            ...elem,
            data: { relation: relationType },
            ...temp,
          }
      )
    );
  };
  const removeRelation = (relation: Edge) => {
    setEdges(getEdges().filter((elem) => elem.id !== relation.id));
  };
  return {
    // addRelations,
    // updateAllRelation,
    updateRelationShipType,
    removeRelation,
  };
};

export default useTableRelationHook;
