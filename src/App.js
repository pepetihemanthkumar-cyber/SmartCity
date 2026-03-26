import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

/* COMPONENTS */
import Navbar from "./components/Navbar";

/* PAGES */
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import Services from "./pages/Services";
import Map from "./pages/Map";

/* CONTEXT */
import { IssueProvider } from "./context/IssueContext";


/* LAYOUT */

function Layout() {

  const location = useLocation();

  /* HIDE NAVBAR ONLY ON LOGIN */
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* MAIN PAGES */}
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<Map />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/services" element={<Services />} />

      </Routes>
    </>
  );
}


/* APP */

function App() {
  return (
    <IssueProvider>   {/* 🔥 IMPORTANT */}
      <Router>
        <Layout />
      </Router>
    </IssueProvider>
  );
}

export default App;