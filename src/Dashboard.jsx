import { signOut } from "aws-amplify/auth";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const handleLogout = async () => {
    await signOut();
    window.location.href = "/login";
  };

  return (
    <div className="page-container">
      <div className="dashboard-card">
        <h1>Dashboard</h1>
        <p>Bienvenido. Ya estás autenticado en la aplicación.</p>

        <div className="actions">
          <Link to="/profile">
            <button className="button">Consultar perfil</button>
          </Link>

          <Link to="/setup-mfa">
            <button className="secondary-button">Activar MFA</button>
          </Link>

          <button className="secondary-button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}