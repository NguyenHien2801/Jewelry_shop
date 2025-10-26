import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useStore, actions } from "../../store";
import "./style.scss";

const LoginButton = ({ onLogin }) => {
  const history = useHistory();
  const [state, dispath] = useStore();

  const handleSuccess = async (response) => {
    try {
      const res = await fetch("http://localhost:5000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: response.credential,
        }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      onLogin(data);
      dispath(actions.set_is_login(false));
      history.push("/");
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  const handleError = () => {
    console.error("Login Failed");
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
};

const AuthPage = () => {
  const [state, dispath] = useStore();

  const handleLogin = (data) => {
    dispath(actions.set_user_info(data.user));
  };

  useEffect(() => {
    if (state.isLogin) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [state.isLogin]);

  if (!state.isLogin) return null;

  return (
    <GoogleOAuthProvider clientId={state.clientId}>
      <div
        className="login-overlay"
        onClick={() => dispath(actions.set_is_login(false))}
      >
        <div className="login-box" onClick={(e) => e.stopPropagation()}>
          <h2 className="login-title">Đăng nhập HIORA</h2>
          <p className="login-subtitle">
            Chào mừng bạn quay lại! Hãy đăng nhập để tiếp tục.
          </p>
          <hr />
          <div className="google-btn">
            <LoginButton onLogin={handleLogin} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default AuthPage;
