import { configureStore } from "@reduxjs/toolkit";
import schemaRootReducer from "./reducer/schema";

export const store = configureStore({
    reducer: {
        schemareducer: schemaRootReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
