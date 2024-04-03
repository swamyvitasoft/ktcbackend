import Usermodel from "../common/usermodel.js";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  try {
    const newUser = await Usermodel(req.body);
    newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "user registration failed" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const User = await Usermodel.findOne({
      mobileno: req.body.mobileno,
      password: req.body.password,
    });
    if (!User) {
      return res.status(204).send({ error: "user not found" });
    }
    const secretKey = "my-secretKey";
    const token = jwt.sign(
      { mobileno: req.body.mobileno, password: req.body.password },
      secretKey,
      { expiresIn: "2h" }
    );
    return res.status(200).send({ User, token });
  } catch (error) {
    return res.status(204).send({ error: "user login failed" });
  }
};

export const getAllusers = async (req, res) => {
  try {
    const allusers = await Usermodel.find();
    res.status(200).json(allusers);
  } catch (err) {
    res.status(404).json({ err: "not found" });
  }
};

export const settings = async (req, res) => {
  try {
    const Sale = await Usermodel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(Sale);
  } catch (err) {
    res.status(500).json({ err: "Internal serval error" });
  }
};
