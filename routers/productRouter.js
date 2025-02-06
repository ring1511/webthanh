import express from "express";
import { getDetail, getProduct } from "../controllers/productController.js";

const proudctRouter = express.Router();

proudctRouter.get("/tools", getProduct);
proudctRouter.get("/tool/:tag", getDetail);

export default proudctRouter;
