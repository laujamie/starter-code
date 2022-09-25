import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "jotai";
import { useAtomsDebugValue } from "jotai/devtools";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "~/src/App";
import Home from "~/src/pages/Home";
import Login from "~/src/pages/Login";
import Callback from "~/src/pages/Callback";
import Logout from "~/src/pages/Logout";
import NotFound from "~/src/pages/NotFound";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const DebugAtoms = () => {
  useAtomsDebugValue();
  return null;
};

root.render(
  <React.StrictMode>
    <Provider>
      <DebugAtoms />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="callback" element={<Callback />} />
            <Route path="logout" element={<Logout />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
