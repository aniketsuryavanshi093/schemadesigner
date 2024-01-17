import { combineReducers, configureStore } from "@reduxjs/toolkit";
import schemaRootReducer from "./reducer/schema";
import colorRootReducer from "./reducer/colors";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { colorInitialState } from "./reducer/colors/colorSlice";
import { SchemainitialTypes } from "./reducer/schema/schema";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { relationInitialState, relationReducer } from "./reducer/relations/relationSlice";

const persistConfig = {
  key: "root",
  stateReconciler: autoMergeLevel2,
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  schemareducer: schemaRootReducer,
  colorreducer: colorRootReducer,
  relationreducer: relationReducer
});

const persistedState = persistReducer<RootState, any>(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedState,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = {
  schemareducer: SchemainitialTypes & PersistPartial;
  colorreducer: colorInitialState & PersistPartial;
  relationreducer: relationInitialState & PersistPartial;
};
export type AppDispatch = typeof store.dispatch;
