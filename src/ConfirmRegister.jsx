import { useState } from "react";
import { confirmSignUp } from "aws-amplify/auth";
import { Link } from "react-router-dom";

export default function ConfirmRegister() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleConfirm = async () => {
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      setMessage("Cuenta confirmada correctamente. Ya puedes iniciar sesión.");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Error al confirmar la cuenta");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Confirmar cuenta</h1>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Código"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <br /><br />

      <button onClick={handleConfirm}>Confirmar</button>

      <p>{message}</p>

      <Link to="/">Volver</Link>
    </div>
  );
}