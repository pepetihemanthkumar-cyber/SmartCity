import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";

/* 🔥 TOAST */
import { Toaster } from "react-hot-toast";

/* COMPONENTS */
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

/* PAGES */
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import Services from "./pages/Services";
import Map from "./pages/Map";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import IssueDetails from "./pages/IssueDetails";

/* STYLES */
import "./styles/ui.css";

/* CONTEXT */
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { IssueProvider } from "./context/IssueContext";


/* ================= LAYOUT ================= */

function Layout() {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  /* 🎨 THEME */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  /* ⏳ LOADING */
  if (loading) {
    return (
      <div style={{
        textAlign: "center",
        marginTop: "100px",
        color: "white",
        fontSize: "18px"
      }}>
        ⏳ Loading App...
      </div>
    );
  }

  return (
    <>
      {/* 🔥 NAVBAR */}
      {!hideNavbar && <Navbar />}

      <div className="fade-in">
        <Routes>

          {/* ================= PUBLIC ================= */}
          <Route
            path="/"
            element={user ? <Navigate to="/home" replace /> : <Login />}
          />

          <Route
            path="/login"
            element={user ? <Navigate to="/home" replace /> : <Login />}
          />

          <Route
            path="/signup"
            element={user ? <Navigate to="/home" replace /> : <Signup />}
          />

          {/* ================= PROTECTED ================= */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/map" element={<ProtectedRoute><Map /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute><ReportIssue /></ProtectedRoute>} />
          <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
          <Route path="/issue/:id" element={<ProtectedRoute><IssueDetails /></ProtectedRoute>} />

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* ================= SETTINGS ================= */}
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* ================= FALLBACK ================= */}
          <Route
            path="*"
            element={
              user
                ? <Navigate to="/home" replace />
                : <Navigate to="/login" replace />
            }
          />

        </Routes>
      </div>
    </>
  );
}


/* ================= APP ================= */

function App() {
  return (
    <AuthProvider>
      <IssueProvider>
        <Router>

          {/* 🔥 GLOBAL TOAST */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#1e293b",
                color: "#fff"
              }
            }}
          />

          <Layout />
        </Router>
      </IssueProvider>
    </AuthProvider>
  );
}

export default App;