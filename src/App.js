import { Routes, Route } from "react-router-dom";

/* ================= PAGES ================= */
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Contact from "./pages/Contact";
import About from "./pages/About";      // ✅ ADD THIS
import Help from "./pages/Help";        // ✅ ADD THIS
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
      <Route path="/about" element={<About />} />   {/* ✅ NEW */}
      <Route path="/help" element={<Help />} />     {/* ✅ NEW */}

      {/* ================= USER DASHBOARD ================= */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= SERVICE DETAIL ================= */}
      <Route
        path="/service/:name"
        element={
          <ProtectedRoute role="user">
            <ServiceDetail />
          </ProtectedRoute>
        }
      />

      {/* ================= ISSUE DETAIL ================= */}
      <Route
        path="/issue/:id"
        element={
          <ProtectedRoute role="user">
            <IssueDetail />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN DASHBOARD ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;