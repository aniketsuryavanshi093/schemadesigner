import { useAppDispatch } from "@/redux/dashboardstore/hook";
import {
  addRelation,
  updateRelationShip,
  updateRelation,
  removeRelationShip,
} from "@/redux/dashboardstore/reducer/relations/relationSlice";
import { columnrelationtype, relationtype } from "@/types";

const useTableRelationHook = () => {
  const dispatch = useAppDispatch();
  const addRelations = (refs: relationtype) => {
    dispatch(addRelation(refs));
  };
  const updateAllRelation = () => {
    dispatch(updateRelation());
  };
  const updateRelationShipType = (
    relation: relationtype,
    updateto: columnrelationtype
  ) => {
    dispatch(updateRelationShip({ ...relation, relation: updateto }));
  };
  const removeRelation = (relation: relationtype) => {
    dispatch(removeRelationShip(relation.id));
  };
  return {
    addRelations,
    updateAllRelation,
    updateRelationShipType,
    removeRelation,
  };
};

export default useTableRelationHook;
