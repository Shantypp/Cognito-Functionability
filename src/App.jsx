import { Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import ConfirmRegister from "./ConfirmRegister";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import SetupMFA from "./SetupMFA";



function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Inicio</h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Registro</Link>
      <br />
      <Link to="/confirm">Confirmar cuenta</Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/confirm" element={<ConfirmRegister />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/setup-mfa" element={<SetupMFA />} />
    </Routes>
  );
}