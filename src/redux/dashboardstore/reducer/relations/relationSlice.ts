import { relationtype } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type relationInitialState = {
  relations: relationtype[];
};
const initialState: relationInitialState = {
  relations: [],
};
const relationSlice = createSlice({
  name: "relationSchema",
  initialState,
  reducers: {
    addRelation: (state, action: PayloadAction<relationtype>) => {
      state.relations.push(action.payload);
    },
    updateRelation: (state) => {
      state.relations = [...state.relations];
    },
    removeRelationofTable: (state, action: PayloadAction<string>) => {
      state.relations = state.relations.filter(
        (relation) =>
          !relation.head.includes(action.payload) &&
          !relation.tail.includes(action.payload)
      );
    },
  },
});
export const { addRelation, updateRelation, removeRelationofTable } =
  relationSlice.actions;

export const relationReducer = relationSlice.reducer;
