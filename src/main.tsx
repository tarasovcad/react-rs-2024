import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ControlledPage from "./components/ControlledPage.tsx";
import UncontrolledPage from "./components/UncontrolledPage.tsx";
import Layout from "./components/Layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/uncontrolled" element={<UncontrolledPage />} />
          <Route path="/controlled" element={<ControlledPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
