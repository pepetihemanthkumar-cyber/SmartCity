import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { IssueProvider } from "./context/IssueContext";
import "leaflet/dist/leaflet.css";
import "./index.css"; // 🔥 important for dark mode + global styles

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <IssueProvider>
      <App />
    </IssueProvider>
  </React.StrictMode>
);