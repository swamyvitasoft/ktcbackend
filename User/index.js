import { Router } from "express";
import {
  userRegister,
  userLogin,
  getAllusers,
  settings,
  forgotLogin,
} from "../User/controller.js";
import verifyToken from "../jwt/verifytoken.js";

const router = new Router();

router.post("/add", userRegister);

router.post("/login", userLogin);

router.post("/forgot", forgotLogin);

router.get("/getusers", verifyToken, getAllusers);

router.put("/settings/:id", verifyToken, settings);

export default router;
