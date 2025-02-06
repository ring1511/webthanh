import express from "express";
import {
  purchaseItem,
  getInfo,
  getHistory,
  ChangeKey,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/info", getInfo);
userRouter.post("/purchase", purchaseItem);
userRouter.post("/history", getHistory);
userRouter.post("/changekey", ChangeKey);

export default userRouter;
