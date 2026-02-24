import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";   // ✅ Import Register
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>

      {/* Login Page */}
      <Route path="/" element={<Login />} />

      {/* Register Page */}
      <Route path="/register" element={<Register />} />

      {/* User & Admin Dashboard */}
      <Route path="/user" element={<Dashboard />} />
      <Route path="/admin" element={<Dashboard />} />

      {/* Contact Page */}
      <Route path="/contact" element={<Contact />} />

    </Routes>
  );
}

export default App;