import { Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import ConfirmRegister from "./ConfirmRegister";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import SetupMFA from "./SetupMFA";
import Profile from "./Profile";

function Home() {
  return (
    <div className="page-container">
      <div className="card">
        <h1>Portal de autenticación</h1>
        <p>Aplicación web con AWS Cognito y React.</p>

        <div className="link-group">
          <Link className="text-link" to="/login">Login</Link>
          <Link className="text-link" to="/register">Registro</Link>
          <Link className="text-link" to="/confirm">Confirmar cuenta</Link>
          <Link className="text-link" to="/forgot-password">Recuperar contraseña</Link>
        </div>
      </div>
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
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}