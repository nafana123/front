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

  const handleNavigate = (path) => () => navigate(path);

  return (
    <header className="header">
      <div className="header-inner">
        <div 
          className="header-left" 
          onClick={handleNavigate("/")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleNavigate("/")()}
        >
          <div className="logo-text">
            TOURNI<span className="logo-accent">FY</span>
          </div>
        </div>

        <nav className="header-center">
          <button onClick={handleNavigate("/tournaments")}>Tournaments</button>
          <button onClick={handleNavigate("/rewards")}>Rewards</button>
          <button onClick={handleNavigate("/leaderboard")}>Leaderboard</button>
        </nav>

        <div className="header-right">
          {!isAuthenticated ? (
            <>
              <button
                className="ghost-btn"
                onClick={handleNavigate("/login")}
              >
                Log in
              </button>

              <button
                className="primary-btn"
                onClick={handleNavigate("/register")}
              >
                Get Started
              </button>
            </>
          ) : (
            <>
              <div className="user-block">
                <div className="avatar" />
                <span>Account</span>
              </div>

              <button className="ghost-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}