import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    try {
      await api.post("/forgot-password", { email });

      // ✅ tampilkan keterangan
      setInfo(
        "Kode OTP telah dikirim ke email kamu. Silakan cek inbox atau folder spam."
      );

      // ⏳ beri jeda sebentar lalu pindah halaman
      setTimeout(() => {
        navigate("/reset-password", {
          state: { email },
        });
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengirim OTP");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Lupa Password</h2>

        {info && <p style={{ color: "green" }}>{info}</p>}
        {error && <p className="error">{error}</p>}

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Kirim OTP</button>
        </form>
      </div>
    </div>
  );
}
