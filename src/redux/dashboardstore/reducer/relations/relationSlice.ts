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
        updateRelation: (state,) => {
            state.relations = [...state.relations];
        },
    },
});
export const { addRelation, updateRelation } = relationSlice.actions;

export const relationReducer = relationSlice.reducer;
