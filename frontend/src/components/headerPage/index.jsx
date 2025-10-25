import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStore, actions } from "../../store";

import "./style.scss";

export default function Header() {
  const [state, dispath] = useStore();
  const [showInfo, setShowInfo] = useState(false);
  const boxInfoRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    function handleClickOutside(event) {
      if (boxInfoRef.current && !boxInfoRef.current.contains(event.target)) {
        setShowInfo(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="header">
      {/* Thanh khuyến mãi */}
      <div className="promo-bar">
        Ưu đãi nội thất tháng 6 – Giảm giá đến 40% toàn bộ sofa phòng khách!
      </div>

      {/* Hàng giữa: logo - tìm kiếm - icon */}
      <div className="header-main">
        <div className="header-left">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="logo" className="logo-img" />
            <span>HIORA JEWELRY</span>
          </Link>
        </div>

        <div className="header-center">
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm nội thất, ghế sofa, bàn ăn..."
          />
          <button className="btn-search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height="16"
              width="16"
              viewBox="0 0 24 24"
              focusable="false"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div className="header-right">
          <button className="icon-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height="20"
              width="20"
              viewBox="0 0 24 24"
            >
              <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45C7.52 16.37 8.48 18 10 18h10v-2H10.42l1.1-2h7.45a1 1 0 00.92-.62l3.58-8.04A1 1 0 0022 4H7zm-1 16a2 2 0 110 4 2 2 0 010-4zm12 0a2 2 0 110 4 2 2 0 010-4z" />
            </svg>
          </button>

          {state.userInfo.id ? (
            <>
              <div
                className="user-info"
                style={{
                  background: `url(${state.userInfo.picture}) no-repeat center center / cover`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInfo((prev) => !prev);
                }}
              ></div>
              {showInfo && (
                <div className="more-user-info" ref={boxInfoRef}>
                  <div className="detail-info">
                    <div
                      className="avatar"
                      style={{
                        background: `url(${state.userInfo.picture}) no-repeat center center / cover`,
                      }}
                    ></div>
                    <div className="info">
                      <div className="user-name">{state.userInfo.name}</div>
                      <div className="user-mention">
                        {state.userInfo.mention}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="btn-actions">
                    <button className="btn logout">log out</button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <button
              className="icon-btn"
              onClick={() => {
                dispath(actions.set_is_login(true));
                history.push("/auth");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                height="20"
                width="20"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.67 0 8 1.34 8 4v4H4v-4c0-2.66 5.33-4 8-4zm0-2a4 4 0 110-8 4 4 0 010 8z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Thanh menu */}
      <nav className="menu-bar">
        <Link to="/">Trang chủ</Link>
        <Link to="/products">Tất cả sản phẩm</Link>
        <Link to="/promotions">Chương trình khuyến mãi</Link>
        <Link to="/about">Giới thiệu</Link>
        <Link to="/contact">Liên hệ</Link>
      </nav>
    </header>
  );
}
