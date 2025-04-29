import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Router } from "wouter";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router base="/p2">
      <App />
    </Router>
  </StrictMode>,
);
