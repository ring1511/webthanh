import "../../assets/styles/LoginAndReg.scss";
import { login, resetAuth } from "../../services/user/userService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField } from "@mui/material";
import { Alert } from "../../utils/alert";

function Login(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    account: "",
    password: "",
  });
  const dataLog = useSelector((state) => state.auth);
  useEffect(() => {
    if (!dataLog?.isLoading && dataLog?.message) {
      Alert("Đăng nhập thất bại", dataLog.message.message, "error");
    }
    if (dataLog?.isSuccess) {
      Alert("Đăng nhập thành công", dataLog?.message, "success");
    }
  }, [dataLog]);

  useEffect(() => {
    return () => {
      dispatch(resetAuth());
    };
  }, [dispatch]);

  const handleClose = () => {
    props.handleClose();
  };

  const handleRegister = () => {
    dispatch(resetAuth());
    props.handleNavigatorReg();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    dispatch(login(data, handleClose));
  };

  return (
    <div className="login-wrap">
      <div className="login-form">
        <div className="parent-container">
          <button onClick={handleClose}>x</button>
        </div>
        <p>ĐĂNG NHẬP</p>
        <span>iCaptcha.online</span>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { width: "100%" },
          }}
        >
          <TextField
            label="Tài khoản"
            name="account"
            variant="outlined"
            size="small"
            value={data.account}
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            sx={{
              "& .MuiInputBase-input": {
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: "16px",
                fontWeight: 500,
              },
              "& .MuiFormLabel-root": {
                fontFamily: "Chakra Petch, sans-serif",
                fontWeight: 600,
              },
            }}
          />
          <TextField
            label="Mật khẩu"
            type="password"
            name="password"
            variant="outlined"
            size="small"
            value={data.password}
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            sx={{
              "& .MuiInputBase-input": {
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: "16px",
                fontWeight: 500,
              },
              "& .MuiFormLabel-root": {
                fontFamily: "Chakra Petch, sans-serif",
                fontWeight: 600,
              },
            }}
          />
        </Box>
        <div className="button-log-reg" onClick={handleLogin}>
          Đăng Nhập
        </div>
        <div className="more-action">
          Bạn chưa có tài khoản?
          <span onClick={handleRegister}>Đăng ký ngay</span>
        </div>
      </div>
    </div>
  );
}
export default Login;
