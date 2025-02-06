import pool from "../config/database.js";
import { addTime } from "../utils/addTime.js";
import decryptDataClient from "../utils/decryptDataClient.js";

export const paymentWithDiscount = async (discount) => {
  const [rows] = await pool.query("SELECT * FROM discount WHERE discount = ?", [
    discount,
  ]);
  if (rows.length === 0) {
    return "Không tìm thấy mã giảm giá";
  }
  const percent = rows[0].percent;

  return { error: false, message: "Thanh toán thành công", percent };
};

export const payment = async (encryptedData, iv, key) => {
  const [user] = await pool.query("SELECT * FROM users WHERE token = ?", [key]);
  if (user.length === 0) {
    return "Không tìm thấy người dùng";
  }
  const nonce = user[0].Nonce;

  const dataDecrypt = decryptDataClient(encryptedData, nonce, iv);

  const [rows] = await pool.query(
    "SELECT * FROM categoryproducts WHERE serial = ?",
    [dataDecrypt.split("|")[1]]
  );

  if (rows.length === 0) {
    return "Không tìm thấy sản phẩm";
  }

  if (dataDecrypt.split("|")[2] === "TOOL") {
  }
  const price = rows[0][dataDecrypt.split("|")[0]];
  console.log(price);
  if (user[0].Balance < price) {
    return { error: true, message: "Số dư không đủ" };
  }

  const usd = user[0].Balance - price;
  await updateAccoutPyment(
    usd,
    key,
    rows[0].Title,
    rows[0].DownloadLink,
    dataDecrypt.split("|")[2]
  );
  return { error: false, message: "Thanh toán thành công" };
};

const updateAccoutPyment = async (usd, key, name, link_download, category) => {
  if ((!usd || !key || !name || !link_download) && category === "TOOl") {
    throw new Error("Invalid input data");
  }
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [result] = await connection.query(
      "INSERT INTO history_trade (user_id, product_title, product_download_link, category) VALUES ( ?, ?, ?, ?)",
      [key, name, link_download, category]
    );

    const historyId = result.insertId;
    if (category === "TOOL") {
      await connection.query(
        "INSERT INTO active_key (user_id, history_id, expired_at) VALUES (?, ?, ?)",
        [key, historyId, addTime(Date.now())]
      );
    } else if (category === "VPS") {
      await connection.query(
        "INSERT INTO vps_order (user_id, history_id, expired_at) VALUES (?, ?, ?)",
        [key, historyId, addTime]
      );
    } else if (category === "CAP") {
      await connection.query(
        "INSERT INTO captcha_order (user_id, history_id) VALUES ( ?, ?)",
        [key, historyId]
      );
    } else {
      throw new Error("có lỗi xảy ra");
    }
    await connection.query("UPDATE users SET balance = ? WHERE token = ? ", [
      usd,
      key,
    ]);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error("Transaction failed:", error);
    throw new Error("Transaction failed, please try again later.");
  } finally {
    connection.release();
  }
};

export const HistoryUser = async (k_user) => {
  try {
    const [history] = await pool.query(
      `
      SELECT 
        h.id AS history_id, 
        h.Product_title AS name, 
        h.product_download_link AS link_download, 
        h.Category AS category, 
        uk.key_value AS user_key_value, 
        uk.change_count AS user_change, 
        uk.status AS user_key_status, 
        uk.expired_at AS expired_at,
        v.ip AS vps_ip,
        v.status AS vps_status,
        v.password AS password
      FROM history_trade h 
      LEFT JOIN active_key uk ON h.user_id = uk.user_id AND h.id = uk.history_id
      LEFT JOIN vps_order v ON h.id = v.history_id
      WHERE h.user_id = ? 
      ORDER BY h.PurchasedDate DESC;
      `,
      [k_user]
    );

    return { error: false, data: history };
  } catch (error) {
    console.log(error);
  }
};

/// đổi key và update ở đây u_k = token (user), id_id = history_id , t_k  = key mới

export const ChangeKeyService = async (u_k, id_h, t_k) => {
  try {
    const [tool] = await pool.query(
      "SELECT * FROM active_key WHERE history_id = ?",
      [id_h]
    );
    if (tool[0].change_count <= 0) {
      return { error: true, message: "Hết lượt đổi trong ngày" };
    }
    if (tool[0].user_id != u_k) {
      return { error: true, message: "Có lỗi xảy ra" };
    }
    await pool.query(
      "UPDATE active_key SET key_value = ?, change_count = change_count - 1, status = ? WHERE history_id = ? AND user_id =? ",
      [t_k, "active", id_h, u_k]
    );

    return { error: false, message: "Thay đổi key thành công" };
  } catch (error) {}
};
