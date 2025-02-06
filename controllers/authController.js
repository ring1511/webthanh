import { Login, registerUser } from "../services/authService.js";
import validateEmail from "../utils/regexEmail.js";

export const register = async (req, res) => {
  try {
    const { email, account, password } = req.body;

    if (!email || !account || !password) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    if (!validateEmail(email)) {
      throw new Error("Email Không hợp lệ");
    }
    if (account.length < 6) {
      throw new Error("Tài khoản phải có ít nhất 6 ký tự");
    }
    if (password.length < 6) {
      throw new Error("Mật khẩu phải có ít nhất 6 ký tự");
    }
    const result = await registerUser(email, account, password);
    res.status(201).json({ message: result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { account, password } = req.body;
    if (!account || !password) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const result = await Login(account, password);

    res.cookie("token", result.token, {
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("k_user", result.k_user, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ error: false, message: result.message, role: result.role });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    res.clearCookie("k_user", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.status(200).json({
      error: false,
      message: "Hẹn gặp lại",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Có lỗi xảy ra",
    });
  }
};
