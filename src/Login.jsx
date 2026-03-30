import { useEffect, useState } from "react";
import {
  signIn,
  confirmSignIn,
  getCurrentUser,
  fetchAuthSession,
} from "aws-amplify/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [mfaCode, setMfaCode] = useState("");
  const [showMfa, setShowMfa] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        await getCurrentUser();
        navigate("/profile");
      } catch (error) {
        // no hay sesión activa
      }
    };

    checkUser();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      setMessage("");

      const result = await signIn({
        username: email,
        password,
      });

      if (result.nextStep?.signInStep === "CONFIRM_SIGN_IN_WITH_TOTP_CODE") {
        setShowMfa(true);
        setMessage("Ingresa el código MFA de tu app autenticadora");
        return;
      }

      const session = await fetchAuthSession();
      console.log("ID Token:", session.tokens?.idToken?.toString());
      console.log("Access Token:", session.tokens?.accessToken?.toString());

      navigate("/profile");
    } catch (error) {
      console.error(error);

      if (error.message && error.message.includes("already a signed in user")) {
        navigate("/profile");
      } else {
        setMessage(error.message || "Error al iniciar sesión");
      }
    }
  };

  const handleConfirmMfa = async () => {
    try {
      setMessage("");

      await confirmSignIn({
        challengeResponse: mfaCode,
      });

      const session = await fetchAuthSession();
      console.log("ID Token:", session.tokens?.idToken?.toString());
      console.log("Access Token:", session.tokens?.accessToken?.toString());

      navigate("/profile");
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