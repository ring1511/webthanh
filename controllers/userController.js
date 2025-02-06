import pool from "../config/database.js";
import {
  ChangeKeyService,
  HistoryUser,
  payment,
  paymentWithDiscount,
} from "../services/userService.js";

export const getInfo = async (req, res) => {
  try {
    const { key } = req;
    if (!key) {
      return res.status(400).json("Missing key parameter");
    }
    try {
      const [userRows] = await pool.query(
        "SELECT id, role, email, username, balance, createdate FROM users WHERE `token`= ?",
        [key]
      );
      if (userRows.length === 0) {
        return res.status(404).send("Tài khoản không tồn tại");
      }
      const userInfo = userRows[0];
      return res.status(200).json(userInfo);
    } catch (error) {
      return res.status(500).json("Internal Server Error");
    }
  } catch (error) {
    console.log(error);
  }
};

/////
export const purchaseItem = async (req, res) => {
  try {
    const key = req.key;
    const ed = req.body.ed;
    const iv = req.body.iv;

    if (!ed || !iv) {
      return res.json({ error: true, message: "Không thể thanh toán" });
    }

    const result = await payment(ed, iv, key);
    if (result.error) {
      return res.status(400).json({ result });
    }
    res.status(200).json({ result });
  } catch (error) {
    console.log("error", error);
  }
};

///
export const getHistory = async (req, res) => {
  try {
    const key = req.key;
    const result = await HistoryUser(key);
    if (result.error) {
      return res.status(400).json({ error: true, data: result.data });
    }
    return res.status(200).json({ error: false, data: result.data });
  } catch (error) {}
};

/// đổi key
export const ChangeKey = async (req, res) => {
  const key = req.key;
  const id_history = req.body.id;
  const user_order = req.body.key;

  if (!key || !id_history || !user_order)
    return res.status(400).json({ error: true, message: "Có lỗi xảy ra" });
  try {
    const result = await ChangeKeyService(key, id_history, user_order);
    if (result.error) {
      return res
        .status(400)
        .json({ error: result.error, message: result.message });
    }
    res.status(200).send({ error: result.error, message: result.message });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Đã xảy ra lỗi ngoài ý muốn. Vui lòng thử lại sau.",
    });
  }
};
