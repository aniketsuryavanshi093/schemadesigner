"use client";
import { store } from "../redux/dashboardstore/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  let peristor = persistStore(store);
  store.subscribe(() => {});
  return (
    <Provider store={store}>
      <PersistGate persistor={peristor}>{children}</PersistGate>
    </Provider>
  );
}
