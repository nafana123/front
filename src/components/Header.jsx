import React from "react";
import "/src/assets/style/header/Header.css";

export const Header = ({ user }) => {
  return (
    <div className="header">
      <div className="header-left">
        <span className="header-logo">
          <span className="logo-white">TOUNNI</span>
          <span className="logo-purple">FY</span>
        </span>
      </div>
      <div className="header-right">
        <div className="header-avatar">
          {user?.photo_url && <img src={user.photo_url} alt="avatar" />}
        </div>
      </div>
    </div>
  );
};