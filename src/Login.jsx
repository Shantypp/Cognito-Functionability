import { useState } from "react";
import { signIn, confirmSignIn } from "aws-amplify/auth";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [showMfa, setShowMfa] = useState(false);

  const handleLogin = async () => {
    try {
      const result = await signIn({
        username: email,
        password,
      });

      if (result.nextStep?.signInStep === "CONFIRM_SIGN_IN_WITH_TOTP_CODE") {
        setShowMfa(true);
        setMessage("Ingresa el código MFA de tu app autenticadora");
        return;
      }

      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Error al iniciar sesión");
    }
  };

  const handleConfirmMfa = async () => {
    try {
      await confirmSignIn({
        challengeResponse: mfaCode,
      });
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Error al validar MFA");
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1>Iniciar sesión</h1>
        <p>Accede a la plataforma con tu cuenta.</p>

        <input
          className="input"
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button" onClick={handleLogin}>
          Iniciar sesión
        </button>

        {showMfa && (
          <>
            <input
              className="input"
              type="text"
              placeholder="Código MFA"
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
            />
            <button className="button" onClick={handleConfirmMfa}>
              Confirmar MFA
            </button>
          </>
        )}

        <p className="message">{message}</p>

        <div className="link-group">
          <Link className="text-link" to="/forgot-password">
            ¿Olvidaste tu contraseña?
          </Link>
          <Link className="text-link" to="/">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}