import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ControlledPage from "./components/ControlledPage.tsx";
import UncontrolledPage from "./components/UncontrolledPage.tsx";
import Layout from "./components/Layout.tsx";
import store from "./store/store.ts";
import {Provider} from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<App />} />
            <Route path="/uncontrolled" element={<UncontrolledPage />} />
            <Route path="/controlled" element={<ControlledPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
