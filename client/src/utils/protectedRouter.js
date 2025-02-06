import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSuccess } = useSelector((state) => state.info);
  const _isLogin = localStorage.getItem("_is");

  if (!_isLogin && !isSuccess) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
