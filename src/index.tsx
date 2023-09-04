import React from "react";
import App from "./app";
import { createRoot } from "react-dom/client";


createRoot(
  document.getElementById("ilfey-comments") as HTMLElement
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);