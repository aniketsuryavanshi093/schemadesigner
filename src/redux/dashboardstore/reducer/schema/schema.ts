import { Table, columns } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SchemainitialTypes = {
  tables: Table[];
};
const initialState: SchemainitialTypes = {
  tables: [],
};
const schemaSlice = createSlice({
  name: "tableSchema",
  initialState,
  reducers: {
    addTable: (state, action: PayloadAction<Table>) => {
      state.tables.push(action.payload);
    },
    removeClearEditing: (state) => {
      state.tables = state.tables.map((elem) =>
        elem.isEditing ? { ...elem, isEditing: false } : elem
      );
    },
    updateSaveTable: (state, action: PayloadAction<Table>) => {
      const updatedState = state.tables.map((elem) =>
        elem.tableIndex === action.payload.tableIndex
          ? { ...action.payload }
          : { ...elem }
      );
      state.tables = updatedState;
    },
    setEditTable: (state, action: PayloadAction<string>) => {
      const updatedState = state.tables.map((elem) =>
        elem.tableIndex === action.payload
          ? { ...elem, isEditing: true }
          : { ...elem }
      );
      state.tables = updatedState;
    },
    addColumnsAction: (
      state,
      action: PayloadAction<{
        column: columns;
        tableIndex: string;
        fromOutside: boolean;
      }>
    ) => {
      const updatedState = state.tables.map((elem) =>
        elem.tableIndex === action.payload.tableIndex
          ? {
            ...elem,
            isEditing: action.payload.fromOutside ? true : false,
            columns: [...elem.columns, action.payload.column],
          }
          : { ...elem }
      );
      state.tables = updatedState;
    },
    deleteTable: (state, action: PayloadAction<{ tableIndex: string }>) => {
      state.tables = state.tables.filter(
        (elem) => elem.tableIndex !== action.payload.tableIndex
      );
    },
    setIsEditing: (
      state,
      action: PayloadAction<{ tableindex: string; isEdit: boolean }>
    ) => {
      state.tables = state.tables.map((elem) =>
        elem.tableIndex === action.payload.tableindex
          ? { ...elem, isEditing: action.payload.isEdit }
          : elem
      );
    },
    updateColumnAction: (
      state,
      action: PayloadAction<{ column: columns; tableIndex: string }>
    ) => {
      const updatedState = state.tables.map((elem) => {
        if (elem.tableIndex === action.payload.tableIndex) {
          return {
            ...elem,
            isEditing: false,
            columns: elem.columns?.map((col) =>
              col.columnIndex === action.payload.column.columnIndex
                ? { ...action.payload.column, isEditing: false }
                : col
            ),
          };
        } else {
          return elem;
        }
      });
      state.tables = updatedState;
    },
    setcolumnEditing: (
      state,
      action: PayloadAction<{ columnIndex: number; tableIndex: string }>
    ) => {
      const updatedState = state.tables.map((elem) => {
        if (elem.tableIndex === action.payload.tableIndex) {
          return {
            ...elem,
            columns: elem.columns?.map((col) =>
              col.columnIndex === action.payload.columnIndex
                ? { ...col, isEditing: true }
                : col
            ),
          };
        } else {
          return elem;
        }
      });
      state.tables = updatedState;
    },
  },
});
export const {
  removeClearEditing,
  setIsEditing,
  updateColumnAction,
  deleteTable,
  addTable,
  setcolumnEditing,
  updateSaveTable,
  addColumnsAction,
  setEditTable,
} = schemaSlice.actions;

export const scheamReducer = schemaSlice.reducer;
