import { Router } from "express";
import {
    userRegister,
    userLogin,
    getAllusers
   
}from "../User/controller.js"
import verifyToken from "../jwt/verifytoken.js";

const router = new Router()

router.post( '/add', userRegister);

router.post( '/login', userLogin);

router.get( '/getusers', verifyToken, getAllusers)






export default router