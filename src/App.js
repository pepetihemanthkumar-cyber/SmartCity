import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import SuccessScreen from "./pages/SuccessScreen";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Login Page */}
      <Route path="/" element={<Login />} />

      {/* Register Page */}
      <Route path="/register" element={<Register />} />

      {/* Success Animation Page */}
      <Route path="/success" element={<SuccessScreen />} />

      {/* Protected USER Dashboard */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected ADMIN Dashboard */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Contact Page */}
      <Route path="/contact" element={<Contact />} />

    </Routes>
  );
}

export default App;