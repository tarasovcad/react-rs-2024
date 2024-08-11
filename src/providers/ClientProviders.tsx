"use client";
import { Provider } from "react-redux";
import { SearchProvider } from "./SearchProvider";
import { store } from "@/store";
import { Props } from "@/types/types";
import { ThemeProvider } from "./ThemeProvider";

export default function ClientProviders({ children }: Props) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SearchProvider>{children}</SearchProvider>
      </ThemeProvider>
    </Provider>
  );
}
