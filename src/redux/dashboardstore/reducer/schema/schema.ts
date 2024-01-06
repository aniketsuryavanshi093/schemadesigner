import { Table, columns } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type initialTypes = {
  tables: Table[],
}
const initialState: initialTypes = {
  tables: [],
};
const schemaSlice = createSlice({
  name: 'tableSchema',
  initialState,
  reducers: {
    addTable: (state, action: PayloadAction<Table>) => {
      state.tables.push(action.payload);
    },
    updateSaveTable: (state, action: PayloadAction<Table>) => {
      const updatedState = state.tables.map((elem) => elem.tableIndex === action.payload.tableIndex ? { ...action.payload } : { ...elem })
      state.tables = updatedState;
    },
    setEditTable: (state, action: PayloadAction<number>) => {
      const updatedState = state.tables.map((elem) => elem.tableIndex === action.payload ? { ...elem, isEditing: true } : { ...elem })
      state.tables = updatedState;
    },
    addColumnsAction: (state, action: PayloadAction<{ column: columns, tableIndex: number }>) => {
      const updatedState = state.tables.map((elem) => elem.tableIndex === action.payload.tableIndex ? { ...elem, columns: [...elem.columns, action.payload.column] } : { ...elem })
      state.tables = updatedState;
    },
    saveColumn: (state, action: PayloadAction<{ column: columns, tableIndex: number }>) => {
      const updatedState = state.tables.map(elem => {
        if (elem.tableIndex === action.payload.tableIndex) {
          return { ...elem, columns: elem.columns?.map(col => col.columnIndex === action.payload.column.columnIndex ? action.payload.column : col) }
        }
        else {
          return elem
        }
      })
      state.tables = updatedState;
    }
  }
  ,
});
export const { saveColumn, addTable, updateSaveTable, addColumnsAction, setEditTable } =
  schemaSlice.actions;

export const scheamReducer = schemaSlice.reducer;
