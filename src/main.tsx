import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFound from "./components/NotFound.tsx";
import {Provider} from "react-redux";
import {store} from "./store/index.ts";
import {ThemeProvider} from "./context/ThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <Routes>
              <Route path="/search/:page" element={<App />} />
              <Route path="/" element={<App />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
);
