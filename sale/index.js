import { Router } from "express";
import {
  addSales,
  getAllsales,
  getSalewithId,
  saleUpdatebyId,
  saleDeletebyId,
  getTopsales,
  getCustomers,
  getYearly,
  getMonthly,
  getDaily,
  getExport
} from "../sale/controller.js";
import verifyToken from "../jwt/verifytoken.js";

const router = new Router();

router.post("/addsale", addSales);

router.get("/getsales", verifyToken, getAllsales);

router.get("/getSalebyId/:id", verifyToken, getSalewithId);

router.put("/update/:id", verifyToken, saleUpdatebyId);

router.delete("/delete/:id", verifyToken, saleDeletebyId);

router.get("/getTopsales", verifyToken, getTopsales);

router.get("/getCustomers", verifyToken, getCustomers);

router.get("/getYearly", verifyToken, getYearly);

router.post("/getMonthly", verifyToken, getMonthly);

router.post("/getDaily", verifyToken, getDaily);

router.post("/getExport", getExport);

export default router;
