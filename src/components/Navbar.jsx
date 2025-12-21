import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = async () => {
    try { await api.post("/logout"); } catch {}
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* KIRI */}
      <div className="nav-left">
        <h3>Lab Notebook</h3>
      </div>

      {/* TENGAH */}
      <div className="nav-center">
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

      {/* KANAN */}
      <div className="nav-right">
        {token ? (
          <button className="logout-btn" onClick={logout}>Logout</button>
        ) : (
          <span>Belum Login</span>
        )}
      </div>
    </nav>
  );
}
