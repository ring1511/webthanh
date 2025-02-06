import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routers/authRouter.js";
import authToken from "./middlewares/authToken.js";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import proudctRouter from "./routers/productRouter.js";
import setupSocketIOServer from "./Socket.io/Socket.js";
import http from "http";
import decryptDataClient from "./utils/decryptDataClient.js";

const app = express();
const port = 8080;
const httpServer = http.createServer();

// import nodemailer from "nodemailer";

// // Tạo transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "rinhdz1111@gmail.com",
//     pass: "owii hnru jxzd cvom",
//   },
// });

// // Cấu hình email
// const mailOptions = {
//   from: "rinhdz1111@gmail.com",
//   to: "trinhrinh55@gmail.com",
//   subject: "Test Email from Node.js",
//   text: "Hello, this is a test email sent from Node.js!",
//   html: "<h1>Hello</h1><p>This is a test email sent from <b>Node.js</b>!</p>",
// };

// // Gửi email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log("Error occurred:", error.message);
//   } else {
//     console.log("Email sent successfully!");
//     console.log("Message ID:", info.messageId);
//   }
// });
// socket
setupSocketIOServer(httpServer);
httpServer.listen(8444, () => {
  console.log("Socket đang chạy trên cổng 8444");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/product", proudctRouter);
app.use("/api", authToken, userRouter);

app.use("/", (req, res) => {
  res.send("welcom to server");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
