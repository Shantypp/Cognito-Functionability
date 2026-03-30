import { useEffect, useState } from "react";
import { fetchUserAttributes, fetchAuthSession } from "aws-amplify/auth";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const attributes = await fetchUserAttributes();
        setUser(attributes);

        const session = await fetchAuthSession();
        console.log("ID Token:", session.tokens?.idToken?.toString());
        console.log("Access Token:", session.tokens?.accessToken?.toString());
      } catch (error) {
        console.error(error);
        setMessage("Error al cargar los datos del usuario");
      }
    };

    loadUser();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Perfil del usuario</h1>

      {message && <p>{message}</p>}

      {user && (
        <div>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Correo:</strong> {user.email}</p>
          <p><strong>Número:</strong> {user.phone_number}</p>
          <p><strong>Cédula:</strong> {user["custom:cedula"]}</p>
          <p><strong>Dirección:</strong> {user["custom:direccion"]}</p>
        </div>
      )}

      <br />
      <Link to="/">Volver</Link>
    </div>
  );
}