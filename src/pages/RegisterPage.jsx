import { useState, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/style/login/Login.css";

const RegisterPage = () => {
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    setErrors({});
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  }, [username, email, password, confirmPassword, API_URL, login, navigate, isLoading]);

  const getInputClass = useCallback((field) => errors[field] ? "error-input" : "", [errors]);

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="brand">
          <h2>Присоединяйся к сообществу турниров</h2>
          <p className="tagline">
            Регистрируйся прямо сейчас и начни свой путь к победам
          </p>

          <div className="stats-banner">
            <div className="stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Проведённых турниров</span>
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
        <div className="node" style={{top: '85%', left: '80%'}}></div>
        <div className="line" style={{top: '15%', left: '25%', width: '100px'}}></div>
        <div className="line" style={{top: '60%', left: '60%', width: '80px'}}></div>
        <div className="line" style={{top: '80%', left: '35%', width: '120px'}}></div>
        <div className="token" style={{top: '70%', left: '20%'}}></div>
        <div className="token" style={{top: '20%', left: '75%'}}></div>
        <div className="particle" style={{top: '20%', left: '15%'}}></div>
        <div className="particle" style={{top: '40%', left: '80%'}}></div>
        <div className="particle" style={{top: '60%', left: '30%'}}></div>
        <div className="particle" style={{top: '75%', left: '65%'}}></div>
        <div className="particle" style={{top: '90%', left: '50%'}}></div>
      </div>

      <div className="login-right">
        <div className="login-container">
          <button className="back-to-home" onClick={() => navigate("/")}>
            ← На главную
          </button>

          <div className="login-header">
            <h1>Создайте новый аккаунт</h1>
            <p>Создайте новый аккаунт, чтобы продолжить</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-group">
              <label>Логин</label>
              <input
                type="text"
                placeholder="Ваш логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={getInputClass("login")}
                autoComplete="username"
                disabled={isLoading}
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
                autoComplete="email"
                disabled={isLoading}
                required
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
                  autoComplete="new-password"
                  disabled={isLoading}
                  required
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

            <div className="form-group">
              <label>Подтвердите пароль</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={getInputClass("password_confirm")}
                  autoComplete="new-password"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="show-password"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? "скрыть" : "показать"}
                </button>
              </div>
              {errors.password_confirm && <div className="error">{errors.password_confirm}</div>}
            </div>

            {errors.general && <div className="error" style={{ textAlign: "center" }}>{errors.general}</div>}

            <button type="submit" className="login-btn-submit" disabled={isLoading}>
              {isLoading ? "Регистрация..." : "Зарегистрироваться"}
            </button>

            <div className="register-link" style={{ textAlign: "center", marginTop: "10px" }}>
              Есть аккаунт?{" "}
              <span onClick={() => navigate("/login")}>Войти</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(RegisterPage);