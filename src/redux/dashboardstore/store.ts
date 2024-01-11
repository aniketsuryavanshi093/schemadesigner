import { configureStore } from "@reduxjs/toolkit";
import schemaRootReducer from "./reducer/schema";
import colorRootReducer from "./reducer/colors";

export const store = configureStore({
    reducer: {
        schemareducer: schemaRootReducer,
        colorreducer: colorRootReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
