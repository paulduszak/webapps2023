import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { RequestProvider } from "react-request-hook";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RequestProvider value={axiosInstance}>
      <App />
    </RequestProvider>
  </React.StrictMode>
);
