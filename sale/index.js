import { Router } from "express";
import {
  addSales,
  getAllsales,
  getSalewithId,
  saleUpdatebyId,
  saleDeletebyId,
} from "../sale/controller.js";
import verifyToken from "../jwt/verifytoken.js";

const router = new Router();

router.post("/addsale", addSales);

router.get("/getsales", verifyToken, getAllsales);

router.get("/getSalebyId/:id", verifyToken, getSalewithId);

router.put("/update/:id", verifyToken, saleUpdatebyId);

router.delete("/delete/:id", verifyToken, saleDeletebyId);

export default router;
