import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../assets/style/header/Header.css";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">T</span>
          <span className="logo-text">TOURNIFY</span>
        </div>

        <div className="divider">|</div>

        <nav className="nav-menu">
          <a href="#" className="nav-link">My Tournaments</a>
          <a href="#" className="nav-link">Rewards</a>
          <a href="#" className="nav-link">Support</a>
        </nav>

        {!isAuthenticated ? (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Войти
          </button>
        ) : (
          <button className="login-btn logout-btn" onClick={handleLogout}>
            Выйти
          </button>
        )}
      </div>
    </header>
  );
}