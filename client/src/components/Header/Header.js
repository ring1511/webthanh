import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/styles/Header.scss";
import {
  faCoins,
  faHouseCrack,
  faLayerGroup,
  faSortDown,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faWolfPackBattalion } from "@fortawesome/free-brands-svg-icons";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../toolkit/users/infoSlice";
import { format } from "../../utils/format";
import { getInfo } from "../../services/user/infoService";
import { logout } from "../../services/user/userService";
import { Alert } from "../../utils/alert";

function Header() {
  const dispatch = useDispatch();
  const [modalType, setModalType] = useState(null);
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const info = useSelector((state) => state.info);
  const handleShowLogin = () => {
    setModalType("login");
    setIsLoginVisible(true);
  };
  const token = Cookies.get("token");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (token) {
      dispatch(getInfo());
    } else {
      dispatch(logout());
    }
  }, [dispatch, token]);

  const handleShowRegister = () => {
    setModalType("register");
    setIsLoginVisible(false);
  };
  const handleSwitchToRegister = () => {
    setIsLoginVisible(false);
    setModalType("register");
  };
  const handleSwitchToLogin = () => {
    setIsLoginVisible(true);
    setModalType("login");
  };
  const handleCloseModal = () => setModalType(null);

  const showDropDown = () => {
    setIsShowDropDown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("_is");
    Alert("Đăng xuất thành công", "Hẹn gặp lại", "success");
    setIsShowDropDown(false);
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <header>
      {modalType && (
        <div className="login-modal">
          {modalType === "login" && isLoginVisible ? (
            <Login
              handleClose={handleCloseModal}
              handleNavigatorReg={handleSwitchToRegister}
            />
          ) : (
            <Register
              handleClose={handleCloseModal}
              handleNavigatorLog={handleSwitchToLogin}
            />
          )}
        </div>
      )}
      <nav>
        <div className="main-header">
          <Link to={"/"}>
            <img src="https://plusdino.com/logo/logo2.png" alt="" />
          </Link>
          <div className="header-items">
            <Link className="item-header" to={"/"}>
              <FontAwesomeIcon icon={faHouseCrack} pull="left" />
              Trang chủ
            </Link>
            <Link className="item-header" to={"/"}>
              <FontAwesomeIcon icon={faCoins} pull="left" size="lg" />
              Nạp tiền
            </Link>
            <Link className="item-header" to={"/"}>
              <FontAwesomeIcon icon={faLayerGroup} pull="left" size="lg" />
              Danh mục
            </Link>
            {!localStorage.getItem("_is") ? (
              <>
                <button className="btn-login" onClick={handleShowLogin}>
                  <FontAwesomeIcon icon={faUser} pull="left" />
                  Đăng nhập
                </button>
                <button className="btn-login" onClick={handleShowRegister}>
                  <FontAwesomeIcon icon={faUserPlus} pull="left" />
                  Đăng ký
                </button>
              </>
            ) : (
              <>
                <Link className="item-header" to={"/panel"}>
                  <FontAwesomeIcon
                    icon={faWolfPackBattalion}
                    pull="left"
                    size="lg"
                  />
                  Bảng điều khiển
                </Link>
                <div className="item-account">
                  <div onClick={showDropDown} className="show-info">
                    <span>Tài khoản</span>
                    <FontAwesomeIcon icon={faSortDown} pull="right" />
                  </div>
                  {isShowDropDown && (
                    <>
                      <ul className="dropdown">
                        <li className="content-dropdown">
                          Số dư : {format(info.info.balance) || 0}
                        </li>
                        <Link to={"/"}>
                          <li className="content-dropdown">
                            Thông tin tài khoản
                          </li>
                        </Link>
                        <li className="content-dropdown" onClick={handleLogout}>
                          Đăng xuất
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;
