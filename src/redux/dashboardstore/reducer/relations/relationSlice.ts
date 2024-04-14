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
    InsertRelation: (state, action: PayloadAction<relationtype[]>) => {
      state.relations = action.payload;
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
    updateRelationShip: (state, action: PayloadAction<relationtype>) => {
      // Find the index of the relationship to be updated
      const index = state.relations.findIndex(
        (relation) => relation.id === action.payload.id
      );
      // If the relationship exists, update it
      if (index !== -1) {
        state.relations[index] = action.payload;
      }
    },
    removeRelationShip: (state, action: PayloadAction<string>) => {
      // Find the index of the relationship to be updated
      state.relations = state.relations.filter(
        (relation) => relation.id !== action.payload
      );
    },
  },
});
export const {
  addRelation,
  updateRelation,
  removeRelationofTable,
  updateRelationShip,
  InsertRelation,
  removeRelationShip,
} = relationSlice.actions;

export const relationReducer = relationSlice.reducer;
