import { Routes, Route, Navigate } from "react-router-dom";

/* ================= PAGES ================= */
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Help from "./pages/Help";
import SuccessScreen from "./pages/SuccessScreen";
import ServiceDetail from "./pages/ServiceDetail";
import IssueDetail from "./pages/IssueDetail";

/* ================= COMPONENTS ================= */
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/success" element={<SuccessScreen />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />

      {/* ================= USER ROUTES ================= */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/service/:name"
        element={
          <ProtectedRoute role="user">
            <ServiceDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/issue/:id"
        element={
          <ProtectedRoute role="user">
            <IssueDetail />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ROUTES ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= 404 PAGE ================= */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;