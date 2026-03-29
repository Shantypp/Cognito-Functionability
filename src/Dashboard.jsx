import { signOut } from "aws-amplify/auth";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const handleLogout = async () => {
    await signOut();
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Usuario autenticado ✅</p>

      <button onClick={handleLogout}>Cerrar sesión</button>

      <br /><br />
      <Link to="/">Volver</Link>
    </div>
  );
}