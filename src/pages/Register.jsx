import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/register", { name, email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        <form onSubmit={submit}>
          <input placeholder="Nama" onChange={e => setName(e.target.value)} />
          <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password"
                 onChange={e => setPassword(e.target.value)} />
          <button>Register</button>
        </form>

        <div className="auth-links center">
            <Link to="/login">Sudah punya akun? Masuk</Link>
        </div>
      </div>
    </div>
  );
}
