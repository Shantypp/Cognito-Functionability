import { useState } from "react";
import { signUp } from "aws-amplify/auth";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });

      setMessage("Usuario registrado. Revisa tu correo.");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Error al registrar");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Registro</h1>

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

      <button onClick={handleRegister}>Registrarse</button>

      <p>{message}</p>

      <Link to="/">Volver</Link>
    </div>
  );
}