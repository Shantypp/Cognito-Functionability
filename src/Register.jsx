import { useState } from "react";
import { signUp } from "aws-amplify/auth";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [direccion, setDireccion] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      setMessage("");

      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name,
            phone_number: phoneNumber,
            "custom:cedula": cedula,
            "custom:direccion": direccion,
          },
        },
      });

      setMessage("Usuario registrado. Revisa tu correo para confirmar la cuenta.");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Error al registrar");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Registro</h1>

      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Cédula"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
      />
      <br /><br />

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Número (+573001234567)"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
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