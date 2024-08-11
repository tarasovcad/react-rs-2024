import ErrorBoundary from "@/components/ErrorBoundary";
import Layout from "@/components/layout/Layout";
import { SearchProvider } from "@/providers/SearchProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { store } from "@/store";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <SearchProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SearchProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
