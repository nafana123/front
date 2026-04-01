import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "./Header";
import "/src/assets/style/auth/TelegramAuth.css";

export const TelegramAuth = () => {
  const [user, setUser] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_API;

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();

    const initData = tg.initData;
    if (!initData || !backendUrl) return;

    axios
      .post(`${backendUrl}/auth/telegram`, { data: initData })
      .then((res) => {
        if (res.data?.token && res.data?.user) {
          setUser(res.data.user);
          localStorage.setItem("jwt", res.data.token);
        }
      })
      .catch((err) => {
        console.error("Ошибка при авторизации:", err.response?.data || err.message);
      });
  }, [backendUrl]);

  if (!user)
    return (
      <div className="loader-container">
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span>Загрузка...</span>
      </div>
    );

  return (
    <div>
      <Header user={user} />
    </div>
  );
};