import React, {useEffect, useState} from "react";
import axios from "axios";
import {Header} from "./Header";
import "/src/assets/style/auth/TelegramAuth.css";

export const TelegramAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [steamData, setSteamData] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_API;
    useEffect(() => {
        const tg = window.Telegram?.WebApp;

        if (!tg) {
            setLoading(false);
            return;
        }

        tg.ready();
        const initData = tg.initData;

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

    const handleSteamLogin = () => {
        window.location.href = `${backendUrl}/api/auth/steam/login`;
    };

    if (steamData) {
        return (
            <div style={{padding: 20}}>
                <table border="1" cellPadding="8">
                    <tbody>
                    <tr>
                        <td>Steam ID</td>
                        <td>{steamData.steamid}</td>
                    </tr>
                    <tr>
                        <td>Никнейм</td>
                        <td>{steamData.personaname}</td>
                    </tr>
                    <tr>
                        <td>Реальное имя</td>
                        <td>{steamData.realname || '-'}</td>
                    </tr>
                    <tr>
                        <td>Страна</td>
                        <td>{steamData.loccountrycode || '-'}</td>
                    </tr>
                    <tr>
                        <td>Аватар</td>
                        <td><img src={steamData.avatar} width="32"/></td>
                    </tr>
                    </tbody>
                </table>
                <button onClick={() => setSteamData(null)} style={{marginTop: 20}}>Назад</button>
            </div>
        );
    }

    if (loading) {
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
    }

    if (!user) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <h1>Добро пожаловать!</h1>
                    <p>Войдите через Steam, чтобы продолжить</p>
                    <img onClick={handleSteamLogin}
                         src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/russian/sits_small.png"
                         alt="sits_small.png" title="sits_small.png"/>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header user={user}/>
        </div>
    );
};