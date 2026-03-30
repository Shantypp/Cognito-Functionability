import { useEffect, useState } from "react";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { Link } from "react-router-dom";

export default function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [attributes, setAttributes] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await getCurrentUser();
        const attrs = await fetchUserAttributes();
        setUserInfo(user);
        setAttributes(attrs);
      } catch (error) {
        console.error(error);
        setMessage(error.message || "Error cargando perfil");
      }
    };

    loadProfile();
  }, []);

  return (
    <div className="page-container">
      <div className="card">
        <h1>Perfil</h1>

        {message && <p className="message">{message}</p>}

        {userInfo && (
          <>
            <p><strong>Usuario:</strong> {userInfo.username}</p>
            <p><strong>Login:</strong> {userInfo.signInDetails?.loginId}</p>
          </>
        )}

        <p><strong>Email:</strong> {attributes.email}</p>
        <p><strong>Email verificado:</strong> {attributes.email_verified}</p>

        <div className="link-group">
          <Link className="text-link" to="/dashboard">
            Volver al dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}