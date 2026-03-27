import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

/* COMPONENTS */
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

/* PAGES */
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import Services from "./pages/Services";
import Map from "./pages/Map";
import Admin from "./pages/Admin";

/* CONTEXT */
import { IssueProvider } from "./context/IssueContext";


/* ================= LAYOUT ================= */

function Layout() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<Map />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/services" element={<Services />} />

        {/* 🔐 PROTECTED ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}


/* ================= APP ================= */

function App() {
  return (
    <IssueProvider>
      <Router>
        <Layout />
      </Router>
    </IssueProvider>
  );
}

export default App;