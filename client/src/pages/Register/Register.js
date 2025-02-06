import { Box, TextField } from "@mui/material";
import "../../assets/styles/LoginAndReg.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, resetAuth } from "../../services/user/userService";
import { Alert, Toast } from "../../utils/alert";

function Register(props) {
  const dispatch = useDispatch();
  const dataReg = useSelector((state) => state.auth);
  useEffect(() => {
    if (!dataReg?.isSuccess && dataReg?.message) {
      Alert("Đăng ký thất bại", dataReg.message.message, "error");
    }
    if (dataReg?.isSuccess) {
      Toast.fire({
        icon: "success",
        title: dataReg?.message,
      });
    }
  }, [dataReg]);
  useEffect(() => {
    return () => {
      dispatch(resetAuth());
    };
  }, [dispatch]);

  const [data, setData] = useState({
    account: "",
    password: "",
    email: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCloseLogin = () => {
    props.handleClose();
  };
  const handleLogin = () => {
    dispatch(resetAuth());
    props.handleNavigatorLog();
  };
  const handleRegister = async () => {
    dispatch(register(data, handleLogin));
  };

  return (
    <div className="login-wrap">
      <div className="login-form">
        <div className="parent-container">
          <button onClick={handleCloseLogin}>x</button>
        </div>
        <p>Đăng ký</p>
        <span>iCaptcha.online</span>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { width: "100%" },
          }}
        >
          <TextField
            id="outlined-basic"
            type="email"
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            name="email"
            value={data.email}
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
            id="outlined-basic"
            label="Tài khoản"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            name="account"
            value={data.account}
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
            id="outlined-basic"
            label="Mật khẩu"
            type="password"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            name="password"
            value={data.password}
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
        <div className="button-log-reg" onClick={handleRegister}>
          Đăng ký
        </div>
        <div className="more-action">
          Bạn đã có tài khoản?<span onClick={handleLogin}>Đăng Nhập ngay</span>
        </div>
      </div>
    </div>
  );
}
export default Register;
