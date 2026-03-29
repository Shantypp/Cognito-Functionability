import { useState } from "react";
import { resetPassword, confirmResetPassword } from "aws-amplify/auth";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSendCode = async () => {
    try {
      await resetPassword({ username: email });
      setMessage("Te enviamos un código al correo.");
      setStep(2);
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Error al enviar el código");
    }
  };

  const handleConfirmPassword = async () => {
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword: newPassword,
      });

      setMessage("Contraseña actualizada correctamente.");
      setStep(3);
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Error al cambiar la contraseña");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Recuperar contraseña</h1>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br /><br />
          <button onClick={handleSendCode}>Enviar código</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Código"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <br /><br />

          <input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br /><br />

          <button onClick={handleConfirmPassword}>Cambiar contraseña</button>
        </>
      )}

      {step === 3 && (
        <p>Ya puedes volver al login con tu nueva contraseña.</p>
      )}

      <p>{message}</p>

      <Link to="/login">Volver al login</Link>
    </div>
  );
}