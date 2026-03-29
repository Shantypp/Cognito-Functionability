import { useEffect, useState } from "react";
import { signIn, getCurrentUser } from "aws-amplify/auth";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      try {
        await getCurrentUser();
        window.location.href = "/dashboard";
      } catch (error) {
        // no hay sesión activa
      }
    };

    checkUser();
  }, []);

  const handleLogin = async () => {
    try {
      await signIn({
        username: email,
        password,
      });

      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);

      if (
        error.message &&
        error.message.includes("already a signed in user")
      ) {
        window.location.href = "/dashboard";
      } else {
        setMessage(error.message || "Error al iniciar sesión");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Iniciar sesión</button>

      <p>{message}</p>

      <Link to="/">Volver</Link>
    </div>
  );
}