import { Router } from "express";
import {
  addItems,
  getAllitems,
  getItemwithId,
  itemUpdatebyId,
  itemDeletebyId,
} from "../item/controller.js";
import verifyToken from "../jwt/verifytoken.js";

const router = new Router();

router.post("/additem", addItems);

router.get("/getitems", verifyToken, getAllitems);

router.get("/getItembyId/:id", verifyToken, getItemwithId);

router.put("/upadate/:id", verifyToken, itemUpdatebyId);

router.delete("/delete/:id", verifyToken, itemDeletebyId);

export default router;
