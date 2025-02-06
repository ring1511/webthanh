import { io } from "socket.io-client";

function SocketIO(params) {
  const socket = io(params, {
    withCredentials: true,
  });
  socket.on("connect", () => {
    console.log("Đã kết nối tới server Socket.IO");
  });

  socket.on("disconnect", () => {
    console.log("Đã ngắt kết nối với server");
  });
}

export default SocketIO;
