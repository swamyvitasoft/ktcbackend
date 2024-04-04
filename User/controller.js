import Usermodel from "../common/usermodel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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

export const forgotLogin = async (req, res) => {
  try {
    const allusers = await Usermodel.findOne({
      mobileno: req.body.mobileno,
    });
    if (!allusers) {
      return res.status(204).send({ error: "user not found" });
    }
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "gantasandhyavitasoft@gmail.com",
        pass: "fbkh uzzr zxij ywuv",
      },
    });
    let mailOptions = {
      from: "gantasandhyavitasoft@gmail.com",
      to: "swamy.vitasoft@gmail.com",
      subject: "KTC Mobile Password :" + allusers.mobileno,
      text: "Your password " + allusers.password,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(204).send({ error: error.message });
      }
      res.status(200).send({ allusers });
      console.log("Email sent successfully!");
    });
  } catch (err) {
    res.status(204).send({ error: "not found" });
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
    return res.status(201).send({ success: "Password Changed" });
  } catch (err) {
    return res.status(204).send({ error: "Internal serval error" });
  }
};
