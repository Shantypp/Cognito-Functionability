import { signOut } from "aws-amplify/auth";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const handleLogout = async () => {
    try {
      await signOut({ global: true });
      window.location.href = "/login";
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Usuario autenticado ✅</p>

      <br />
      <Link to="/profile">
        <button>Consultar perfil</button>
      </Link>

      <br /><br />
      <Link to="/setup-mfa">
        <button>Activar MFA</button>
      </Link>

      <br /><br />
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}