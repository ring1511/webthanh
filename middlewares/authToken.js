import { getTime } from "../utils/time.js";
import Signature from "./signature.js";

const authToken = async (req, res, next) => {
  try {
    // const route = req.path;
    // const toolPathRegex = /^\/tool\/\d+$/;
    // const vpsPathRegex = /^\/vps\/\d+$/;
    // if (
    //   route === "/login" ||
    //   route === "/signup" ||
    //   route === "/product/tools" ||
    //   toolPathRegex.test(route) ||
    //   vpsPathRegex.test(route)
    // ) {
    //   return next();
    // }
    const token = req.cookies.token;
    const k_user = req.cookies.k_user;
    if (!token) {
      return res.status(403).json({
        ok: false,
        message: "Không có quyền truy cập",
      });
    }
    const [encodedHeader, encodedPayload, signature] = token.split(".");
    if (!encodedHeader || !encodedPayload) {
      throw new Error("Token không hợp lệ");
    }

    const payload = Buffer.from(encodedPayload, "base64").toString("utf8");
    const { key, session } = JSON.parse(payload);
    if (key !== k_user) {
      throw new Error("Token không hợp lệ");
    }
    req.key = key;
    if (!(signature === Signature(encodedHeader, encodedPayload))) {
      return res.status(403).send({
        ok: false,
        message: "Token không hợp lệ",
      });
    }
    if (session < getTime().Milliseconds) {
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
      return res.status(403).send({
        ok: false,
        message: "Token đã hết hạn1",
      });
    }
    next();
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Lỗi xác thực",
    });
  }
};

export default authToken;
