import { useState, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/style/login/Login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const API_URL = import.meta.env.VITE_BACKEND_API;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    setErrors({});
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrors({ [data.field]: data.error });
        return;
      }
      
      login(data.token);
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Ошибка подключения к серверу");
    } finally {
      setIsLoading(false);
    }
  }, [email, password, rememberMe, API_URL, login, navigate, isLoading]);

  const getInputClass = useCallback((field) => errors[field] ? "error-input" : "", [errors]);

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="brand">
          <h2>Участвуй в турнирах легко и просто</h2>
          <p className="tagline">Создавай, участвуй и побеждай без лишних сложностей</p>

          <div className="stats-banner">
            <div className="stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Активных турниров</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Участников</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Поддержка</span>
            </div>
          </div>
        </div>

        <div className="node" style={{top: '10%', left: '20%'}}></div>
        <div className="node" style={{top: '50%', left: '70%'}}></div>
        <div className="node" style={{top: '75%', left: '40%'}}></div>
        <div className="line" style={{top: '15%', left: '25%', width: '100px'}}></div>
        <div className="line" style={{top: '60%', left: '60%', width: '80px'}}></div>
        <div className="token" style={{top: '70%', left: '20%'}}></div>
        <div className="particle" style={{top: '20%', left: '15%'}}></div>
        <div className="particle" style={{top: '40%', left: '80%'}}></div>
        <div className="particle" style={{top: '60%', left: '30%'}}></div>
      </div>

      <div className="login-right">
        <div className="login-container">
          <button className="back-to-home" onClick={() => navigate("/")}>
            ← На главную
          </button>

          <div className="login-header">
            <h1>Вход</h1>
            <p>Введите данные для входа</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="example@tournify.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={getInputClass("email")}
                autoComplete="email"
                disabled={isLoading}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label>Пароль</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={getInputClass("password")}
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="show-password"
                  disabled={isLoading}
                >
                  {showPassword ? "скрыть" : "показать"}
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
                  disabled={isLoading}
                />
                Запомнить меня
              </label>
              <span className="forgot-password">Забыли пароль?</span>
            </div>

            <button type="submit" className="login-btn-submit" disabled={isLoading}>
              {isLoading ? "Вход..." : "Войти"}
            </button>

            <div className="register-link">
              Нет аккаунта?{" "}
              <span onClick={() => navigate("/register")}>
                Зарегистрироваться
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(LoginPage);