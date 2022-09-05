import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "jotai";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "~/src/App";
import Home from "~/src/pages/Home";
import Login from "~/src/pages/Login";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
