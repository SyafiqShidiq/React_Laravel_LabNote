import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      setError("Email atau password salah");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        {error && <small className="error">{error}</small>}

        <form onSubmit={submit}>
          <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password"
                 onChange={e => setPassword(e.target.value)} />
          <button>Login</button>
        </form>

        <div className="auth-links center">
          <Link to="/register">Belum punya akun? Daftar</Link>
        </div>
      </div>
    </div>
  );
}
