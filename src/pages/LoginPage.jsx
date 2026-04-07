import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/style/login/Login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const API_URL = import.meta.env.VITE_BACKEND_API;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = { email, password };

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ [data.field]: data.error });
        return;
      }

      login(data.token);
      
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Ошибка подключения к серверу");
    }
  };

  const getInputClass = (field) => (errors[field] ? "error-input" : "");

  return (
    <div className="login-page">
      <div className="login-container">
        <button className="back-to-home" onClick={() => navigate("/")}>
          ← На главную
        </button>

        <div className="login-header">
          <div className="login-logo">
            <span className="login-logo-icon">T</span>
            <span className="login-logo-text">TOURNIFY</span>
          </div>
          <h1>Добро пожаловать!</h1>
          <p>Войдите в свой аккаунт, чтобы продолжить</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              placeholder="example@tournify.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={getInputClass("email")}
              required
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={getInputClass("password")}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#666",
                }}
              >
                {showPassword ? "Скрыть" : "Показать"}
              </button>
            </div>
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div className="form-options">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Запомнить меня
            </label>
            <a href="#" className="forgot-password">
              Забыли пароль?
            </a>
          </div>

          <button type="submit" className="login-btn-submit">
            Войти
          </button>

          <div className="register-link" style={{ textAlign: "center", marginTop: "10px" }}>
            Нет аккаунта?{" "}
            <a href="#" onClick={() => navigate("/register")}>
              Зарегистрироваться
            </a>
          </div>
        </form>

        <div className="login-footer">
          <p>© 2024 TOURNIFY. Все права защищены.</p>
        </div>
      </div>
    </div>
  );
}