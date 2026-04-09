import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { IssueProvider } from "./context/IssueContext";

import "leaflet/dist/leaflet.css";
import "./index.css";
const GOOGLE_CLIENT_ID = "1072154065399-po1jasqhc10lmulmn38umcc13vi4eooi.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <IssueProvider>   {/* ✅ ONLY HERE */}
        <App />
      </IssueProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);