import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: location.state?.email || "",
    otp: "",
    password: "",
    password_confirmation: "",
  });

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/reset-password", form);
      setMessage(res.data.message);
      setSuccess(true); // ✅ tandai sukses
    } catch (err) {
      setError(err.response?.data?.message || "Reset gagal");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Password</h2>

        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p className="error">{error}</p>}

        {!success ? (
          <form onSubmit={submit}>
            <input type="email" value={form.email} disabled />

            <input
              type="text"
              placeholder="OTP"
              value={form.otp}
              onChange={(e) => setForm({ ...form, otp: e.target.value })}
              required
            />

            <input
              type="password"
              placeholder="Password Baru"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <input
              type="password"
              placeholder="Konfirmasi Password"
              value={form.password_confirmation}
              onChange={(e) =>
                setForm({ ...form, password_confirmation: e.target.value })
              }
              required
            />

            <button type="submit">Reset Password</button>
          </form>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <button
              onClick={() => navigate("/login")}
              style={{ marginTop: "1rem" }}
            >
              Kembali ke Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
