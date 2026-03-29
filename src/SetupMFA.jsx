import { useEffect, useState } from "react";
import {
  setUpTOTP,
  verifyTOTPSetup,
  updateMFAPreference,
} from "aws-amplify/auth";
import { Link } from "react-router-dom";

export default function SetupMFA() {
  const [secret, setSecret] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
  const loadSecret = async () => {
    try {
      const totpSetupDetails = await setUpTOTP();

      console.log("TOTP DETAILS:", totpSetupDetails); // 👈 IMPORTANTE

      setSecret(totpSetupDetails.sharedSecret);
    } catch (error) {
      console.error("ERROR TOTP:", error);
      setMessage(error.message || "Error generando MFA");
    }
  };

  loadSecret();
}, []);

  const handleVerify = async () => {
    try {
      await verifyTOTPSetup({ code });
      await updateMFAPreference({
        totp: "PREFERRED",
      });
      setMessage("MFA configurado correctamente.");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Error verificando MFA");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Configurar MFA</h1>

      <p>Agrega esta clave en Google Authenticator o Microsoft Authenticator:</p>
      <p><strong>{secret}</strong></p>

      <input
        type="text"
        placeholder="Código de 6 dígitos"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <br /><br />

      <button onClick={handleVerify}>Verificar MFA</button>

      <p>{message}</p>

      <Link to="/">Volver</Link>
    </div>
  );
}