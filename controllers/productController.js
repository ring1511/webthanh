import pool from "../config/database.js";

export const getProduct = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT title, category, lifetimePrice, monthlyPrice, monthlyPriceCTV, totalSales, discountPercent, description, serial FROM categoryproducts`
    );
    return res.status(200).send(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

export const getDetail = async (req, res) => {
  const tag = req.params.tag;
  console.log(tag);
  try {
    const [rows] = await pool.query(
      `SELECT title, category, lifetimePrice, monthlyPrice, monthlyPriceCTV, totalSales, discountPercent, description, serial FROM categoryproducts WHERE serial = ?`,
      tag
    );
    return res.status(200).send(rows[0]);
  } catch (error) {
    return res.status(404).send(error);
  }
};
