import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialTypes = {
  usedTableColors: string[];
};
const initialState: initialTypes = {
  usedTableColors: [],
};
const colorSlice = createSlice({
  name: "colorSchema",
  initialState,
  reducers: {
    setUsedColor: (state, action: PayloadAction<string>) => {
      state.usedTableColors.push(action.payload);
    },
    setUpdatedColors: (
      state,
      action: PayloadAction<{ currentcolor: string; newcolor: string }>
    ) => {
      const colors: string[] = [
        ...state.usedTableColors.filter(
          (elem) => elem !== action.payload.currentcolor
        ),
        action.payload.newcolor,
      ];
      state.usedTableColors = colors;
    },
  },
});
export const { setUsedColor, setUpdatedColors } = colorSlice.actions;

export const colorReducer = colorSlice.reducer;
