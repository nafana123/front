import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/style/login/Login.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const API_URL = import.meta.env.VITE_BACKEND_API;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      login: username,
      email,
      password,
      password_confirm: confirmPassword,
    };

    try {
      const res = await fetch(`${API_URL}/auth/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.field && data.error) {
          setErrors({ [data.field]: data.error });
        } else if (data.errors) {
          const formattedErrors = {};
          data.errors.forEach(err => {
            formattedErrors[err.field] = err.message;
          });
          setErrors(formattedErrors);
        } else {
          setErrors({ general: "Ошибка регистрации" });
        }
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
          <h1>Создайте новый аккаунт</h1>
          <p>Создайте новый аккаунт, чтобы продолжить</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Логин</label>
            <input
              type="text"
              placeholder="Ваш логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={getInputClass("login")}
              required
            />
            {errors.login && <div className="error">{errors.login}</div>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
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
                  color: "#666"
                }}
              >
                {showPassword ? "Скрыть" : "Показать"}
              </button>
            </div>
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label>Подтвердите пароль</label>
            <div style={{ position: "relative" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={getInputClass("password_confirm")}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#666"
                }}
              >
                {showConfirmPassword ? "Скрыть" : "Показать"}
              </button>
            </div>
            {errors.password_confirm && <div className="error">{errors.password_confirm}</div>}
          </div>

          {errors.general && <div className="error" style={{ textAlign: "center" }}>{errors.general}</div>}

          <button type="submit" className="login-btn-submit">
            Зарегистрироваться
          </button>

          <div className="register-link" style={{ textAlign: "center", marginTop: "10px" }}>
            Есть аккаунт? <a href="#" onClick={() => navigate("/login")}>Войти</a>
          </div>
        </form>

        <div className="login-footer">
          <p>© 2024 TOURNIFY. Все права защищены.</p>
        </div>
      </div>
    </div>
  );
}