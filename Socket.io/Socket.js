import { Server } from "socket.io";
import pool from "../config/database.js";

function setupSocketIOServer(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.on("connection", async (socket) => {
    const userId = socket.handshake.query.id;

    console.log("Client đã kết nối websocket");
    const cookies = socket.request.headers.cookie;
    const token = cookies
      .split("; ")
      .find((item) => item.startsWith("token="))
      ?.split("=")[1];

    const [encodedHeader, encodedPayload, signature] = token.split(".");
    const payload = Buffer.from(encodedPayload, "base64").toString("utf8");
    const { key } = JSON.parse(payload);
    if (key) {
      try {
        const [users] = await pool.query(
          "SELECT nonce FROM users WHERE token = ?",
          [key]
        );
        if (users.length === 0) {
          return "Không tìm thấy người dùng";
        }
        let { nonce } = users[0];
        if (!nonce) {
          nonce = Math.random();
          await pool.query("UPDATE users SET nonce = ? WHERE token = ?", [
            nonce,
            key,
          ]);
        }
        // console.log(nonce);
        socket.emit("getNonce", { nonce });
      } catch (error) {
        console.error("Lỗi trong quá trình xử lý:", error.message);
      }
    }
    socket.on("disconnect", async () => {
      await pool.query("UPDATE users SET nonce = ? WHERE token = ?", [
        null,
        key,
      ]);
      console.log("Client đã ngắt kết nối websocket");
    });
  });
}

export default setupSocketIOServer;
