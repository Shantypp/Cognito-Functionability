import { useEffect, useState } from "react";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { Link } from "react-router-dom";

export default function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [attributes, setAttributes] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setMessage("");

        const user = await getCurrentUser();
        const attrs = await fetchUserAttributes();

        console.log("Usuario actual:", user);
        console.log("Atributos del usuario:", attrs);

        setUserInfo(user);
        setAttributes(attrs);
      } catch (error) {
        console.error("Error cargando perfil:", error);
        setMessage(error?.message || "Error cargando perfil");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <div className="card">
          <h1>Perfil</h1>
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="card">
        <h1>Perfil</h1>

        {message && <p className="message">{message}</p>}

        {userInfo && (
          <>
            <p>
              <strong>Usuario ID:</strong> {userInfo.userId || "No disponible"}
            </p>
            <p>
              <strong>Username:</strong> {userInfo.username || "No disponible"}
            </p>
            <p>
              <strong>Login:</strong>{" "}
              {userInfo.signInDetails?.loginId || attributes.email || "No disponible"}
            </p>
          </>
        )}

        <p>
          <strong>Nombre:</strong> {attributes.name || "No disponible"}
        </p>
        <p>
          <strong>Cédula:</strong> {attributes["custom:cedula"] || "No disponible"}
        </p>
        <p>
          <strong>Email:</strong> {attributes.email || "No disponible"}
        </p>
        <p>
          <strong>Email verificado:</strong>{" "}
          {attributes.email_verified === "true" || attributes.email_verified === true
            ? "Sí"
            : "No"}
        </p>
        <p>
          <strong>Número:</strong> {attributes.phone_number || "No disponible"}
        </p>
        <p>
          <strong>Dirección:</strong> {attributes.address || "No disponible"}
        </p>

        <div className="link-group">
          <Link className="text-link" to="/dashboard">
            Volver al dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}