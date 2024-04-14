"use client";
import { store } from "../redux/dashboardstore/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { QueryProvider } from "./QueryProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  let peristor = persistStore(store);
  store.subscribe(() => {});
  return (
    <Provider store={store}>
      <SessionProvider refetchOnWindowFocus={false}>
        <QueryProvider>{children}</QueryProvider>
      </SessionProvider>
    </Provider>
  );
}
