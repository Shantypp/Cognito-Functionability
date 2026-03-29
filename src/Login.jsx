import { useEffect, useState } from "react";
import { signIn, confirmSignIn, getCurrentUser } from "aws-amplify/auth";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [mfaCode, setMfaCode] = useState("");
  const [showMfa, setShowMfa] = useState(false);

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

      {showMfa && (
        <>
          <br /><br />
          <input
            type="text"
            placeholder="Código MFA"
            value={mfaCode}
            onChange={(e) => setMfaCode(e.target.value)}
          />
          <br /><br />
          <button onClick={handleConfirmMfa}>Confirmar MFA</button>
        </>
      )}

      <br /><br />
      <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>

      <p>{message}</p>

      <Link to="/">Volver</Link>
      
      </div>
  );
}