import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";   // ✅ Import Contact Page

function App() {
  return (
    <Routes>
      {/* Login Page */}
      <Route path="/" element={<Login />} />

      {/* User & Admin Dashboard */}
      <Route path="/user" element={<Dashboard />} />
      <Route path="/admin" element={<Dashboard />} />

      {/* Contact Page */}
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;