import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type trackerInitialState = {
  currentboxid: string;
  currenthandlerid: string;
  isDragging: boolean;
};
const initialState: trackerInitialState = {
  currentboxid: "",
  currenthandlerid: "",
  isDragging: false,
};
const trackarrowSlice = createSlice({
  name: "trackarrowSchema",
  initialState,
  reducers: {
    setIsDragging: (state, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload;
    },
    setCurentStateArrowTracker: (
      state,
      action: PayloadAction<{ currentboxid: string; currenthandlerid: string }>
    ) => {
      state.currentboxid = action.payload.currentboxid;
      state.currenthandlerid = action.payload.currenthandlerid;
    },
  },
});
export const { setIsDragging, setCurentStateArrowTracker } =
  trackarrowSlice.actions;

export const TrackArrowReducer = trackarrowSlice.reducer;
