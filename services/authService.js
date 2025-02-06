import bcrypt from "bcrypt";
import pool from "../config/database.js";
import jwt from "jsonwebtoken";
import generateRandomKey from "../utils/randomKeyUser.js";

export const registerUser = async (email, account, password) => {
  const [rowsEmail] = await pool.query(
    "SELECT username FROM users WHERE email = ?",
    [email]
  );
  if (rowsEmail.length > 0) {
    throw new Error("Email đã tồn tại");
  }
  const [rowsAccount] = await pool.query(
    "SELECT username FROM users WHERE username = ?",
    [account]
  );
  if (rowsAccount.length > 0) {
    throw new Error("Tài khoản đã tồn tại");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (email, username, password, token) VALUES (?, ?, ?, ?)",
    [email, account, hashPassword, generateRandomKey()]
  );

  return "Đăng ký thành công";
};

export const Login = async (account, password, key = null) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
    account,
  ]);
  if (rows.length === 0) {
    throw new Error("Tài khoản hoặc mật khẩu không chính xác");
  }

  const user = rows[0];

  const isPasswordValid = await bcrypt.compare(password, user.Password);

  if (!isPasswordValid) {
    throw new Error("Tài khoản hoặc mật khẩu không chính xác");
  }

  // const [existingSession] = await pool.query(
  //   "SELECT * FROM sessions WHERE user_id = ?",
  //   [user.public_key]
  // );

  // if (existingSession.length > 0) {
  //   await pool.query("DELETE FROM sessions WHERE user_id = ?", [
  //     user.public_key,
  //   ]);
  // }

  const session = Math.floor(Date.now()) + 36000000;
  // console.log(session);
  // await pool.query("INSERT INTO sessions (user_id, session_id) VALUES (?, ?)", [
  //   user.public_key,
  //   session,
  // ]);
  // console.log("role", user.role);

  const payload = {
    key: user.Token,
    session,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
  });
  console.log(token);

  return {
    message: "Đăng nhập thành công",
    token,
    k_user: user.Token,
    role: user.role || 0,
  };
};
